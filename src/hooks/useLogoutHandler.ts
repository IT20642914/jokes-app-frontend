import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustandStore/useAuthStore";
import { clearAuthData } from "@/core/authUtils";
import { axiosModerateJokesInstance } from "@/services";

const useLogoutHandler = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleLogout = () => {
      clearAuthData();
      logout();
      router.push("/login");
    };

    const handleAuthError = (error: any) => {
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
      return Promise.reject(error);
    };

    // Attach the interceptor
    const requestInterceptor =
      axiosModerateJokesInstance.interceptors.response.use(
        (response) => response,
        handleAuthError,
      );

    // Clean up the interceptor when the component unmounts
    return () => {
      axiosModerateJokesInstance.interceptors.response.eject(
        requestInterceptor,
      );
    };
  }, [logout, router]);
};

export default useLogoutHandler;
