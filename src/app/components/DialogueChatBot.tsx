'use client'
import iconChatbot from '../images/icon-bot.png'

export default function DialogueChatBot({chatbotReply}: {chatbotReply: string}) {

    return (
        <div className='flex flex-row w-full pb-1'>
            <div className='flex items-left p-2  w-11/12'>
                <img style={{width:'45px', height:'45px'}} src={iconChatbot.src} alt=''/>
                <p className='px-3 flex-1 my-3'>{chatbotReply}</p>
            </div>
        </div>
    )
}
