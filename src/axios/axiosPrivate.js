import axios from "axios";
import toast from 'react-hot-toast';

const baseURL = import.meta.env.VITE_BACKEND_SERVICE;

const axiosPrivate = axios.create({
  baseURL: baseURL,
});

// Singleton to manage redirection state
const RedirectManager = {
  isRedirecting: false,
  lastRedirectTime: 0,
  canRedirect() {
    const now = Date.now();
    // Allow redirect only if:
    // 1. Not currently redirecting
    // 2. Last redirect was more than 5 seconds ago
    if (!this.isRedirecting || (now - this.lastRedirectTime > 5000)) {
      this.isRedirecting = true;
      this.lastRedirectTime = now;
      return true;
    }
    return false;
  },
  reset() {
    this.isRedirecting = false;
  }
};

// Request interceptor
axiosPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 error and hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest?._retry) {
      // Additional check to prevent multiple redirects
      if (originalRequest.url.endsWith('/me')) {
        console.log('401 on /me endpoint');
        if (!RedirectManager.canRedirect()) {
          console.log('Redirect already in progress');
          return Promise.reject(error);
        }
      }

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");
      const accessToken = localStorage.getItem("access");

      // If both tokens exist, attempt refresh
      if (refreshToken && accessToken) {
        try {
          const refreshResponse = await axios.post(
            `${baseURL}/token_refresh`,
            {
              refresh_token: refreshToken,
              token: accessToken,
            },
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const newAccessToken = refreshResponse.data.token;
          const newRefreshToken = refreshResponse.data.refresh_token;
          
          localStorage.setItem("access", newAccessToken);
          localStorage.setItem("refresh", newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosPrivate(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token API error:", refreshError);

          // Explicitly handle 401 from refresh token endpoint
          if (refreshError.response?.status === 401) {
            if (RedirectManager.canRedirect()) {
              console.log('Performing redirect');
              localStorage.removeItem("access");
              localStorage.removeItem("refresh");
              window.location.href = "/";
            }
            return Promise.reject(refreshError);
          }
        }
      } else {
        // No tokens available, force logout
        if (RedirectManager.canRedirect()) {
          console.log('No tokens, performing redirect');
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    }

    // Handle other error statuses
    if (error.response?.status === 500) {
      toast.error("Please retry later!");
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;