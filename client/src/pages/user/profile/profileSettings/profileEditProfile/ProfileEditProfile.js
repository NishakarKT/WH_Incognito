import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProfileEditProfile.css";
// firebase
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../../../../firebase";
// constants
import { USER_PROFILE_ROUTE } from "../../../../../constants/routes";
import { USER_PATCH_ENDPOINT } from "../../../../../constants/endpoints";
// contexts
import ProfileContext from "../../../../../contexts/profileContext";
// components
import MediaSlider from "../../../../../components/mediaSlider/MediaSlider";
import Loader from "../../../../../components/loader/Loader";
// utils
import { capitalize } from "../../../../../utils";
// mui
import { TextField, InputLabel, NativeSelect, FormControl, Button } from "@mui/material";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const ProfileEditProfile = () => {
    const { profile, posts } = useContext(ProfileContext);
    const [profilePicURL, setProfilePicURL] = useState("");
    const [progress, setProgress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const _id = formData.get("_id");
        const quote = formData.get("quote");
        const course = formData.get("course");
        const department = formData.get("department");
        const hall = formData.get("hall");
        const bio = formData.get("bio");
        const profilePic = formData.get("profilePic");
        const gender = formData.get("gender");
        const locked = formData.get("locked");
        const contact = {
            number: formData.get("number"),
            facebook: formData.get("facebook"),
            github: formData.get("github"),
            linkedin: formData.get("linkedin"),
            instagram: formData.get("instagram"),
            twitter: formData.get("twitter"),
            youtube: formData.get("youtube"),
            reddit: formData.get("reddit"),
            pinterest: formData.get("pinterest")
        };

        const data = { _id, course, hall, department, quote, bio, contact, gender, locked };

        handleUpload(data, profilePic.name ? profilePic : null);
    };

    const handleUpload = (data, file) => {
        if (file)
            getFileURLs(data, file);
        else {
            setIsLoading(true);
            axios.patch(USER_PATCH_ENDPOINT, data)
                .then(res => {
                    console.log(res.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err.response.data);
                    setIsLoading(false);
                });
        };
    };

    const getFileURLs = (data, file) => {
        const storageRef = ref(storage, "users/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_change",
            snapshot => {
                const taskProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress([{ file: file.name, taskProgress }]);
            },
            error => null,
            async () => {
                setProgress([]);
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                handleUpload({ ...data, profilePic: downloadURL }, null);
            });
    };

    const handleProfilePicURL = e => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setProfilePicURL(fileURL);
    };

    const handleProfilePic = e => {
        const fileInput = e.target.nextElementSibling;
        fileInput.click();
    };

    return (
        <form className="profileEditProfile" onSubmit={e => handleEdit(e)}>
            {isLoading ? <Loader progress={progress} /> : null}
            <input name="_id" defaultValue={profile._id} style={{ display: "none" }} />
            <h1>Edit Profile</h1>
            <p>Current Profile - <Link className="profileEditProfile__link" to={USER_PROFILE_ROUTE + "/" + profile.email}>View profile</Link></p>
            <MediaSlider mediaFiles={posts.map(post => post.fileURLs.length ? post.fileURLs[0] : null).filter(file => file)} style={{ height: "200px" }} isBgFixed isCarousel />
            <div className="profileEditProfile__profilePic">
                <img src={profilePicURL || profile.profilePic} alt="" onClick={() => window.open(profile.profilePic)} />
                <EditRoundedIcon onClick={e => handleProfilePic(e)} />
                <input type="file" style={{ display: "none" }} name="profilePic" onChange={e => handleProfilePicURL(e)} />
            </div>
            <div className="profileEditProfile__inputGroup profileEditProfile__inputGroupFirst">
                <TextField variant="standard" defaultValue={profile.name} label="Name" inputProps={{ name: "name" }} disabled />
                <TextField variant="standard" defaultValue={profile.roll} label="Roll Number" inputProps={{ name: "roll" }} disabled />
            </div>
            <div className="profileEditProfile__inputGroup profileEditProfile__inputGroupSecond">
                <FormControl>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Gender</InputLabel>
                    <NativeSelect defaultValue={profile.gender} inputProps={{ name: "gender" }}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </NativeSelect>
                </FormControl>
                <FormControl>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Course</InputLabel>
                    <NativeSelect defaultValue={profile.course} inputProps={{ name: "course" }}>
                        <option value="Bachelor of Technology">Bachelor of Technology</option>
                        <option value="Bachelor of Architecture">Bachelor of Architecture</option>
                        <option value="Dual Degree">Dual Degree</option>
                        <option value="MBA">MBA</option>
                        <option value="MHRM">MHRM</option>
                        <option value="LLB">LLB</option>
                        <option value="MMST">MMST</option>
                        <option value="MCP">MCP</option>
                        <option value="M.Sc">M.Sc</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="MS">MS</option>
                        <option value="Ph.D">Ph.D</option>
                    </NativeSelect>
                </FormControl>
            </div>
            <div className="profileEditProfile__inputGroup profileEditProfile__inputGroupThird">
                <FormControl>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Hall of Residence</InputLabel>
                    <NativeSelect defaultValue={capitalize(profile.hall)}
                        inputProps={{ name: "hall", id: "uncontrolled-native" }}>
                        <option value="Ashutosh">Ashutosh Mukherjee Hall of Residence</option>
                        <option value="Azad">Azad Hall of Residence</option>
                        <option value="B R Ambedkar">B R Ambedkar Hall of Residence</option>
                        <option value="Bidhan Chandra Roy">Bidhan Chandra Roy Hall of Residence</option>
                        <option value="Gokhale">Gokhale Hall of Residence</option>
                        <option value="Homi Bhabha">Homi Bhabha Hall of Residence</option>
                        <option value="Jagdish Chandra Bose">Jagdish Chandra Bose Hall of Residence</option>
                        <option value="Lal Bahadur Shastri">Lal Bahadur Shastri Hall of Residence</option>
                        <option value="Lala Lajpat Rai">Lala Lajpat Rai Hall of Residence</option>
                        <option value="Madan Mohan Malviya">Madan Mohan Malviya Hall of Residence</option>
                        <option value="Megnad Saha">Megnad Saha Hall of Residence</option>
                        <option value="Mother Teresa">Mother Teresa Hall of Residence</option>
                        <option value="Nehru">Nehru Hall of Residence</option>
                        <option value="Patel">Patel Hall of Residence</option>
                        <option value="Radha Krishnan">Radha Krishnan Hall of Residence</option>
                        <option value="Rajendra Prasad">Rajendra Prasad Hall of Residence</option>
                        <option value="Rani Laxmibai">Rani Laxmibai Hall of Residence</option>
                        <option value="Sarojini Naidu">Sarojini Naidu / Indira Gandhi Hall of Residence</option>
                        <option value="Sister Nivedita">Sister Nivedita Hall of Residence</option>
                        <option value="Vidyasagar">Vidyasagar Hall of Residence</option>
                        <option value="Zakir Hussain">Zakir Hussain Hall of Residence</option>
                    </NativeSelect>
                </FormControl>
                <FormControl>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Department</InputLabel>
                    <NativeSelect defaultValue={capitalize(profile.department)}
                        inputProps={{ name: "department", id: "uncontrolled-native" }}>
                        <option value="Aerospace Engineering">Aerospace Engineering</option>
                        <option value="Agricultural & Food Engineering">Agricultural & Food Engineering</option>
                        <option value="Architecture & Regional Planning">Architecture & Regional Planning</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Electronics & Electrical Communication Engineering">Electronics & Electrical Communication Engineering</option>
                        <option value="G S Sanyal School of Telecommunications">G S Sanyal School of Telecommunications</option>
                        <option value="Geology & Geophysics">Geology & Geophysics</option>
                        <option value="Humanities & Social Sciences">Humanities & Social Sciences</option>
                        <option value="Industrial & Systems Engineering">Industrial & Systems Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Materials Science">Materials Science</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Medical Science & Technology">Medical Science & Technology</option>
                        <option value="Metallurgical & Materials Engineering">Metallurgical & Materials Engineering</option>
                        <option value="Mining Engineering">Mining Engineering</option>
                        <option value="Ocean Engineering & Naval Architecture">Ocean Engineering & Naval Architecture</option>
                    </NativeSelect>
                </FormControl>
            </div>
            <TextField variant="standard" defaultValue={profile.email} label="Email" inputProps={{ name: "email" }} disabled />
            <TextField variant="standard" defaultValue={profile.quote} label="Quote" inputProps={{ name: "quote" }} />
            <label htmlFor="bio">About (Bio)</label>
            <textarea id="bio" placeholder="Bio" defaultValue={profile.bio} name="bio" />
            <label htmlFor="bio">Contacts</label>
            <div className="profileEditProfile__contactLinks">
                {Object.keys(profile.contact).map(key =>
                    <div key={key} className="profileEditProfile__contactLink">
                        <TextField label={key} variant="standard" inputProps={{ name: key }} defaultValue={profile.contact[key]} />
                    </div>)}
            </div>
            <Button type="submit"><SaveAsRoundedIcon />Save</Button>
        </form>
    );
};

export default ProfileEditProfile;
