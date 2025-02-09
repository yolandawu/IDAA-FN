'use client'

export default function Logout() {
    const onLogoutClick = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    };


    return (
        <div className="mx-auto w-fit">
            <button onClick={onLogoutClick}>Logout</button>
        </div>

    )
}