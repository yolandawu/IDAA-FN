'use client'
import iconUser from "@/app/images/icon-user.jpg";

export default function DialogueUser({userReply}: {userReply: string}) {
    console.log(userReply.toString())

    return (
        <div className='flex flex-row-reverse w-full pb-1'>
            <div className='flex p-2  bg-[#303030]/50 rounded-lg w-full '>
                <img className="rounded-xl ml-1 mt-2" style={{width:'40px', height:'40px'}} src={iconUser.src} alt=''/>
                <p className='px-3 flex-1 my-3 whitespace-pre-wrap'>
                    {userReply}
                </p>
            </div>
        </div>
    )
}
