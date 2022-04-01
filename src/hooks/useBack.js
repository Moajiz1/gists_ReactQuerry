import { useNavigate } from "react-router-dom";

export const useBack = () => {
  let navigate = useNavigate();
  const backBtn = () => {
    navigate("/userprofile");
  };
  return { backBtn };
};

export const useLogout = () => {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload(false);
  };
  return { logout };
};
