import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoachs } from "../actions/coachActions";
import CoachCard from "../components/CoachCard";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import * as styles from "./ListCoachScreen.module.css";

function ListCoachScreen() {
    const dispatch = useDispatch();

    const { loading, coachs, error } = useSelector((state) => state.coachs);

    useEffect(() => {
        dispatch(getCoachs());
    }, [dispatch]);

    return (
        <div className={styles.coach_wrapper}>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox>{error}</MessageBox>
            ) : (
                coachs.map((coach) => (
                    <CoachCard key={coach.dispatch} coach={coach} />
                ))
            )}
        </div>
    );
}

export default ListCoachScreen;
