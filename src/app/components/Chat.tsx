'use client'
import {useState, useRef, useEffect, JSX} from 'react'
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DialogueChatBot from "@/app/components/DialogueChatBot";
import DialogueUser from "@/app/components/DialogueUser";
import {sendMessage} from '@/app/api/handler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export default function Chat() {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<{ type: 'user' | 'bot', text: string | JSX.Element, loading?: boolean }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const alertMessage = 'Oooops! Network error, please try again later.'

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

        // append a "thinking" message from the bot
        setMessages((prev) =>  [...prev,
            {
                type: 'bot',
                text: (
                    <div className="flex px-3 flex-1 my-3">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-500 pl-1 pr-2 pt-1" />
                        <a className='ml-2'>Thinking...</a>
                    </div>
                ),
                loading: true
            }]);

        sendMessage(userInput)
            .then((res)=>{
                setIsSubmitting(false)
                if(res && res.agent_result) {
                    const botReply = res.agent_result || "Sorry, I didn't understand that."; // Ensure fallback
                    // Replace "Thinking..." with the actual bot reply
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.loading ? { ...msg, text: botReply, loading: false } : msg
                        )
                    );
                }
                else {
                    setMessages((prev) => prev.filter((msg) => !msg.loading))
                    setMessages((prev) =>[...prev, { type: 'bot', text: alertMessage, loading: false }]);
                }

            })
            .catch(()=>{
                setIsSubmitting(false)
                setMessages((prev) => prev.filter((msg) => !msg.loading))
                setMessages((prev) =>[...prev, { type: 'bot', text: alertMessage, loading: false }]);
            })
    };

    return (
        <div className="relative text-left flex flex-col relateive" style={{height:'96%'}}>
            <div className='py-5 flex-1 overflow-scroll' ref={messagesContainerRef}>
                {messages.map((msg, index) =>
                    msg.type === 'user' ?
                        <DialogueUser key={index} userReply={msg.text.toString()} /> :
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
