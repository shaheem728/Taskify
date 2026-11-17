import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "@/shared/context/useContext"

export const useUserAuth = () => {
    const { user, loading, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

useEffect(() => {
    if (loading || user) return;

    clearUser();
    navigate("/auth/login", { replace: true });
}, [user, loading, clearUser, navigate]);
}