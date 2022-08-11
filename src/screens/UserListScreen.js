import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as styles from "./UserListScreen.module.css";
import {
    deleteCoach,
    getCoachs,
    setSelectedCoach,
} from "../actions/coachActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function UserListScreen(props) {
    const dispatch = useDispatch();
    const { loading, coachs, error } = useSelector((state) => state.coachs);

    useEffect(() => {
        dispatch(getCoachs());
    }, [dispatch]);

    const deleteHandler = (coach) => {
        dispatch(deleteCoach(coach.id));
    };

    const handleUpdateCoach = (coach) => {
        dispatch(setSelectedCoach(coach));
        props.history.push(`/modcoach/${coach.id}`);
    };

    return (
        <div className={styles.userlists_wrapper}>
            <div style={{ display: "flex", marginBottom: 8 }}>
                <div style={{ flexGrow: 1 }}></div>
                <div style={{ flexGrow: 1, textAlign: "center" }}>
                    <h6 style={{ fontSize: "18px" }}>User List</h6>
                </div>

                <div style={{ flexGrow: 1, textAlign: "end" }}>
                    <button className={styles.create_button}>Create</button>
                </div>
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox danger="danger">{error}</MessageBox>
            ) : (
                <table
                    className={`${styles.table} ${styles.table__productlists}`}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fullname</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Specializations</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coachs.map((coach) => (
                            <tr key={coach.id}>
                                <td>{coach.id}</td>
                                <td>{coach.fullname}</td>
                                <td>{coach.phoneNumber}</td>
                                <td>{coach.email}</td>
                                <td>{coach.roles.join(", ")}</td>
                                <td>
                                    {coach.specialization
                                        .map((sp) => sp.name)
                                        .join(", ")}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className={styles.small}
                                        onClick={() => handleUpdateCoach(coach)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.small}
                                        onClick={() => deleteHandler(coach)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserListScreen;
