import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import "./Portal.css";
// constants
import { ADMIN_TSG_ROUTE, USER_HOME_ROUTE } from "../../../constants/routes";
import { TSG_LOGO_WHITE_PNG } from "../../../constants/images";
import { SPRING_FEST_2020_MP4 } from "../../../constants/videos";
import { CONTACT_FB_URL, CONTACT_TW_URL, CONTACT_YT_URL, CONTACT_GH_URL } from "../../../constants/urls";
import { AUTH_OTP_GENERATE_ENDPOINT, AUTH_OTP_VERIFY_ENDPOINT, USER_GET_ENDPOINT, USER_POST_ENDPOINT } from "../../../constants/endpoints";
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
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
// intervals
let dateInterval;

const Portal = () => {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [otpErr, setOtpErr] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [remMe, setRemMe] = useState(true);
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (user.name) history.push(USER_HOME_ROUTE);
        clearInterval(dateInterval);
        dateInterval = setInterval(() => setDate(new Date()), 1000);
    }, [user, history])

    const generateOtp = e => {
        e.preventDefault();

        // if (validator.isEmail(email) && (email.endsWith("@kgpian.iitkgp.ac.in") || email.endsWith("@iitkgp.ac.in"))) {
        if (validator.isEmail(email)) {
            setEmailErr("");
            setIsLoading(true);

            try {
                axios.post(AUTH_OTP_GENERATE_ENDPOINT, { email })
                    .then(res => {
                        setIsOtpSent(true);
                        setEmailErr("");
                        setIsLoading(false);
                    })
                    .catch(err => {
                        setIsOtpSent(false);
                        setEmailErr(err.response.data.msg);
                        setIsLoading(false);
                    });
            } catch (err) { setIsLoading(false); };
        }
        else {
            setEmailErr("Please, enter a valid institute's email address!");
        }
    };

    const verifyOtp = e => {
        e.preventDefault();

        if (otp) {
            setOtp("");
            setIsLoading(true);

            try {
                axios.post(AUTH_OTP_VERIFY_ENDPOINT, { email, otp })
                    .then(res => {
                        setIsOtpSent(false);
                        setOtpErr("");

                        if (remMe) {
                            const currData = JSON.parse(localStorage.getItem("hackathon"));
                            const newData = { ...currData, token: res.data.token };
                            localStorage.setItem("hackathon", JSON.stringify(newData));
                        }

                        try {
                            axios.get(USER_GET_ENDPOINT + "/" + email)
                                .then(res => {
                                    setUser(res.data);
                                    setIsLoading(false);
                                    history.push(USER_HOME_ROUTE);
                                })
                                .catch(err => {
                                    try {
                                        axios.post(USER_POST_ENDPOINT, { email })
                                            .then(res => {
                                                setUser(res.data);
                                                setIsLoading(false);
                                                history.push(USER_HOME_ROUTE);
                                            })
                                            .catch(err => {
                                                setEmailErr(err.response.data.msg);
                                                setIsLoading(false);
                                            })
                                    } catch (err) { setIsLoading(false); };
                                });
                        } catch (err) { setIsLoading(false); };
                    })
                    .catch(err => {
                        setIsOtpSent(true);
                        setOtpErr(err.response.data.msg);
                        setIsLoading(false);
                    });
            } catch (err) { setIsLoading(false); };
        }
        else {
            setOtpErr("Please, enter the OTP!")
        }
    };

    return (
        <div className="portal">
            {isLoading ? <Loader /> : null}
            <div className="portal__left">
                <div className="portal__tsg" onClick={() => history.push(USER_HOME_ROUTE)}>
                    <img className="portal__logo" src={TSG_LOGO_WHITE_PNG} alt="" />
                    <div className="portal__title">
                        <p>Technology Students' Gymkhana</p>
                        <p>Indian Institute Of Technology, Kharagpur</p>
                    </div>
                </div>
                <video className="portal__bg" src={SPRING_FEST_2020_MP4 + "#t=10"} alt="" autoPlay muted loop />
                <IconButton onClick={() => window.open("https://www.youtube.com/watch?v=9yOinUUiyq0#t=10")}><PlayArrowRoundedIcon /></IconButton>
                <div className="portal__welcome">
                    <h1>Welcome back, student!</h1>
                    <p>Get started with a simple user's authentication.</p>
                    <p>Technology Students’ Gymkhana is the hub of the numerous extra-curricular and co-curricular activities in IIT Kharagpur ranging from sports to socio-cultural. The Gymkhana is managed by the students, for the students, under the guidance and active participation of the faculty and staff members.</p>
                    <div className="portal__buttons">
                        <Button onClick={() => history.push(USER_HOME_ROUTE)}><HomeRoundedIcon />Home</Button>
                        <Button onClick={() => history.push(ADMIN_TSG_ROUTE)}><SupervisorAccountRoundedIcon />Admin's Home</Button>
                    </div>
                </div>
                <p className="portal__copyright">Technology Students' Gymkhana, IIT Kharagpur © All Rights Reserved</p>
            </div>
            <div className="portal__right">
                <p className="portal__date">{date.toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p>
                <form className="portal__form" onSubmit={e => isOtpSent ? verifyOtp(e) : generateOtp(e)}>
                    <div className="portal__formInfo">
                        {isOtpSent ? <h1><DialpadRoundedIcon />Verify OTP</h1> : <h1><KeyRoundedIcon />Students' Portal</h1>}
                        {isOtpSent ? <p>Enter the OTP sent to <b style={{ wordBreak: "break-all", color: "#0c6cf9" }}>{email}</b> to proceed with the user's authentication.</p> : <p>Enter your institute's email address to proceed with the user's authentication.</p>}
                    </div>
                    <div className="portal__formInput">
                        {isOtpSent ? <TextField variant="standard" type="number" label="Enter OTP (One Time Password)" value={otp} onChange={e => setOtp(e.target.value)} error={Boolean(otpErr)} helperText={otpErr} fullWidth /> : <TextField variant="standard" label="Institute's Email Address" value={email} onChange={e => setEmail(e.target.value)} error={Boolean(emailErr)} helperText={emailErr} fullWidth />}
                    </div>
                    <div className="portal__formOptions">
                        <div className="portal__remMe">
                            <Checkbox checked={remMe} onChange={e => setRemMe(e.target.checked)} />
                            Remember Me
                        </div>
                    </div>
                    {isOtpSent ? <Button type="submit" fullWidth><DialpadRoundedIcon />Verify OTP</Button> : <Button type="submit" fullWidth><KeyRoundedIcon />Generate OTP</Button>}
                    {isOtpSent ? <p className="portal__loginInfo">Note that the OTP is valid only for <b style={{ color: "#0c6cfa" }}>1 minute</b>. Re-Login for a new one.</p> : <p className="portal__loginInfo">No registration is required for a <b style={{ color: "#0c6cfa" }}>Kgpian!</b> Simply verify your insititute's email address and you shall be signed in.</p>}
                    <div className="portal__social">
                        <FacebookRoundedIcon onClick={() => window.open(CONTACT_FB_URL, "_blank")} />
                        <TwitterIcon onClick={() => window.open(CONTACT_TW_URL, "_blank")} />
                        <YouTubeIcon onClick={() => window.open(CONTACT_YT_URL, "_blank")} />
                        <GitHubIcon onClick={() => window.open(CONTACT_GH_URL, "_blank")} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Portal;
