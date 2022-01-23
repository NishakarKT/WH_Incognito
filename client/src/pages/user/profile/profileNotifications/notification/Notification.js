import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Notification.css";
// constants
import { TSG_LOGO_PNG } from "../../../../../constants/images";
import { USER_PROFILE_ROUTE } from "../../../../../constants/routes";
import { NOTIFICATIONS_DELETE_ENDPOINT, USER_PATCH_ENDPOINT } from "../../../../../constants/endpoints";
// contexts
import UserContext from "../../../../../contexts/userContext";
// components
import Loader from "../../../../../components/loader/Loader";
// mui
import { Button } from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";

const Notification = ({ notification, style }) => {
    const { user, setNotifications } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);

    const handleFriendReq = response => {
        const friends = user.friends;
        friends.push(notification.from.email);

        if (response === "accept") {
            try {
                // setIsLoading(true);
                axios.patch(USER_PATCH_ENDPOINT, { ...user, friends })
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err.response.data))

                // setIsLoading(true)
                // axios.patch(USER_PATCH_ENDPOINT, {})
                //     .the(res => setIsLoading(false))
                //     .catch(err => setIsLoading(false))
            } catch (err) { console.log(err) }
        }
        else if (response === "reject") {
            setIsLoading(true);
            axios.delete(NOTIFICATIONS_DELETE_ENDPOINT + "/" + notification._id)
                .then(res => {
                    setIsLoading(false);
                    setNotifications(notifications => {
                        const myNotifications = notifications.filter(notif => notif._id !== notification._id)
                        return myNotifications;
                    })
                })
                .catch(err => setIsLoading(false))
        }
    };

    return (
        <div className="notification" style={style}>
            {isLoading ? <Loader /> : null}
            <img className="notification__tag" src={TSG_LOGO_PNG} alt="" />
            {notification.title ? <p className="notification__title">{notification.title}</p> : null}
            {notification.date ? <p className="notification__date">{notification.date.toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p> : null}
            {notification.description ? <p className="notification__description">{notification.description}</p> : null}
            {!notification.description && notification.type === "friend request" ? <p className="notification__description">You have <b style={{ color: "green" }}>{user.email === notification.from.email ? "sent" : "recieved"}</b> a friend request {user.email === notification.from.email ? "to" : "from"} {user.email === notification.from.email ? <Link to={USER_PROFILE_ROUTE + "/" + notification.to.email} className="notification__link">{notification.to.name}</Link> : <Link to={USER_PROFILE_ROUTE + "/" + notification.from.email} className="notification__link">{notification.from.name}</Link>} <b style={{ color: "red" }}>(Pending)</b></p> : null}
            {notification.to.email === user.email && notification.type === "friend request" ? <div className="notification__buttons">
                <Button onClick={() => handleFriendReq("accept")}><PersonAddAlt1RoundedIcon />Accept</Button>
                <Button onClick={() => handleFriendReq("reject")}><PersonRemoveAlt1RoundedIcon />Reject</Button>
            </div> : null}
            {notification.from.name ? <p className="notification__from">~ {notification.from.name}</p> : null}
        </div>
    );
};

export default Notification;
