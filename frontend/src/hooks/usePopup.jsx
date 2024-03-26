import { useState } from "react";


export default function usePopup() {
    let MESSAGE_ID = 0;
    const [messages, setMessages] = useState([]);

    const alert = (message, type) => {
        let id = MESSAGE_ID;
        setMessages(state => [...state, { id: id, message, type }]);
        MESSAGE_ID++;
        console.log(messages);
    }

    const alertError = (message) => {
        alert(message, "error");
    }

 

    const alertSuccess = (message) => {
        alert(message, "success");
    }

    return {
        messages,
        alertError,
        alertSuccess
    };
}