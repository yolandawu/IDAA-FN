'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login'
import Chat from './components/Chat'

import {useRouter} from "next/navigation";
import {useState} from "react";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Home() {
    const router = useRouter();
    const [success, setSuccess] = useState(true);

    const handleLoginSuccess = () => {
        // setTimeout(() => router.push("/chat"), 1000);
        setSuccess(true);
    };

    const handleLoginFail = (message: string) => {
        console.log(message)
    };

  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main className='w-full py-4 px-40 text-center font-[family-name:var(--font-geist-sans)]'>
              <h1 style={{fontSize:28, color:'#B4B5B4'}}>
                  Intelligent Digital Asset Assistant
              </h1>
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
