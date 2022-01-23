import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./ProfileFriends.css";
// components
import ProfileFriendsList from "./profileFriendsList/ProfileFriendsList";
// constants
import { USER_PROFILE_ROUTE } from "../../../../constants/routes";
// contexts
import UserContext from "../../../../contexts/userContext";
import ProfileContext from "../../../../contexts/profileContext";

const ProfileFriends = () => {
    const history = useHistory();
    const { user, users, friends } = useContext(UserContext);
    const { profile, itsMe } = useContext(ProfileContext);

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
        if (!itsMe)
            history.push(USER_PROFILE_ROUTE + "/" + profile.email)
    }, [history, itsMe, profile]);

    return (
        <div className="profileFriends">
            <div className="profileFriends__group">
                <h1>Friends List <sup style={{ fontSize: "15px", color: "#1974ec" }}>({friends?.length})</sup></h1>
                <p>To add someone as your friend, click on <span style={{ color: "#1974ec" }}>Add Friend</span> through their profile.</p>
                <ProfileFriendsList friends={friends} isFriend />
            </div>
            <div className="profileFriends__group">
                <h1>People you may know.</h1>
                <p>The folowing list is of people with common connections where you may make new friends.</p>
                <ProfileFriendsList friends={users.filter(u => !user.friends.includes(u.email) && u.email !== user.email)} />
            </div>
        </div>
    );
};

export default ProfileFriends;
