'use client'

import Link from "next/link";

interface LogoutProps {
    onSuccess?: (message: string) => void;  // Callback when login succeeds
}

export default function Logout({onSuccess }:LogoutProps) {
    const onLogoutClick = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        if (onSuccess) {
            onSuccess("Already logged out");
        }
    }

    return (
        <div className='absolute top-6 right-10' >
            <Link href="/" onClick={onLogoutClick}>Logout</Link>
        </div>

    )
}