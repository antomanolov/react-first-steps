import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { emoji, allSkills } from "./data";

function App() {
    return (
        <div className="card">
            <Avatar img="./imgs/cardpic.webp" />
            <div className="data">
                <Intro />
                <SkillList skills={allSkills} />
            </div>
        </div>
    );
}

function Intro() {
    return (
        <div>
            <h1>Alucard D. Vampire</h1>
            <p>
                D wanders through a far-future post-nuclear war Earth that
                combines elements of pulp genres: western, science fiction,
                horror and Lovecraftian horror, dark fantasy, folklore and
                occult science. The planet, once terrified by the elegant but
                cruel vampires known as Nobles (貴族, Kizoku), ancient demons,
                mutants and their technological creations.
            </p>
        </div>
    );
}

function SkillList({ skills }) {
    return (
        <div className="skill-list">
            {skills.map((skill) => (
                <span
                    key={skill.skill}
                    style={{ backgroundColor: skill.color }}
                    className="skill"
                >
                    {skill.skill} {emoji[skill.level]}
                    {/* OR */}
                    {/* {skill.skill}{" "}
                    {(skill.level === "beginner" && "👶") ||
                        (skill.level === "intermediate" && "🤘") ||
                        (skill.level === "advanced" && "💪")} */}
                </span>
            ))}
        </div>
    );
}

// function getEmoji(level) {
//     if (level === "begginer") {
//         return emoji[level];
//     } else if (level === "intermediate") {
//         return emoji[level];
//     } else {
//         return emoji[level];
//     }Ч
// }

function Avatar({ img }) {
    return <img className="avatar" src={img} alt="background card" />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
