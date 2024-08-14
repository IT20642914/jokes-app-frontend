export const clearAuthData = () => {
  localStorage.removeItem("accessToken");
  localStorage.clear();
};
