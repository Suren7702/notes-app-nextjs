import axios from 'axios';

const API = axios.create({
  // This reads the variable you set in Vercel
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add the token to every request if we are logged in
API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers['x-auth-token'] = token;
    }
  }
  return req;
});

export default API;