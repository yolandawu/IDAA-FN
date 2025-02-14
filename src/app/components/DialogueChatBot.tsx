'use client'
import iconChatbot from '../images/icon-bot.jpg'
import ReactMarkdown from "react-markdown";
import {JSX} from "react";

export default function DialogueChatBot({chatbotReply}: { chatbotReply: string | JSX.Element }) {

    return (
        <div className='flex flex-row w-full py-2'>
            <div className='flex p-2 w-full ml-1'>
                <img className="rounded-xl mt-2"  style={{width:'40px', height:'40px'}} src={iconChatbot.src} alt=''/>
                {typeof chatbotReply === 'string' ? (
                    <ReactMarkdown
                        className='px-3 ml-1 flex-1 my-3 reactMarkDown'
                    >
                        {chatbotReply.replace(/\n/gi, " &nbsp;\n\r ")}
                    </ReactMarkdown>
                    ) : (
                    chatbotReply
                )}
            </div>
        </div>
    )
}
