import React from "react";
import "./Loader.css";

const Loader = ({ progress }) => {
    return (
        <div className="loader__container">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {progress?.length ? <div className="loader__progressList">
                <h1>Uploading Files:</h1>
                {progress.slice(0, 5).map(progress => <p key={progress.file}><span style={{ marginRight: "25px" }}>{progress.file}</span><span>{Math.round(progress.taskProgress * 100) / 100} %</span></p>)}
                {progress.length > 5 ? <p style={{ marginBottom: "0" }}><span style={{ color: "lime", marginRight: "5px" }}>{progress.length - 5} more</span>in progress...</p> : null}
            </div> : null
            }
        </div>
    );
};

export default Loader;
