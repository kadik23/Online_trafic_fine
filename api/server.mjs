import express from "express";
import cors from "cors"
const app = express();
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {google} from 'googleapis'
import { body, validationResult } from 'express-validator';

dotenv.config();
const corsOptions = {
    credentials: true,
    origin: 'http://127.0.0.1:5173', 
};
const port = 3000;
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdjjfldwjn2vpbcwytp'
const spreadsheetID = process.env.DATABASE_ID;

const getAuth = ()=>{
    // create client instance for auth
    return new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
}

async function getGoogleSheet(auth) {
    // instance of goolge sheets API
    const client = await auth.getClient(auth);
    const googleSheet = google.sheets({ version: 'v4', auth: client });
    return googleSheet;
}

const loginMiddleware = (req , res ,next) =>{
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        next()
    });
} 

app.get("/", async (req, res) => {
    // const { request, name } = req.body;
  
    const auth = getAuth()

    const googleSheet = await getGoogleSheet(auth);

    // get metadata about spreadsheet
    try {
        const metadata = await googleSheet.spreadsheets.get({
        spreadsheetId: spreadsheetID, // Pass the spreadsheetId correctly
        });

        //   Read rows from spreadsheet
        const getRows = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: `User!A:A`
        })

        await googleSheet.spreadsheets.values.append({
            auth,
            spreadsheetId: spreadsheetID, 
            range: "User!A:B",
            valueInputOption: "USER_ENTERED",
            resource: {
                values:[
                    ["2","noufel@gmail.com"],
                    ["3","nazih@gmail.com"],
                    ["4","achraf@gmail.com"],
                ]
            }
        })
        res.send(getRows.data);
    } catch (error) {
    console.error('The API returned an error:', error);
    res.status(500).send('An error occurred while fetching spreadsheet metadata');
}
})


app.post("/register",
    [body('password')
        .notEmpty()
        .isLength({min:8,max:16})
        .withMessage('must be at least 8-16 characters')
    ],
    async (req,res)=>{
        const result = validationResult(res)
        // console.log(result)
        if(!result.isEmpty()){
            return res.status(400).send({errors:result.array()})
        }
        const {email,fullname,phone,password} = req.body
        try{
            let pass = bcrypt.hashSync(password, bcryptSalt)
            const auth = getAuth()
            const googleSheet = await getGoogleSheet(auth);
            const getRows = await googleSheet.spreadsheets.values.get({
                auth,
                spreadsheetId: spreadsheetID,
                range: "User!A:A",
            });
            let lastUsedID = getRows.data.values ? getRows.data.values.length : 0;
            // Increment the last used ID to generate a new ID for the next user
            const newID = lastUsedID + 1;
            // Unique Email
            const fetchEmail = await googleSheet.spreadsheets.values.get({
                auth,
                spreadsheetId: spreadsheetID,
                range: `User!B:B` 
            });
            const emailFound = fetchEmail.data.values.flat().includes(email);
            if (emailFound) {
                return res.status(422).json('Email must be unique');
            }
            await googleSheet.spreadsheets.values.append({
                auth,
                spreadsheetId: spreadsheetID, 
                range: "User!A1:F1",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values:[
                        [newID,email,fullname,pass,phone],
                    ]
                }
            })
            res.json({fullname,email,password,phone})
        }catch(e){
            res.status(500).json({ error: e.message });
        }  
})

app.post("/login",async(req,res)=>{
    const {email , password} = req.body 
    try{
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);
        const getRows = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: `User!B:B` // Assuming email addresses are in column B
        });
        const emailFound = getRows.data.values.flat().includes(email);
        if (!emailFound) {
            return res.status(422).json('Email not found');
        }
        const passwordRowIndex = getRows.data.values.flat().indexOf(email);
        const passwordRange = `User!D${passwordRowIndex + 1}`;
        const getPassword = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: passwordRange
        });
        const hashedPassword = getPassword.data.values[0][0];
        const passOk = bcrypt.compareSync(password,hashedPassword)
        const userIDRowIndex = getRows.data.values.flat().indexOf(email);
        const userIDRange = `User!A${userIDRowIndex + 1}`;
        const userID = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: userIDRange
        });
        if(passOk){
            jwt.sign({
                email:email ,
                id: userID
            },jwtSecret,{},(err,token)=>{
                if(err) throw err
                res.cookie('token',token,{maxAge:3600*60}).json({email,userID:userID.data.values[0][0]})
            })
        }else{
            res.status(422).json('pass not ok')
        } 
    }catch(e){
        res.status(422).json(e)
    }
})

app.put("/profile/:id", async (req, res) => {
    const userId = req.params.id;
    const { email, fullname, phone } = req.body;
    try {
        // Update email, fullname
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);
        await googleSheet.spreadsheets.values.update({
            auth,
            spreadsheetId: spreadsheetID,
            range: `User!B${userId}:C${userId}`, // Assuming email, fullname, and phone are in columns B, C, and E
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[email, fullname]],
            },
        });
         // Update phone
        await googleSheet.spreadsheets.values.update({
            auth,
            spreadsheetId: spreadsheetID,
            range: `User!E${userId}`, // Update phone column
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[phone]],
            }
        });

        // Send success response
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});