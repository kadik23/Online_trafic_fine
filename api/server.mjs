import express from "express";
import cors from "cors"
const app = express();
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {google} from 'googleapis'
import { body, validationResult } from 'express-validator';
import { ChargilyClient } from '@chargily/chargily-pay';

// const client = new ChargilyClient({
//   api_key: 'test_pk_82EjixigeW0z0SJ91luo5PubNBuugPKifQclZamG',
//   mode: 'test', // Change to 'live' when deploying your application
// });
// const customerData = {
//     name: 'John Doe',
//     email: 'johnhh@gmail.com',
//     phone: '+213725380137',
//     address: {
//       country: 'DZ',
//       state: 'Algiers',
//       address: '123 Main St',
//     },
//     metadata: {
//       notes: 'Important customer',
//     },
//   };
  
//   client
//     .createCustomer(customerData)
//     .then((customer) => console.log(customer))
//     .catch((error) => console.error(error));



dotenv.config();
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3001', 
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
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        req.userData = userData;
        next();
    });
} 

app.get("/",loginMiddleware, async (req, res) => {
    // const { request, name } = req.body;
    const { userData } = req;
    const auth = getAuth()
    const googleSheet = await getGoogleSheet(auth);
    // get metadata about spreadsheet
    try {
        // const metadata = await googleSheet.spreadsheets.get({
        // spreadsheetId: spreadsheetID, // Pass the spreadsheetId correctly
        // });
        //   Read rows from spreadsheet
        // const getUsers = await googleSheet.spreadsheets.values.get({
        //     auth,
        //     spreadsheetId: spreadsheetID,
        //     range: `User!A:F`
        // })
        const getFinesResponse = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: `Trafic_fine!A:H`
        })
        const getPaymentsResponse = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: `Payment!A:F`
        })
        const user_id = userData.id.data.values[0][0]
        const fines = getFinesResponse.data.values || [];
        const payments = getPaymentsResponse.data.values || [];
        const filteredFines = fines.filter(fine => fine[7] === user_id);
        const filteredPayments = payments.filter(payment => payment[2] === user_id); 
        const data = {
            getFinesResponse:filteredFines,
            getPaymentsResponse:filteredPayments
        }
        res.send(data);
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
            let lastUsedID = getRows.data.values[1] ? getRows.data.values.length : 0;
            // Increment the last used ID to generate a new ID for the next user
            const newID = lastUsedID -1;
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
            range: `User!B:B`
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

app.put("/profile/:id", loginMiddleware, async (req, res) => {
    const userId = parseInt(req.params.id); // Convert userId to a number
    const { email, fullname, phone } = req.body;
    try {
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);

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

        // Update email, fullname
        await googleSheet.spreadsheets.values.update({
            auth,
            spreadsheetId: spreadsheetID,
            range: `User!B${userId + 2}:C${userId + 2}`, // Adjusted indices
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[email, fullname]],
            },
        });

        // Update phone
        await googleSheet.spreadsheets.values.update({
            auth,
            spreadsheetId: spreadsheetID,
            range: `User!E${userId + 2}`, 
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[phone]],
            }
        });

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});


app.get('/getOneFine/:id',loginMiddleware,async(req,res)=>{
    try{
        const FineID = req.params.id;
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);
        const fetchFine = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: `Trafic_fine!A:H` 
        });
        const fineData = fetchFine.data.values.find((row) => row[0] === (FineID));

        if (!fineData) {
            return res.status(404).json({ error: 'Fine not found' });
        }
        res.json(fineData)
    }catch(e){
        res.status(500).json('Internal Server Error')
    }
})

app.get('/payTraficFine/:id',loginMiddleware,async(req,res)=>{
    try{
        let FineID = req.params.id;
        const auth = getAuth();
        const googleSheet = await getGoogleSheet(auth);
        const fetchFine = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: `Trafic_fine!A:H` 
        });
        const fineData = fetchFine.data.values.find((row) => row[0] === (FineID));
        if (!fineData) {
            return res.status(404).json({ error: 'Fine not found' });
        }
        FineID = parseInt(FineID)+2
        const date = new Date()
        await googleSheet.spreadsheets.values.update({
            auth,
            spreadsheetId: spreadsheetID,
            range: `Trafic_fine!F${FineID}:G${FineID}`,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[date, 'TRUE']],
            },
        });
        const getRows = await googleSheet.spreadsheets.values.get({
            auth,
            spreadsheetId: spreadsheetID,
            range: "Payment!A:A",
        });
        let lastUsedID = getRows.data.values[1] ? getRows.data.values[parseInt(getRows.data.values.length)-1] : 0;
        // Increment the last used ID to generate a new ID for the next user
        const newID = parseInt(lastUsedID) + 1;
        const payment = await googleSheet.spreadsheets.values.append({
            auth,
            spreadsheetId: spreadsheetID, 
            range: "Payment!A:F",
            valueInputOption: "USER_ENTERED",
            resource: {
                values:[
                    [newID,FineID-2,fetchFine.data.values[FineID-1][7],"Eccp",fetchFine.data.values[FineID-1][2],date],
                ]
            }
        })
        res.json(FineID-2)
    }catch(e){
        res.status(500).json('Internal Server Error')
    }
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});