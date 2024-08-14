import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustandStore/useAuthStore";

const useRequireAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};

export default useRequireAuth;
