import { Toaster } from 'react-hot-toast';
import Navbar from '../layouts/Navbar';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp
