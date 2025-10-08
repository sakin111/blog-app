import axios from "axios";


const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
});


baseApi.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);


baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        return baseApi(error.config);
      } catch (err) {
        console.error("Session expired, redirecting...", err);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }


    return Promise.reject(error);
  }
);

export default baseApi;
