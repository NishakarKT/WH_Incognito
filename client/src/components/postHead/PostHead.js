import React from "react";
import "./PostHead.css";
// mui
import { Avatar } from "@mui/material";

const PostHead = ({ profilePic, name, date }) => {
    return (
        <div className="postHead">
            <Avatar src={profilePic} alt="" />
            <div className="postHead__content">
                <p className="postHead__main">{name}</p>
                <p className="postHead__sub">{new Date(date).toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p>
            </div>
        </div>
    );
};

export default PostHead;
