import { useNavigate } from "react-router-dom";

export const useCheckAuth = () => {
  const navigate = useNavigate();

  const checkAuth = (response) => {
    if (response.data === "Token required" || response.data.auth === false)
      return navigate("/admin/login", { replace: true });
  };

  return checkAuth;
};
