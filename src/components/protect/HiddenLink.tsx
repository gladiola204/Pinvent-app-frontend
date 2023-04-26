import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";


export function ShowOnLogin({children}: {children: JSX.Element[] | JSX.Element}) {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn) {
        return (
        <>
            {children}
        </>);
    } else return null;
};

export function ShowOnLogout({children}: {children: JSX.Element[] | JSX.Element}) {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(!isLoggedIn) {
        return (
            <>
                {children}
            </>);
    } else return null;
};
