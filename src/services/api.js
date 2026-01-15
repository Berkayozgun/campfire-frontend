import axios from 'axios';

const apiService = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the JWT token to headers
apiService.interceptors.request.use(
    (config) => {
        console.log(`Sending request to: ${config.url}`);
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log full error for debugging
        console.error('API Error:', error);

        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message || 'An unexpected error occurred.';

        // Alert the user
        window.alert(`Error: ${errorMessage}`);

        // Handle 401 Unauthorized
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized! Clearing storage and redirecting to login...');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default apiService;
