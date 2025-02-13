'use client'
import iconChatbot from '../images/icon-bot.png'
import ReactMarkdown from "react-markdown";

export default function DialogueChatBot({chatbotReply}: {chatbotReply: string}) {

    return (
        <div className='flex flex-row w-full pb-1'>
            <div className='flex items-left p-2  w-11/12'>
                <img style={{width:'45px', height:'45px'}} src={iconChatbot.src} alt=''/>
                <ReactMarkdown
                    className='px-3 flex-1 my-3 reactMarkDown'
                >
                    {chatbotReply.replace(/\n/gi, " &nbsp;\n\r ")}
                </ReactMarkdown>
            </div>
        </div>
    )
}
