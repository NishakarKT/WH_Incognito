import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import axios from 'axios';
import "./AdminPortal.css";
// constants
import { ADMIN_TSG_ROUTE, USER_HOME_ROUTE } from "../../../constants/routes";
import { TSG_LOGO_WHITE_PNG } from "../../../constants/images";
import { SPRING_FEST_2020_MP4 } from "../../../constants/videos";
import { CONTACT_FB_URL, CONTACT_GH_URL, CONTACT_TW_URL, CONTACT_YT_URL } from "../../../constants/urls";
import { ADMIN_POST_ENDPOINT, AUTH_ADMIN_ENDPOINT, AUTH_OTP_GENERATE_ENDPOINT, AUTH_OTP_VERIFY_ENDPOINT } from "../../../constants/endpoints";
// contexts
import UserContext from "../../../contexts/userContext";
// components
import Loader from "../../../components/loader/Loader";
// mui
import { IconButton, Button, TextField, Checkbox } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
// intervals
let dateInterval;

const AdminPortal = () => {
    const history = useHistory();
    const { admin, setAdmin } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [otpErr, setOtpErr] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [remMe, setRemMe] = useState(true);
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (admin.name) history.push(ADMIN_TSG_ROUTE);
        clearInterval(dateInterval);
        dateInterval = setInterval(() => setDate(new Date()), 1000);
    }, [admin, history]);


    const generateOtp = email => {
        if (validator.isEmail(email) && (email.endsWith("@kgpian.iitkgp.ac.in") || email.endsWith("@iitkgp.ac.in"))) {
            setIsOtpSent(true);
            setUsernameErr("");

            try {
                axios.post(AUTH_OTP_GENERATE_ENDPOINT, { email })
                    .then(res => {
                        setOtpErr("");
                        setIsOtpSent(true);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        setUsernameErr(err.response.data.msg);
                        setIsOtpSent(false);
                        setIsLoading(false);
                    });
            } catch (err) { setIsLoading(false); };
        }
        else {
            setIsOtpSent(false);
            setIsLoading(false);
            setUsernameErr("An invalid institute's email address has been registered in the admins' database!");
        }
    };

    const handleSignIn = e => {
        e.preventDefault();
        setUsernameErr("");
        setPasswordErr("");
        setOtpErr("");

        if (!username) setUsernameErr("Please, enter your username!")
        else if (!password) setPasswordErr("Please, enter you password!")
        else {
            setIsLoading(true);
            try {
                axios.post(AUTH_ADMIN_ENDPOINT, { username, password })
                    .then(res => {
                        if (res.data.email) {
                            setEmail(res.data.email);
                            generateOtp(res.data.email);
                            setIsLoading(false);
                        }
                        else {
                            if (remMe) {
                                const currData = JSON.parse(localStorage.getItem("hackathon"));
                                const newData = { ...currData, adminToken: res.data.token };
                                localStorage.setItem("hackathon", JSON.stringify(newData));
                            }
                            setAdmin(res.data.admin);
                            setIsLoading(false);
                            history.push(ADMIN_TSG_ROUTE);
                        }
                    })
                    .catch(err => {
                        const errMsg = err.response.data.msg;
                        if (errMsg === "The username doesn't match with any of the registered admins!") setUsernameErr(errMsg);
                        else if (errMsg === "Incorrect password! Please try again.") setPasswordErr(errMsg);
                        setIsLoading(false);
                    });
            } catch (err) { setIsLoading(false); };
        }
    };

    const handleSignUp = e => {
        e.preventDefault();
        if (otp) {
            setIsLoading(true);
            axios.post(AUTH_OTP_VERIFY_ENDPOINT, { email, otp })
                .then(res => {
                    setOtpErr("");
                    setIsOtpSent(false);
                    setIsLoading(false);

                    if (remMe) {
                        const currData = JSON.parse(localStorage.getItem("hackathon"));
                        const newData = { ...currData, adminToken: res.data.token };
                        localStorage.setItem("hackathon", JSON.stringify(newData));
                    }

                    try {
                        setIsLoading(true);
                        axios.post(ADMIN_POST_ENDPOINT, { username, password })
                            .then(res => {
                                setIsOtpSent(false);
                                setIsLoading(false);
                                setAdmin(res.data);
                                history.push(ADMIN_TSG_ROUTE);
                            })
                            .catch(err => {
                                setIsOtpSent(false);
                                setIsLoading(false);
                                setUsernameErr(err.response.data.msg);
                            });
                    } catch (err) { setIsLoading(false); };
                })
                .catch(err => {
                    setIsOtpSent(true);
                    setIsLoading(false);
                    setOtpErr(err.response.data.msg);
                });
        }
        else
            setOtpErr("Please, enter the OTP (One Time Password)!");
    }

    return (
        <div className="adminPortal">
            {isLoading ? <Loader /> : null}
            <div className="adminPortal__left">
                <p className="adminPortal__date">{date.toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p>
                <form className="adminPortal__form" onSubmit={e => isOtpSent ? handleSignUp(e) : handleSignIn(e)}>
                    <div className="adminPortal__formInfo">
                        {isOtpSent ? <h1><DialpadRoundedIcon />Verify OTP</h1> : <h1><ExitToAppRoundedIcon />Admins' Portal</h1>}
                        {isOtpSent ? <p>Enter the OTP sent to <b style={{ wordBreak: "break-all", color: "#0c6cf9" }}>{email}</b> to proceed with the admin's authentication.</p> : <p>Enter your username and password to proceed with the admin's authentication.</p>}
                    </div>
                    <div className="adminPortal__formInput">
                        <TextField variant="standard" label="Username" value={username} onChange={e => setUsername(e.target.value)} error={Boolean(usernameErr)} helperText={usernameErr} disabled={isOtpSent} fullWidth />
                        <TextField variant="standard" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} error={Boolean(passwordErr)} helperText={passwordErr} disabled={isOtpSent} fullWidth />
                        {isOtpSent ? <TextField variant="standard" label="Enter OTP (One Time Password)" value={otp} onChange={e => setOtp(e.target.value)} error={Boolean(otpErr)} helperText={otpErr} fullWidth /> : null}
                    </div>
                    <div className="adminPortal__formOptions">
                        <div className="adminPortal__remMe">
                            <Checkbox checked={remMe} onChange={e => setRemMe(e.target.checked)} />
                            Remember Me
                        </div>
                    </div>
                    {isOtpSent ? <Button type="submit" fullWidth><DialpadRoundedIcon />Verify OTP</Button> : <Button type="submit" fullWidth><ExitToAppRoundedIcon />Sign In</Button>}
                    {isOtpSent ? <p className="adminPortal__loginInfo">Note that the OTP is valid only for <b style={{ color: "#0c6cfa" }}>1 minute</b>. Re-Login for a new one.</p> : <p className="adminPortal__loginInfo">You need to be a registered <b style={{ color: "#0c6cfa" }}>admin</b> for a successful sign in. Contact us if you are an <b style={{ color: "#0c6cfa" }}>unregistered admin</b>.</p>}
                    <div className="adminPortal__social">
                        <FacebookRoundedIcon onClick={() => window.open(CONTACT_FB_URL, "_blank")} />
                        <TwitterIcon onClick={() => window.open(CONTACT_TW_URL, "_blank")} />
                        <YouTubeIcon onClick={() => window.open(CONTACT_YT_URL, "_blank")} />
                        <GitHubIcon onClick={() => window.open(CONTACT_GH_URL, "_blank")} />
                    </div>
                </form>
            </div>
            <div className="adminPortal__right">
                <div className="adminPortal__tsg" onClick={() => history.push(USER_HOME_ROUTE)}>
                    <img className="adminPortal__logo" src={TSG_LOGO_WHITE_PNG} alt="" />
                    <div className="adminPortal__title">
                        <p>Technology Students' Gymkhana</p>
                        <p>Indian Institute Of Technology, Kharagpur</p>
                    </div>
                </div>
                <video className="adminPortal__bg" src={SPRING_FEST_2020_MP4 + "#t=10"} alt="" autoPlay muted loop />
                <IconButton onClick={() => window.open("https://www.youtube.com/watch?v=9yOinUUiyq0#t=10")}><PlayArrowRoundedIcon /></IconButton>
                <div className="adminPortal__welcome">
                    <h1>Welcome back, admin!</h1>
                    <p>Get started with a simple admin's authentication.</p>
                    <p>Technology Students’ Gymkhana is the hub of the numerous extra-curricular and co-curricular activities in IIT Kharagpur ranging from sports to socio-cultural. The Gymkhana is managed by the students, for the students, under the guidance and active participation of the faculty and staff members.</p>
                    <div className="adminPortal__buttons">
                        <Button onClick={() => history.push(USER_HOME_ROUTE)}><HomeRoundedIcon />Home</Button>
                        <Button onClick={() => history.push(ADMIN_TSG_ROUTE)}><SupervisorAccountRoundedIcon />Admin's Home</Button>
                    </div>
                </div>
                <p className="adminPortal__copyright">Technology Students' Gymkhana, IIT Kharagpur © All Rights Reserved</p>
            </div>
        </div>
    );
};

export default AdminPortal;
