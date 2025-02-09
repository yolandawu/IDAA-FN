'use client'
import {useState} from 'react'
import TextField from '@mui/material/TextField';
import {Button,Alert} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DialogueChatBot from "@/app/components/DialogueChatBot";
import DialogueUser from "@/app/components/DialogueUser";
import {sendMessage} from '@/app/api/handler'

export default function Chat() {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<{ type: 'user' | 'bot', text: string }[]>([]);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState(false);

    const onBtnSendClick = async () => {
        // Append user message to chat

        setMessages((prev) => [...prev, { type: 'user', text: userInput }]);

        sendMessage(userInput)
            .then((res)=>{
                console.log(res)
                if(res && res.agent_result) {
                    const botReply = res.agent_result || "Sorry, I didn't understand that."; // Ensure fallback
                    setMessages((prev) => [...prev, { type: 'bot', text: botReply }]);
                    setUserInput("");
                }
                else {
                    setAlertMessage('Oooops! Network error, please try again later.');
                    setShowAlert(true)
                }

            })
            .catch((err)=>{
                setAlertMessage('Oooops! Network error, please try again later.');
                setShowAlert(true)
            })
    };

    return (
        <div className="relative text-left flex flex-col" style={{height:'96%'}}>
            {showAlert && (
            <Alert variant="filled" severity="warning" onClose={() => setShowAlert(false)}>
                {alertMessage}
            </Alert>
                )}
            <div className='py-5 flex-1 overflow-scroll'>
                {messages.map((msg, index) =>
                    msg.type === 'user' ?
                        <DialogueUser key={index} userReply={msg.text} /> :
                        <DialogueChatBot key={index} chatbotReply={msg.text} />
                )}
            </div>
            <div style={{height:'200px'}}>
                <div className="absolute bottom-5 w-full">
                    <TextField
                        label=""
                        multiline
                        rows={4}
                        className="w-full"
                        id='chat-input'
                        value={userInput}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInput(event.target.value);
                        }}
                    />
                </div>
                <div className="absolute bottom-6 right-1">
                    <Button onClick={onBtnSendClick} style={{ borderRadius: "40px" }}>
                        <ArrowUpwardIcon/>
                    </Button>
                </div>
            </div>

        </div>
    );
}
