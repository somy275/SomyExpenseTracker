import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUser } from "../../../Store/authSlice";
export const PrivateRoute = ({ children }) => {
    const { user, initialized } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!initialized) {
            dispatch(fetchUser())
        }
    }, [initialized, dispatch])
    useEffect(() => {
        if (!user && initialized) {
            navigate("/login")
        }
    })
    return user ? children : null
}