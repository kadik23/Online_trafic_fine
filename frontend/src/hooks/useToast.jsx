import { useState } from "react";

const DEFAULT_DURATION = 3000;

export default function useToast() {
    let MESSAGE_ID = 0;
    const [messages, setMessages] = useState([]);

    const alert = (message, type) => {
        let id = MESSAGE_ID;
        setMessages(state => [...state, { id: id, message, type }]);
        setTimeout(() => {
            setMessages(state => {
                let msgs = [...state];
                return msgs.filter(msg => msg.id != id);
            });
        },DEFAULT_DURATION);
        MESSAGE_ID++;
        console.log(messages);
    }

    const alertError = (message) => {
        alert(message, "error");
    }

    const alertInfo = (message) => {
        alert(message, "info");
    }

    const alertSuccess = (message) => {
        alert(message, "success");
    }

    return {
        messages,
        alertError,
        alertInfo,
        alertSuccess
    };
}