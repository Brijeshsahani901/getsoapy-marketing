// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

// import '../styles/globals.css'
// import { useEffect } from 'react'

// function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     // Load reCAPTCHA
//     const script = document.createElement('script')
//     script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
//     script.async = true
//     document.head.appendChild(script)
//   }, [])

//   return <Component {...pageProps} />
// }

// export default MyApp

// pages/_app.js
import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
