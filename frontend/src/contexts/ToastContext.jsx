import { createContext } from "react";

const initialValue = {
    messages: [],
    alertError:(message) => { console.log(message); },
    alertSuccess: (message) => { console.log(message); },
    alertInfo: (message) => { console.log(message); },
};

export default createContext(initialValue);