import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/authService";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(selectName);

    const logout = async() => {
        await logoutUser();
        dispatch(SET_LOGIN(false));
        navigate('/');
    }


    return (  
        <header className="--pad header">
            <div className="--flex-between">
                <h3>
                    <span className="--fw-thin">Welcome, </span>
                    <span className="--color-danger">{name}</span>
                </h3>
                <button className="--btn --btn-danger" onClick={logout}>Logout</button>
            </div>
            <hr />
        </header>
    );
}

export default Header;