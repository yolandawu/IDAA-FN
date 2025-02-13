'use client'
import iconChatbot from '../images/icon-bot.png'
import ReactMarkdown from "react-markdown";
import {JSX} from "react";

export default function DialogueChatBot({chatbotReply}: { chatbotReply: string | JSX.Element }) {

    return (
        <div className='flex flex-row w-full pb-1'>
            <div className='flex items-left p-2  w-11/12'>
                <img style={{width:'45px', height:'45px'}} src={iconChatbot.src} alt=''/>
                {typeof chatbotReply === 'string' ? (
                    <ReactMarkdown
                        className='px-3 ml-2 flex-1 my-3 reactMarkDown'
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
