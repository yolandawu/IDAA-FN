'use client'
import {useState, useRef, useEffect} from 'react'
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    // function to scroll to bottom
    const scrollToBotton = () => {
        if (messagesContainerRef.current){
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        scrollToBotton();
    }, [messages]);


    const onBtnSendClick = async () => {
        // Append user message to chat
        if (userInput.length === 0 || isSubmitting) {
            return
        }
        setIsSubmitting(true)
        setUserInput("");
        setMessages((prev) => [...prev, { type: 'user', text: userInput }]);

        sendMessage(userInput)
            .then((res)=>{
                setIsSubmitting(false)
                if(res && res.agent_result) {
                    const botReply = res.agent_result || "Sorry, I didn't understand that."; // Ensure fallback
                    setMessages((prev) => [...prev, { type: 'bot', text: botReply }]);
                }
                else {
                    setAlertMessage('Oooops! Network error, please try again later.');
                    setShowAlert(true)
                }

            })
            .catch(()=>{
                setAlertMessage('Oooops! Network error, please try again later.');
                setShowAlert(true)
                setIsSubmitting(false)
            })
    };

    return (
        <div className="relative text-left flex flex-col relateive" style={{height:'96%'}}>
            {showAlert && (
                <div className="w-1/4 fixed right-2 top-5">
                    <Alert severity="warning" onClose={() => setShowAlert(false)}>
                        {alertMessage}
                    </Alert>
                </div>
                )}
            <div className='py-5 flex-1 overflow-scroll' ref={messagesContainerRef}>
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
                        rows={3}
                        className="w-full"
                        id='chat-input'
                        value={userInput}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUserInput(event.target.value);
                        }}
                        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault()
                                onBtnSendClick()
                            }
                            else if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                                event.preventDefault(); // Prevents adding a new line
                                setUserInput((prev) => prev + "\n");
                            }}
                        }
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
