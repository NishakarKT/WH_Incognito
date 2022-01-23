import React from "react";
import "./ScrollDown.css";

const ScrollDown = ({ clickFunc, style }) => {
    return (
        <div className="scrollDown" style={style} onClick={() => clickFunc()}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default ScrollDown;
