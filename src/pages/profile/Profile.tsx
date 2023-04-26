import { useEffect, useState } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import './Profile.scss';
import { useAppDispatch } from '../../customHook/useAppDispatch';
import { SET_USER, selectUser } from '../../redux/features/auth/authSlice';
import { getUser } from '../../services/authService';
import { SpinnerImg } from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import { IUser } from '../../types/userTypes';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
    useRedirectLoggedOutUser('/login');
    const [profile, setProfile] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        setIsLoading(true);
        async function getUserData() {
            const data = await getUser();

            setProfile(data);
            setIsLoading(false);
            dispatch(SET_USER(data));
        };
        getUserData();
    }, [dispatch]);


    return (  
        <div className='profile --my2'>
            {isLoading && <SpinnerImg />}
            <>
                {!isLoading && profile === null ? (
                <p>Something went wrong, please reload the page...</p>
                ) : (
                <Card cardClass={"card --flex-dir-column"}>
                    <span className='profile-photo'>
                        <img src={profile?.photo} alt="profile picture" />
                    </span>

                    <span className='profile-data'>
                        <p>
                            <b>Name: </b> {profile?.name}
                        </p>
                        <p>
                            <b>Email: </b> {profile?.email}
                        </p>
                        <p>
                            <b>Phone: </b> {profile?.phone}
                        </p>
                        <p>
                            <b>Bio: </b> {profile?.bio}
                        </p>

                        <div>
                            <Link to='/edit-profile'>
                                <button className='--btn --btn-primary'>Edit profile</button>
                            </Link>
                        </div>
                    </span>
                </Card>
                )}
                
            </>
        </div>
    );
}

export default Profile;