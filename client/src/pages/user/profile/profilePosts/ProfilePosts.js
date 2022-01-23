import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "./ProfilePosts.css";
// firebase
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../../../firebase";
// constants
import { KGP_JPG } from "../../../../constants/images";
import { POSTS_POST_ENDPOINT } from "../../../../constants/endpoints";
import { QUICK_GRIEVANCE_URL } from "../../../../constants/urls";
// contexts
import ProfileContext from "../../../../contexts/profileContext";
// components
import FlexCard from "../../../../components/flexCard/FlexCard";
import Loader from "../../../../components/loader/Loader";
import MediaSlider from "../../../../components/mediaSlider/MediaSlider";
// utils
import { capitalize, mediaType } from "../../../../utils";
// mui
import { Avatar, IconButton, Button, TextareaAutosize, Pagination } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";

const ProfilePosts = () => {
    const contentRef = useRef(null);
    const filesInputRef = useRef(null);
    const { posts, setPosts } = useContext(ProfileContext);
    const { profile } = useContext(ProfileContext);
    const [locked, setLocked] = useState(profile.locked);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        if (window.scrollY > 10)
            window.scrollTo(0, window.innerHeight);
    }, []);

    const handleLock = () => {
        setLocked(locked => !locked);
    };

    const handleFiles = (e) => {
        setMediaFiles(Array.from(e.target.files).map(file => {
            const type = mediaType(file.name.split(".").slice(-1)[0]);
            return ({ type, url: URL.createObjectURL(file) });
        }));
    };

    const handlePage = (e, value) => {
        setPage(value);
        window.scrollTo(0, window.innerHeight);
    };

    const handleNewPost = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const date = new Date();
        const description = formData.get("description");
        const category = "Personal";
        const files = formData.getAll("files");;
        const host = profile.email;
        const data = { date, description, category, host, fileURLs: [] };
        handleUpload(data, files[0]?.name ? files : null);
        // reset
        setContent("");
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
        <div className="profilePosts">
            {isLoading ? <Loader progress={progress} /> : null}
            <div className="profilePosts__about">
                <div className="profilePosts__profileAbout">
                    <div className="profilePosts__profileAboutMe">
                        <Avatar src={profile.profilePic} alt="" />
                        {profile.locked ? <ShieldRoundedIcon className="profilePosts__profileAboutSecureIcon" /> : null}
                        <div className="profilePosts__profileAboutMeInfo">
                            <p><b><PersonRoundedIcon /> Name:</b>{profile.name}</p>
                            <p><b><FingerprintRoundedIcon /> Roll:</b>{profile.roll}</p>
                            <a href={`mailto:${profile.email}`} className="profilePosts__profileAboutEmail"><b><AlternateEmailRoundedIcon /> Email:</b>{profile.email}</a>
                        </div>
                    </div>
                    <p className="profilePosts__profileAboutQuote"><em>{profile.quote}</em></p>
                </div>
                <div className="profilePosts____profileInfo">
                    <p><b><MenuBookRoundedIcon />Course:</b>{profile.course}</p>
                    <p><b><EngineeringRoundedIcon />Department:</b>{profile.department}</p>
                    <p><b><HomeWorkRoundedIcon />Hall:</b>{capitalize(profile.hall)} Hall of Residence</p>
                    <p><b><SchoolRoundedIcon />University:</b>IIT Kharagpur</p>
                    <div className="profilePosts____profileInfoImages">
                        <div>
                            <img src={KGP_JPG} alt="" />
                            <p>IIT Kharagpur<br />West Bengal, India</p>
                        </div>
                        <div>
                            <img src={`/images/halls/${profile.hall}.jpg`} alt="" />
                            <p>{capitalize(profile.hall)} Hall of Residence,<br />IIT Kharagpur</p>
                        </div>
                    </div>
                </div>
                <div className="profilePosts__securedProfile">
                    <div className="profilePosts__securedProfileInfo">
                        <SecurityRoundedIcon />
                        <p>Your profile is <span style={{ color: "red" }}>{locked ? "" : "not"}</span> locked. Others <span style={{ color: "red" }}>{locked ? "don't" : ""}</span> have access to your complete profile.</p>
                    </div>
                    <p className="profilePosts__securedProfileSafety"><InfoRoundedIcon />Removing the profile lock makes your profile accessible to anyone, from or outside the kgp community.</p>
                    <Button onClick={() => handleLock()}>{locked ? <LockOpenRoundedIcon /> : <LockOutlinedIcon />}{locked ? "Unlock your profile" : "Lock your profile"}</Button>
                </div>
                <div className="profilePosts__grievance">
                    <p>Here is the link to our grievance form which you shall fill to register any sort of complaint/grievance</p>
                    <Button onClick={() => window.open(QUICK_GRIEVANCE_URL)}><SentimentVerySatisfiedRoundedIcon />Grievance Form</Button>
                </div>
            </div>
            <div className="profilePosts__posts">
                <form className="profilePosts__newPost" onSubmit={e => handleNewPost(e)}>
                    <div>
                        <Avatar src={profile.profilePic} alt="" />
                        <TextareaAutosize placeholder="What's on your mind?" name="description" value={content} onChange={e => setContent(e.target.value)} ref={contentRef} />
                    </div>
                    <MediaSlider mediaFiles={mediaFiles} style={{ height: "250px", marginBottom: "10px" }} />
                    <div>
                        <IconButton onClick={() => filesInputRef.current.click()}><AttachFileRoundedIcon style={{ transform: "rotate(30deg)" }} /></IconButton>
                        <input type="file" name="files" style={{ display: "none" }} onChange={e => handleFiles(e)} multiple ref={filesInputRef} />
                        <IconButton className="profilePosts__sendBtn" style={{ transform: `scale(${content || mediaFiles.length ? "1" : "0"})` }} type="submit"><SendRoundedIcon style={{ transform: "rotate(-30deg)" }} /></IconButton>
                    </div>
                    <div className="profilePosts__postsList">
                        {posts.slice(4 * (page - 1), 4 * (page - 1) + 4).map((post, index) => <FlexCard key={index} data={post} profilePic={profile.profilePic} name={profile.name} style={{ marginBottom: "10px" }} />)}
                        <Pagination count={Math.ceil(posts.length / 4)} onChange={handlePage} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePosts;
