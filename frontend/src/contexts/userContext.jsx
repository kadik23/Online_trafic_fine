import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [userID,setUserID] = useState(null);
  const [fines,setFines] = useState(null);
  const [payments,setPayments] = useState(null);
  useEffect(() => {
    // if (!user) {
      axios.get('/').then(({data}) => {
        setUser(data.getUserResponse);
        setFines(data.getFinesResponse);
        setPayments(data.getPaymentsResponse);
        console.log(user)
      }).catch(err => {
        console.log(err)
      })
    // }
  }, []);

  return (
    <UserContext.Provider value={{user,setUser,fines,setFines,payments,setPayments,userID,setUserID}}>
      {children}
    </UserContext.Provider>
  );
}