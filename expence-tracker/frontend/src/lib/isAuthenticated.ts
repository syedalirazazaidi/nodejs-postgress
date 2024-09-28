export const isAuthenticated_token = () => {
    const token = localStorage.getItem("token");
    return !!token; 
  };
  