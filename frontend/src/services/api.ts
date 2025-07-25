import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } else {
      toast.error('Unexpected error occurred');
    }

    return Promise.reject(error);
  }
);

export default api;
