import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [userID,setUserID] = useState(null);
  const [fines,setFines] = useState(null);
  const [payments,setPayments] = useState(null);
  const [oneFine,setOneFine] = useState(null);
  const [ready,setReady] = useState(false);

  useEffect(() => {
    getData()
  }, []);

    async function getData() {
      try{
        const {data} = await axios.get('/')
        if (data ) {
          setUser(data.getUserResponse);
          setFines(data.getFinesResponse);
          setPayments(data.getPaymentsResponse);
          setReady(true);
          console.log(user)
        }
      }catch(err){
        if (err.response && err.response.status === 401) {
          console.log("Unauthorized access. Please log in.");
        } 
        else {
          console.error("An error occurred while fetching data:", err);
        }      
      }
    }

    

  return (
    <UserContext.Provider value={{user,setUser,fines,setFines,payments,setPayments,userID,setUserID,oneFine,setOneFine,ready}}>
      {children}
    </UserContext.Provider>
  );
}