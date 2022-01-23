import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import { NavLink, useParams, useHistory, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
// constants
import { USER_HOME_ROUTE, USER_PROFILE_POSTS_ROUTE, USER_PROFILE_FRIENDS_ROUTE, USER_PROFILE_ROUTE, USER_PROFILE_NOTIFICATIONS_ROUTE, USER_PROFILE_SETTINGS_ROUTE, USER_PROFILE_CERTIFICATES_ROUTE, USER_PROFILE_MESSAGES_ROUTE } from "../../../constants/routes";
import { POSTS_GET_ENDPOINT, USER_GET_ENDPOINT, NOTIFICATIONS_POST_ENDPOINT } from "../../../constants/endpoints";
// contexts
import UserContext from "../../../contexts/userContext";
import ProfileContext from "../../../contexts/profileContext";
// components
import Loader from "../../../components/loader/Loader";
import MediaSlider from "../../../components/mediaSlider/MediaSlider";
import ScrollDown from "../../../components/scrollDown/ScrollDown";
// mui
import { Button } from "@mui/material";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RedditIcon from "@mui/icons-material/Reddit";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
// sub pages
const ProfilePosts = lazy(() => import("./profilePosts/ProfilePosts"));
const ProfileFriends = lazy(() => import("./profileFriends/ProfileFriends"));
const ProfileMessages = lazy(() => import("./profileMessages/ProfileMessages"));
const ProfileNotifications = lazy(() => import("./profileNotifications/ProfileNotifications"));
const ProfileSettings = lazy(() => import("./profileSettings/ProfileSettings"));
const ProfileCertificates = lazy(() => import("./profileCertificates/ProfileCertificates"));

const Profile = () => {
    const history = useHistory();
    const { email, category } = useParams();
    const { user, notifications } = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [itsMe, setItsMe] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isReqSent, setIsReqSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (email === "undefined") history.push(USER_HOME_ROUTE);
        try {
            setItsMe(email === user.email);
            axios.get(USER_GET_ENDPOINT + "/" + email)
                .then(res => setProfile(res.data))
                .catch(err => { })
        } catch (err) { };

    }, [history, user, email, category]);

    useEffect(() => {
        try {
            setIsLoading(true);
            axios.get(POSTS_GET_ENDPOINT + "/" + email)
                .then(res => {
                    setPosts(res.data);
                    setIsLoading(false);
                })
                .catch(err => { setIsLoading(false); })
        } catch (err) { };
    }, []);

    const handleFriendReq = () => {
        const title = "Friend Request";
        const type = "friend request";
        const from = { name: user.name, email: user.email };
        const to = { name: profile.name, email: profile.email };
        const data = { title, type, from, to };
        try {
            setIsLoading(true);
            axios.post(NOTIFICATIONS_POST_ENDPOINT, data)
                .then(res => setIsLoading(false))
                .catch(err => setIsLoading(false))
        } catch (err) { console.log(err); };
    };

    return (profile.name ?
        <div className="profile">
            {isLoading ? <Loader /> : null}
            <MediaSlider mediaFiles={posts.map(post => post.fileURLs[0]).filter(post => Boolean(post))} isBgFixed isCarousel canDefault style={{ height: "60vh" }} />
            <div className="profile__shapeDivider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="profile__pic">
                <div className="profile__social">
                    {profile.contact.facebook ? <FacebookRoundedIcon className="profile__fbIcon" onClick={() => window.open(profile.contact.facebook)} /> : null}
                    {profile.contact.instagram ? <InstagramIcon className="profile__igIcon" onClick={() => window.open(profile.contact.instagram)} /> : null}
                    {profile.contact.linkedin ? <LinkedInIcon className="profile__inIcon" onClick={() => window.open(profile.contact.linkedin)} /> : null}
                    {profile.contact.youtube ? <YouTubeIcon className="profile__ytIcon" onClick={() => window.open(profile.contact.youtube)} /> : null}
                    {profile.contact.github ? <GitHubIcon className="profile__ghIcon" onClick={() => window.open(profile.contact.github)} /> : null}
                    {profile.contact.twitter ? <TwitterIcon className="profile__twIcon" onClick={() => window.open(profile.contact.twitter)} /> : null}
                    {profile.contact.pinterest ? <PinterestIcon className="profile__pnIcon" onClick={() => window.open(profile.contact.pinterest)} /> : null}
                    {profile.contact.reddit ? <RedditIcon className="profile__rdIcon" onClick={() => window.open(profile.contact.reddit)} /> : null}
                </div>
                <img src={profile.profilePic} alt="" onClick={() => window.open(profile.profilePic)} />
            </div>
            <div className="profile__cover">
                <p>{profile.quote}</p>
                <ScrollDown clickFunc={() => window.scrollTo(0, 0.7 * window.innerHeight)} />
            </div>
            <div className="profile__info">
                <div className="profile__infoHead">
                    <h1>{profile.name}</h1>
                    <div>{profile.gender === "male" ? <MaleRoundedIcon style={{ color: "#03A3F3" }} /> : <FemaleRoundedIcon style={{ color: "#DD037C" }} />}{profile.roll}</div>
                </div>
                <a className="profile__link" href={"mailto:" + profile.email} rel="noreferrer"><AlternateEmailRoundedIcon />{profile.email}</a>
                {!itsMe ? <div className="profile__options">
                    {!user.friends.includes(profile.email) ? isReqSent || (!notifications.find(notif => (notif.from.email === user.email && notif.to.email === profile.email) || ((notif.from.email === profile.email && notif.to.email === user.email))) ? <Button onClick={() => handleFriendReq()}><PersonAddAltRoundedIcon />Add Friend</Button> : <p style={{ fontWeight: "500", color: "red", marginTop: "5px" }}>Friend request is pending...</p>) : <Button><ChatRoundedIcon />Message</Button>}
                </div> : <div style={{ height: "10px" }}></div>}
            </div>
            <div className="profile__navLinks">
                <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/posts"} className="profile__navLink" activeClassName="profile__activeNavLink"><DynamicFeedRoundedIcon />Posts</NavLink>
                {itsMe ? <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/friends"} className="profile__navLink" activeClassName="profile__activeNavLink"><PeopleAltRoundedIcon />Friends</NavLink> : null}
                {itsMe ? <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/messages"} className="profile__navLink" activeClassName="profile__activeNavLink"><ForumRoundedIcon />Messages</NavLink> : null}
                <NavLink to={USER_PROFILE_ROUTE + "/" + profile.email + "/certificates"} className="profile__navLink" activeClassName="profile__activeNavLink"><EmojiEventsRoundedIcon />Certificates</NavLink>
                {itsMe ? <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/notifications"} className="profile__navLink" activeClassName="profile__activeNavLink"><NotificationsActiveIcon />Notifications</NavLink> : null}
                {itsMe ? <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/settings"} className="profile__navLink" activeClassName="profile__activeNavLink"><SettingsRoundedIcon />Settings</NavLink> : null}
            </div>
            <Suspense fallback={<Loader />}>
                <ProfileContext.Provider value={{ itsMe, profile, posts, setPosts }}>
                    <Switch>
                        <Route exact path={USER_PROFILE_POSTS_ROUTE} component={ProfilePosts} />
                        <Route exact path={USER_PROFILE_FRIENDS_ROUTE} component={ProfileFriends} />
                        <Route exact path={USER_PROFILE_MESSAGES_ROUTE} component={ProfileMessages} />
                        <Route exact path={USER_PROFILE_NOTIFICATIONS_ROUTE} component={ProfileNotifications} />
                        <Route exact path={USER_PROFILE_SETTINGS_ROUTE} component={ProfileSettings} />
                        <Route path={USER_PROFILE_CERTIFICATES_ROUTE} component={ProfileCertificates} />
                        <Redirect to={USER_PROFILE_POSTS_ROUTE} />
                    </Switch>
                </ProfileContext.Provider>
            </Suspense>
        </div> :
        <div>No Student found!</div>
    );
};

export default Profile;
