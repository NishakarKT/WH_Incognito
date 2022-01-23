import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ProfileSettings.css";
// constants
import { USER_PATCH_ENDPOINT } from "../../../../constants/endpoints";
import { USER_PROFILE_ROUTE } from "../../../../constants/routes";
// contexts
import UserContext from "../../../../contexts/userContext";
import ProfileContext from "../../../../contexts/profileContext";
// components
import ProfileEditProfile from "./profileEditProfile/ProfileEditProfile";
import Loader from "../../../../components/loader/Loader";
// mui
import { Switch } from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const ProfileSettings = () => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const { profile, itsMe } = useContext(ProfileContext);
    const [darkTheme, setDarkTheme] = useState(false);
    const [locked, setLocked] = useState(user.locked);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
        if (!itsMe)
            history.push(USER_PROFILE_ROUTE + "/" + profile.email)
    }, [history, itsMe, profile]);

    const handleLock = e => {
        setLocked(e.target.checked);
        try {
            setIsLoading(true);
            axios.patch(USER_PATCH_ENDPOINT, { _id: user._id, locked: e.target.checked })
                .then(res => {
                    console.log("success");
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log("failure");
                    setIsLoading(false);
                });
        } catch (err) { console.log(err); };
    };

    return (
        <div className="profileSettings">
            {isLoading ? <Loader /> : null}
            <div className="profileSettings__intro">
                <h1>Settings</h1>
                <p>Here you get access to all the website settings which you may alter as per your convinience.</p>
            </div>
            <div className="profileSettings__options">
                <ProfileEditProfile />
                <div className="profileSettings__group">
                    <h1>General Settings</h1>
                    <div className="profileSettings__setting">
                        <div className="profileSettings__title">
                            <DarkModeRoundedIcon />
                            <p>Dark Mode <span>({darkTheme ? "Dark" : "Light"})</span></p>
                        </div>
                        <Switch checked={darkTheme} onChange={e => setDarkTheme(e.target.checked)} />
                    </div>
                    <div className="profileSettings__setting">
                        <div className="profileSettings__title">
                            <LockRoundedIcon />
                            <p>Lock Profile <span>({locked ? "Locked" : "Unlocked"})</span></p>
                        </div>
                        <Switch checked={locked} onChange={e => handleLock(e)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
