import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { updateUserProfile } from "../actions/userActions";
import * as profilestyles from "./ProfileScreen.module.css";

function AccountScreen() {
    const [profile, setProfile] = useState({
        email: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        dateOfBirth: "2022-06-29",
        gender: {},
    });

    const userSignin = useSelector((state) => state.userSignin);
    const { user: userInfo } = userSignin;
    const dispatch = useDispatch();
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        error: errorUpdate,
        success: successUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) return;

        setProfile({ ...userInfo, genderId: `${userInfo.gender.id}` });
    }, [dispatch, userInfo]);

    const updateUserInfoHandler = () => {
        dispatch(
            updateUserProfile(userInfo.id, {
                ...profile,
            })
        );
    };

    const handleFieldChange = (field, value) => {
        setProfile({ ...profile, [field]: value });
    };

    return (
        <div className={profilestyles.account}>
            <h1>Profile</h1>
            {loadingUpdate ? (
                <LoadingBox />
            ) : errorUpdate ? (
                <MessageBox>{errorUpdate}</MessageBox>
            ) : (
                <div className={profilestyles.accounts_container}>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox>{errorUpdate}</MessageBox>}
                    {successUpdate && (
                        <MessageBox success="success">
                            Profile Updated Successfully
                        </MessageBox>
                    )}
                    <ul>
                        <li>
                            <label htmlFor="firstname">Firstname : </label>
                            <input
                                type="text"
                                id="firstname"
                                placeholder="Enter Firstname"
                                required
                                name="firstname"
                                value={profile.firstname}
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </li>
                        <li>
                            <label htmlFor="lastname">Lastname : </label>
                            <input
                                type="text"
                                id="lastname"
                                placeholder="Enter lastname"
                                required
                                name="lastname"
                                value={profile.lastname}
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </li>
                        <li>
                            <label htmlFor="phone">Phone Number : </label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Enter phone number"
                                required
                                name="phoneNumber"
                                value={profile.phoneNumber}
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </li>
                        <li>
                            <label htmlFor="email">Email : </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                required
                                name="email"
                                value={profile.email}
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </li>
                        <li>
                            <label htmlFor="gender">Gender : </label>
                            <select
                                value={profile.genderId}
                                name="genderId"
                                required
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>
                        </li>
                        <li>
                            <button
                                type="submit"
                                onClick={() => updateUserInfoHandler()}
                            >
                                Update
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AccountScreen;
