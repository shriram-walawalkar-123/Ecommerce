console.log("baseurl is : ",process.env.NODE_ENV);
export const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://shriram-lmtc.onrender.com'  // Production URL
  : 'http://localhost:4000';          // Development URL
