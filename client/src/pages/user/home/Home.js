import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Home.css";
// firebase
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../../firebase";
// constants
import { USER_PROFILE_ROUTE, USER_TSG_ROUTE } from "../../../constants/routes";
import { POSTS_GET_ENDPOINT, POSTS_POST_ENDPOINT, SOCIETIES_GET_ENDPOINT, TSG_GET_ENDPOINT } from "../../../constants/endpoints";
// contexts
import UserContext from "../../../contexts/userContext";
// components
import FlexCard from "../../../components/flexCard/FlexCard";
import ProfileListItem from "../../../components/profileListItem/ProfileListItem";
import EventsCalendar from "../../../components/eventsCalendar/EventsCalendar";
import MediaSlider from "../../../components/mediaSlider/MediaSlider";
import Loader from "../../../components/loader/Loader";
// utils
import { mediaType } from "../../../utils";
// mui
import { Avatar, TextareaAutosize, Button, IconButton } from "@mui/material";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const Home = () => {
    const history = useHistory();
    const contentRef = useRef(null);
    const filesInputRef = useRef(null);
    const { user, friends } = useContext(UserContext);
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [progress, setProgress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);

    useEffect(() => {
        try {
            axios.get(POSTS_GET_ENDPOINT + "/all")
                .then(res => setPosts(res.data))
                .catch(err => { })
            axios.get(TSG_GET_ENDPOINT)
                .then(res => setPosts(posts => [...res.data, ...posts]))
                .catch(err => { })
            axios.get(SOCIETIES_GET_ENDPOINT)
                .then(res => setPosts(posts => [...res.data, ...posts]))
                .catch(err => { })
        } catch (err) { }
    }, []);

    const handleFiles = (e) => {
        setMediaFiles(Array.from(e.target.files).map(file => {
            const type = mediaType(file.name.split(".").slice(-1)[0]);
            return ({ type, url: URL.createObjectURL(file) });
        }));
    };

    const handleNewPost = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const date = new Date();
        const description = formData.get("description");
        const category = "Personal";
        const files = formData.getAll("files");;
        const host = user.email;
        const data = { date, description, category, host, fileURLs: [] };
        handleUpload(data, files[0]?.name ? files : null);
        // reset
        setContent("");
        setMediaFiles([]);
    };

    const handleUpload = (data, files) => {
        setIsLoading(true);

        if (files)
            getFileURLs(data, files);
        else {
            axios.post(POSTS_POST_ENDPOINT, data)
                .then(res => {
                    setPosts(posts => [res.data.doc, ...posts]);
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsLoading(false);
                });
        };
    };

    const getFileURLs = (data, files) => {
        const fileURLs = [];
        setProgress([]);

        files.map((file, index) => {
            const storageRef = ref(storage, "posts/" + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_change",
                snapshot => {
                    const taskProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress => {
                        const myProgress = [...progress];
                        myProgress[index] = { file: file.name, taskProgress };
                        return myProgress;
                    });
                },
                error => null,
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setProgress(progress => {
                        const myProgress = progress.filter(progress => progress.file !== file.name);
                        return myProgress;
                    });
                    fileURLs.push(downloadURL);
                    if (fileURLs.length === files.length)
                        handleUpload({ ...data, fileURLs }, null);
                });
        });
    };

    return (
        <div className="home">
            {isLoading ? <Loader progress={progress} /> : null}
            <div className="home__friends">
                <h1>Friends List <sup style={{ fontSize: "15px", color: "#1974ec" }}>({friends.length})</sup></h1>
                <p>To add someone as your friend, click on <span style={{ color: "#1974ec" }}>Add Friend</span> through their profile.</p>
                {friends.map((friend, index) => <ProfileListItem key={index} profile={friend} isFriend onClick={() => history.push(USER_PROFILE_ROUTE + "/" + friend.email)} />)}
            </div>
            <form className="home__posts" onSubmit={e => handleNewPost(e)}>
                {user.name ? <div>
                    <Avatar src={user.profilePic} alt="" />
                    <TextareaAutosize placeholder="What's on your mind?" value={content} onChange={e => setContent(e.target.value)} ref={contentRef} />
                </div> : null}
                {user.name ? <MediaSlider mediaFiles={mediaFiles} style={{ height: "250px", marginBottom: "10px" }} /> : null}
                {user.name ? <div style={{ marginBottom: "20px" }}>
                    <IconButton onClick={() => filesInputRef.current.click()}><AttachFileRoundedIcon style={{ transform: "rotate(30deg)" }} /></IconButton>
                    <input type="file" name="files" style={{ display: "none" }} onChange={e => handleFiles(e)} multiple ref={filesInputRef} />
                    <IconButton className="home__sendBtn" style={{ transform: `scale(${content ? "1" : "0"})` }} type="submit"><SendRoundedIcon style={{ transform: "rotate(-30deg)" }} /></IconButton>
                </div> : null}
                {posts.slice(0, 30).map((post, index) => <FlexCard key={index} data={post} profilePic={user.profilePic} name={user.name} style={{ marginBottom: "10px" }} />)}
                <div className="home__noMorePosts">
                    <p>No more posts.</p>
                    <span onClick={() => window.location.reload()}><RefreshRoundedIcon />Refresh</span>
                </div>
            </form>
            <div className="home__side">
                <h1>Events Calendar <sub style={{ fontSize: "12px", color: "red" }}>(Incomplete)</sub></h1>
                <p>Kepp an eye on the calendar for the upcoming <Link className="home__link" to={USER_TSG_ROUTE}>events</Link>.</p>
                <EventsCalendar />
            </div>
        </div>
    );
};

export default Home;
