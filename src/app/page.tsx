'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login'
import Chat from './components/Chat'
import {Alert} from '@mui/material';
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import CheckIcon from '@mui/icons-material/Check';

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
    const [isClient, setIsClient] = useState(false);

    const handleLoginSuccess = () => {
        setAlertMessage('Login Success!');
        setShowAlert(true)
        setSuccess(true);
    };

    const handleLoginFail = (message: string) => {
        console.log(message)
    };

    useEffect(() => {
        setIsClient(true);
    }, [])

    if (!isClient) return null;

    return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main className='w-full py-4 px-40 text-center font-[family-name:var(--font-geist-sans)] relative'>
              <h1 style={{fontSize:28, color:'#B4B5B4'}}>
                  Intelligent Digital Asset Assistant
              </h1>
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
