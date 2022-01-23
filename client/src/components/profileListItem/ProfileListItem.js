import React, { useState } from "react";
import "./ProfileListItem.css";
// mui
import { Button, IconButton, Dialog, Avatar } from "@mui/material";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

const ProfileListItem = ({ profile, isFriend, onClick, style }) => {
    const [friend, setFriend] = useState(isFriend);
    const [alert, setAlert] = useState(false);

    const handleNewFriend = () => {
        setAlert(false);
        // handle new friend
        setFriend(true);
    }

    const handleUnfriend = () => {
        setAlert(false);
        // handle unfriend
        setFriend(false);
    }

    return (
        <div className="profileListItem" style={style} onClick={onClick}>
            <Avatar src={profile.profilePic} alt="" />
            <div className="profileListItem__content">
                <p className="profileListItem__name">{profile.name}</p>
                <p className="profileListItem__roll">{profile.roll}</p>
            </div>
            <IconButton className={friend ? "profileListItem__isFriend" : ""} onClick={() => setAlert(true)}>{friend ? <PeopleAltRoundedIcon /> : <PersonAddRoundedIcon />}</IconButton>
            <Dialog open={alert} onClose={() => setAlert(false)}>
                <div className="profileListItem__alertBox">
                    <h1>Are you sure you wish to unfriend, <span style={{ color: "#1974ec", fontWeight: "500" }}>{profile.name}</span>?</h1>
                    <p>Note that <span style={{ color: "#1974ec", fontWeight: "500" }}>{profile.name.split(" ")[0]}</span> shall no longer be your friend and if you ever change your mind, you need to refriend again.</p>
                    <div className="profileListItem__buttons">
                        <Button onClick={() => setAlert(false)}>Cancel</Button>
                        <Button onClick={() => friend ? handleUnfriend() : handleNewFriend()}>{friend ? "Unfriend" : "Add Friend"}</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ProfileListItem;
