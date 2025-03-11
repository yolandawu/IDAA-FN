'use client'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import testAccount from '@/data/test-account.json'

interface LoginProps {
    onSuccess?: (message: string) => void;  // Callback when login succeeds
    onFail?: (message: string) => void;  // Callback when login fails
}

export default function Login({onSuccess, onFail }:LoginProps) {
    const [isLogin, setIsLogin] = useState(false);
    const [msg, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const onLoginClick = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(isLogin)
            return
        setMessage('')
        setIsLogin(true)

        console.log(username, password)

        if (username == testAccount.username && password == testAccount.password) {
            setIsLogin(false)
            if (onSuccess) {
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                onSuccess("success"); // Trigger callback from Home.tsx
            }
        } else {
            setIsLogin(false)
            setMessage('Invalid username or password')
            if (onFail) {
                onFail("Invalid username or password");
            }
        }
    }

    return (
        <div className="mx-auto w-fit">
            <div className="w-full my-1">
                <TextField
                    required
                    id="username"
                    label="Username"
                    type="text"
                    value={username}
                    sx={{ m: 1, width: '30ch' }}
                    onChange={(e)=> setUsername(e.target.value)}
                />
            </div>
            <div className="w-full my-1">
                <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    sx={{ m: 1, width: '30ch' }}
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            <div className="w-full my-1 h-2">
                <p className='text-left ml-2 text-red-500'>{msg}</p>
            </div>
            <Button
                className="mt-10"
                sx={{ m: 1, width: '20ch' }}
                variant="contained"
                onClick={onLoginClick}
            >
                Login
            </Button>
        </div>

    );
}
