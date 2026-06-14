import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchUser } from "../../../Store/authSlice";
import { useNavigate } from "react-router";

export const PublicRoute = ({ children }) => {
     const navigate = useNavigate();
     const dispatch=useDispatch()
    const { user, initialized } = useSelector((state) => state.auth);

    // Fetch user once on mount, if not initialized
    useEffect(() => {
        if (!initialized && !user) {
            dispatch(fetchUser());
            return
        }
    }, [initialized,user, dispatch]);

    // Redirect if user is authenticated
     if (user && initialized) {
            navigate("/");
        }
    return user ?null: children

}