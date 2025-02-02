'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login'
import {useRouter} from "next/navigation";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Home() {
    const router = useRouter();
    const handleLoginSuccess = () => {
        setTimeout(() => router.push("/chat"), 1000);
    };

    const handleLoginFail = (message: string) => {
        console.log(message)
    };

  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
            <main className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-center mt-20">
                <h1 style={{fontSize:28, marginBottom:'40px'}}>Do we need a project name here?</h1>
                <Login onSuccess={handleLoginSuccess} onFail={handleLoginFail} />
            </main>
      </ThemeProvider>
  );
}
