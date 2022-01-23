import React from "react";
import "./ProfileFriendsList.css";
// components
import ProfileListItem from "../../../../../components/profileListItem/ProfileListItem";

const ProfileFriendsList = ({ friends, style, isFriend }) => {
    return (
        <div className="profileFriendsList" style={style}>
            {friends.map((friend, index) => <ProfileListItem key={index} profile={friend} isFriend={isFriend} />)}
        </div>
    );
};

export default ProfileFriendsList;
