import { useEffect } from "react";
import { getUserStatus } from "../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function useRedirectLoggedOutUser(path: string) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        async function redirectLoggedOutUser() {
            const status = await getUserStatus();
            dispatch(SET_LOGIN(status));

            if(status === false) {
                toast.info('Session expired, please login to continue');
                navigate(path);
            };
        };
        redirectLoggedOutUser();
    }, [navigate, path, dispatch]);

}

export default useRedirectLoggedOutUser;