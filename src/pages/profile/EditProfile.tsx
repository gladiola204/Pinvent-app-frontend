import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NAME, SET_USER, selectUser } from '../../redux/features/auth/authSlice';
import { IUser } from '../../types/userTypes';
import Loader from '../../components/loader/Loader';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import Card from '../../components/card/Card';
import { getUser, updateUser } from '../../services/authService';
import { useAppDispatch } from '../../customHook/useAppDispatch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../../components/changePassword/ChangePassword';


function EditProfile() {
    useRedirectLoggedOutUser('/login');
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(user);
    const [profileImage, setProfileImage] = useState<File>();

    const changeProfile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setProfile({ ...profile, [name]: value});
    };

    const changeProfileImage = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) setProfileImage(event.target.files[0])
    };

    const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // Handle image upload
            let imageURL;
            if ( profileImage && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" ||profileImage.type === "image/png")) {
                const image = new FormData();
                image.append("file", profileImage);
                image.append("cloud_name", "dhlmsloa4");
                image.append("upload_preset", "aunxgaeu");

                // First save image to cloudinary
                const response = await fetch(
                "https://api.cloudinary.com/v1_1/dhlmsloa4/image/upload",
                { method: "post", body: image }
                );
                const imgData = await response.json();
                imageURL = imgData.url.toString();
            }
            // Save profile
            const formData = {
                name: profile.name,
                phone: profile.phone,
                bio: profile.bio,
                photo: profileImage ? imageURL : profile.photo,
            }

            const data = await updateUser(formData);
            dispatch(SET_NAME(profile.name));
            toast.success("User updated");
            navigate('/profile');
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        async function getUserData() {
            setIsLoading(true);
            const data = await getUser();

            setProfile(data);
            setIsLoading(false);
            dispatch(SET_USER(data));
        };
        if(!user.email) getUserData();
    }, [dispatch]);

    return (  
        <div className='--profile --my2'>
            {isLoading && <Loader />}
            <Card cardClass={"card --flex-dir-column"}>
                    <span className='profile-photo'>
                        <img src={profile?.photo} alt="profile picture" />
                    </span>

                    <form className="--form-control --m" onSubmit={saveProfile}>
                        <span className='profile-data'>
                            <p>
                                <label>Name:</label>
                                <input type="text" name='name' value={profile?.name} onChange={changeProfile}/>
                            </p>
                            <p>
                                <label>Email:</label>
                                <input type="text" name='email' value={profile?.email} disabled/>
                                <br />
                                <code>Email cannot be changed.</code>
                            </p>
                            <p>
                                <label>Phone:</label>
                                <input type="text" name='phone' value={profile?.phone} onChange={changeProfile}/>
                            </p>
                            <p>
                                <label>Bio:</label>
                                <textarea name='bio' value={profile?.bio} onChange={changeProfile} cols={30} rows={10} />
                            </p>
                            <p>
                                <label>Photo:</label>
                            <input type="file" name='image' onChange={changeProfileImage}/>
                            </p> 

                            <div>
                                <button className='--btn --btn-primary' type='submit'>Save changes</button>
                                
                            </div>
                        </span>
                    </form>
                </Card>
                <br />
                <ChangePassword />
        </div>
    );
}

export default EditProfile;