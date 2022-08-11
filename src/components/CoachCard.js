import React, { memo } from "react";
import * as styles from "./CoachCard.module.css";

function CoachCard(props) {
    const { coach } = props;

    return (
        <div className={styles.card_container}>
            <div className={styles.card_cover}>
                <div className={styles.profile}>
                    <img src="https://news.artnet.com/app/news-upload/2022/01/TK-Bored-Ape.jpg" />
                </div>
            </div>
            <div className={styles.card_content}>
                <p>
                    <span>Name : </span> <span>{coach.fullname}</span>
                </p>
                <p>
                    <span>Gender : </span> <span>{coach.gender.name}</span>
                </p>
                <p>
                    <span>Email : </span> <span>{coach.email}</span>
                </p>
                <p>
                    <span>Phone : </span> <span>{coach.phoneNumber}</span>
                </p>
                <p>
                    <span>Specialization : </span>
                    <ul className={styles.specializations}>
                        {coach.specialization.map((spec) => (
                            <li key={spec.id}>{spec.name}</li>
                        ))}
                    </ul>
                </p>
            </div>
            <div className={styles.card_actions}>
                <button>Make appointment</button>
            </div>
        </div>
    );
}

export default memo(CoachCard);
