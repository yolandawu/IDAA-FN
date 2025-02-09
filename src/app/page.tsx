'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login'
import Chat from './components/Chat'
import {Alert, Button} from '@mui/material';
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Home() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState(false);

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
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main className='w-full py-4 px-40 text-center font-[family-name:var(--font-geist-sans)] relative'>
              {success && (<Button className="absolute right-5 top-5" onClick={onLogoutClick}>logout</Button>)}
              <div>
                  <h1 style={{fontSize:28, color:'#B4B5B4'}}>
                      Intelligent Digital Asset Assistant
                  </h1>
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
