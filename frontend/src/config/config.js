export const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-deployed-backend-url.com'  // Production URL
  : 'http://localhost:4000';                 // Development URL