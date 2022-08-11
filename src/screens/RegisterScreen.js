import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import * as signinStyles from "./SignInScreen.module.css";

function SigninScreen(props) {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        dateOfBirth: "2022-06-29",
        genderId: "1",
    });
    const [primaryMessage, setPrimaryMessage] = useState("");

    const dispatch = useDispatch();

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    const userRegister = useSelector((state) => state.userRegister);
    const { user, error, loading } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        setPrimaryMessage("");
        if (userInfo.password.length > 8) {
            dispatch(register(userInfo));
        } else {
            setPrimaryMessage("Password at least contains 8 digits.");
        }
    };

    const handleFieldChange = (field, value) => {
        setUserInfo({ ...userInfo, [field]: value });
    };

    useEffect(() => {
        if (user) props.history.push("/signin");
    }, [redirect, user]);

    return (
        <div className={signinStyles.form_container}>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error ||
                    (primaryMessage && (
                        <MessageBox>{error || primaryMessage}</MessageBox>
                    ))}

                <div>
                    <label htmlFor="firstname">Firstname : </label>
                    <input
                        type="text"
                        id="firstname"
                        placeholder="Enter Firstname"
                        required
                        name="firstname"
                        onChange={(e) =>
                            handleFieldChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Lastname : </label>
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Enter lastname"
                        required
                        name="lastname"
                        onChange={(e) =>
                            handleFieldChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number : </label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Enter phone number"
                        required
                        name="phoneNumber"
                        onChange={(e) =>
                            handleFieldChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        name="email"
                        onChange={(e) =>
                            handleFieldChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender : </label>
                    <select
                        name="genderId"
                        required
                        onChange={(e) =>
                            handleFieldChange(e.target.name, e.target.value)
                        }
                    >
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="username">Username : </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter username"
                        required
                        name="username"
                        onChange={(e) =>
                            handleFieldChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="password">Password : </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        name="password"
                        onChange={(e) =>
                            handleFieldChange(e.target.name, e.target.value)
                        }
                    />
                </div>

                <div>
                    <button className={signinStyles.signin_btn} type="submit">
                        Create Account
                    </button>
                </div>
                <div>
                    <div>
                        Already have an account?{" "}
                        <Link to="/signin">SignIn</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SigninScreen;
