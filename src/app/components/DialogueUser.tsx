'use client'
import iconUser from "@/app/images/icon-user.png";

export default function DialogueUser({userReply}: {userReply: string}) {
    console.log(userReply.toString())

    return (
        <div className='flex flex-row-reverse w-full pb-1'>
            <div className='flex items-left p-2 bg-[#303030]/50 rounded-lg w-11/12 '>
                <img style={{width:'45px', height:'45px'}} src={iconUser.src} alt=''/>
                <p className='px-3 flex-1 my-3 whitespace-pre-wrap'>
                    {userReply}
                </p>
            </div>
        </div>
    )
}
