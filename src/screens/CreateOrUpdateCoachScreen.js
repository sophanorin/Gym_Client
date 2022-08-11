import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedCoach, setSelectedCoach } from "../actions/coachActions";
import { getSpecializations } from "../actions/specializationActions";
import LoadingBox from "../components/LoadingBox";
import * as styles from "./CreateOrUpdateCoachScreen.module.css";

function CreateOrUpdateCoachScreen(props) {
    const coachId = props.match.params.id;
    const dispatch = useDispatch();

    const [coach, setCoach] = useState(null);

    const { loading, selectedCoach } = useSelector((state) => state.coachs);
    const { specializations } = useSelector((state) => state.specializations);

    const handleFieldChange = (field, value) => {
        setCoach({ ...coach, [field]: value });
    };

    const handleSubmit = () => {};

    useEffect(() => {
        setCoach(selectedCoach);
        return () => {
            dispatch(clearSelectedCoach());
        };
    }, [dispatch, selectedCoach]);

    useEffect(() => {
        if (specializations) return;

        dispatch(getSpecializations());
    }, []);

    return (
        <div className={styles.root}>
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <h1>Update Coach</h1>
                </div>
                {!coach ? (
                    <LoadingBox />
                ) : (
                    <>
                        {" "}
                        <div>
                            <label htmlFor="firstname">Firstname : </label>
                            <input
                                type="text"
                                id="firstname"
                                placeholder="Enter Firstname"
                                required
                                name="firstname"
                                value={coach.firstname}
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
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
                                value={coach.lastname}
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
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
                                value={coach.phoneNumber}
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
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
                                value={coach.email}
                                onChange={(e) =>
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="gender">Gender : </label>
                            <select
                                name="genderId"
                                required
                                value={coach.genderId}
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
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
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
                                    handleFieldChange(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <button className={styles.signin_btn} type="submit">
                                Create
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default CreateOrUpdateCoachScreen;
