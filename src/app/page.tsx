'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login'
import Chat from './components/Chat'
import {Alert, Switch} from '@mui/material';
import {useEffect, useState} from "react";
import Logout from "./components/Logout";

const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const LightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});


export default function Home() {
    const [success, setSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setIsDark(prevMode => !prevMode);
        setTheme(theme === 'light' ? 'dark' : 'light')
    };

    useEffect(()=>{
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (storedUsername && storedPassword) {
            setSuccess(true);
        }
    }, [])

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme]);

    const handleLoginSuccess = () => {
        setAlertMessage('Login Success!');
        setShowAlert(true)
        setSuccess(true);

        setTimeout(() => {
            setShowAlert(false); // Hide the alert after 3 seconds
        }, 3000);
    };

    const handleLoginFail = (message: string) => {
        console.log(message)
    };

    const onLogoutClick = () => {
        setSuccess(false)
    };

    return (
      <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
          <CssBaseline />
          <main className='w-full py-4 px-40 text-center font-[family-name:var(--font-geist-sans)] relative font-exo2'>
              <div className="mb-2">
                  <h1 className='font-monomaniac'>
                      Intelligent Digital Asset Assistant
                  </h1>
                  <h2 className='font-monomaniac'>(IDAA)</h2>
                  <h3 className='font-monomaniac' style={{opacity:0.6}}>Aditya Nikhil Digala, Yang Wu, Vaeshnavi Vella</h3>
              </div>
              <div  className='absolute top-6 right-10 text-right' >
                  <Switch defaultChecked onClick={toggleTheme}/><span>{isDark ? 'Dark' : 'Light'}</span>
                  {/*<button onClick={toggleTheme} style={{display: 'inline-block', position:"absolute", right:10, top:'50px'}}>*/}
                  {/*    Switch to {theme === "light" ? "Dark" : "Light"} Mode*/}
                  {/*</button>*/}
                  {success && <Logout onSuccess={onLogoutClick}  />}
              </div>
              {showAlert && (
                  <div className="w-1/4 fixed right-2 top-5">
                      <Alert severity="success"  onClose={() => setShowAlert(false)}>
                          {alertMessage}
                      </Alert>
                  </div>
              )}
              {success? (
                      <Chat/>
              ) : (
                  <div className="p-8 pb-20 gap-16 sm:p-20 text-center mt-20">
                      <Login onSuccess={handleLoginSuccess} onFail={handleLoginFail} />
                  </div>
              )}

          </main>
      </ThemeProvider>
  );
}
