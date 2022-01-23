import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
// constants
import { USER_ARCHIVES_ROUTE, USER_NEWS_ROUTE, USER_QUICK_INFO_ROUTE, USER_SOCIETIES_ROUTE, USER_STUDENTS_ROUTE, USER_TSG_ROUTE, USER_HOME_ROUTE } from "../../constants/routes";
import { CONTACT_FB_URL, CONTACT_TW_URL, CONTACT_YT_URL, CONTACT_GH_URL, QUICK_KGP_URL, QUICK_ERP_URL, QUICK_ZIMBRA_URL, QUICK_GRIEVANCE_URL, QUICK_YOUR_DOST_URL, QUICK_HMC_URL, QUICK_YELLOW_URL, QUICK_CC_URL } from "../../constants/urls";
import { DOTS_BG_WHITE_PNG } from "../../constants/images";
// mui
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import RowingRoundedIcon from "@mui/icons-material/RowingRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__bg" style={{ backgroundImage: `url("${DOTS_BG_WHITE_PNG}")` }}></div>
            <div className="footer__section">
                <div className="footer__group">
                    <div className="footer__subSection" style={{ flex: 2 }}>
                        <h1>About Us</h1>
                        <p>Technology Students’ Gymkhana is the hub of the numerous extra-curricular and co-curricular activities in IIT Kharagpur ranging from sports to socio-cultural. The Gymkhana is managed by the students, for the students, under the guidance and active participation of the faculty and staff members.<br /><br />"Yogah Karmasu Kausalam"<br /><br />The moto of Technology Students' Gymkhana is YOGAH KARMASU KAUSALAM which in English means "Perfection in action is Yoga". Our goal is to bring overall development in IITians through cultivating and nurturing their extra-curricular talents.</p>
                        <h1>Contact Us</h1>
                        <p className="footer__contact"><b>Address:</b> Indian Institute of Technology Kharagpur</p>
                        <p className="footer__contact"><b>Phone:</b> +91-3222-255221</p>
                        <p className="footer__contact"><b>Fax:</b> +91-3222-255303</p>
                    </div>
                    <div className="footer__subSection">
                        <h1>Tags</h1>
                        <div className="footer__tags">
                            <div className="footer__tag">Events</div>
                            <div className="footer__tag">Society</div>
                        </div>
                        <h1>Quick Links</h1>
                        <div className="footer__links">
                            <NavLink exact className="footer__link" activeClassName="footer__activeLink" to={USER_HOME_ROUTE}><HomeRoundedIcon />Home</NavLink>
                            <NavLink className="footer__link" activeClassName="footer__activeLink" to={USER_TSG_ROUTE}><RowingRoundedIcon />TSG Events</NavLink>
                            <NavLink className="footer__link" activeClassName="footer__activeLink" to={USER_SOCIETIES_ROUTE}><GroupsRoundedIcon />Societies' Point</NavLink>
                            <NavLink className="footer__link" activeClassName="footer__activeLink" to={USER_STUDENTS_ROUTE}><AssignmentIndRoundedIcon />Students' Point</NavLink>
                            <NavLink className="footer__link" activeClassName="footer__activeLink" to={USER_NEWS_ROUTE}><NewspaperRoundedIcon />News Bulletin</NavLink>
                            <NavLink className="footer__link" activeClassName="footer__activeLink" to={USER_QUICK_INFO_ROUTE}><HelpRoundedIcon />Quick Info</NavLink>
                            <NavLink className="footer__link" activeClassName="footer__activeLink" to={USER_ARCHIVES_ROUTE}><ArchiveRoundedIcon />Archives</NavLink>
                        </div>
                    </div>
                </div>
                <div className="footer__group">
                    <div className="footer__subSection" style={{ flex: 2 }}>
                        <h1>Latest News</h1>
                        <div className="footer__news">
                            <div className="footer__newsPost">
                                <img src={"https://images.unsplash.com/photo-1633113089631-6456cccaadad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"} alt="" />
                                <div className="footer__newsContent">
                                    <h1 className="footer__newsTitle">News Title</h1>
                                    <p className="footer__newsDate">21st Jan 2021</p>
                                    <p className="footer__newsDetails">content content content content content content content...<span className="footer__readMore" to={"/"}>Read more</span></p>
                                </div>
                            </div>
                            <div className="footer__newsPost">
                                <img src={"https://images.unsplash.com/photo-1633113089631-6456cccaadad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"} alt="" />
                                <div className="footer__newsContent">
                                    <h1 className="footer__newsTitle">News Title</h1>
                                    <p className="footer__newsDate">21st Jan 2021</p>
                                    <p className="footer__newsDetails">content content content content content content content...<span className="footer__readMore" to={"/"}>Read more</span></p>
                                </div>
                            </div>
                            <div className="footer__newsPost">
                                <img src={"https://images.unsplash.com/photo-1633113089631-6456cccaadad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"} alt="" />
                                <div className="footer__newsContent">
                                    <h1 className="footer__newsTitle">News Title</h1>
                                    <p className="footer__newsDate">21st Jan 2021</p>
                                    <p className="footer__newsDetails">content content content content content content content...<span className="footer__readMore">Read more</span></p>
                                </div>
                            </div>
                            <div className="footer__newsPost">
                                <img src={"https://images.unsplash.com/photo-1633113089631-6456cccaadad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"} alt="" />
                                <div className="footer__newsContent">
                                    <h1 className="footer__newsTitle">News Title</h1>
                                    <p className="footer__newsDate">21st Jan 2021</p>
                                    <p className="footer__newsDetails">content content content content content content content...<span className="footer__readMore">Read more</span></p>
                                </div>
                            </div>
                            <div className="footer__newsPost">
                                <img src={"https://images.unsplash.com/photo-1633113089631-6456cccaadad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"} alt="" />
                                <div className="footer__newsContent">
                                    <h1 className="footer__newsTitle">News Title</h1>
                                    <p className="footer__newsDate">21st Jan 2021</p>
                                    <p className="footer__newsDetails">content content content content content content content...<span className="footer__readMore" to={"/"}>Read more</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer__subSection">
                        <h1>Important Links</h1>
                        <div className="footer__links">
                            <a className="footer__link" href={QUICK_ERP_URL} target="_blank" rel="noreferrer"><PersonIcon />ERP</a>
                            <a className="footer__link" href={QUICK_ZIMBRA_URL} target="_blank" rel="noreferrer"><AlternateEmailIcon />Zimbra webmail</a>
                            <a className="footer__link" href={QUICK_GRIEVANCE_URL} target="_blank" rel="noreferrer"><SentimentDissatisfiedRoundedIcon />Grievance Form</a>
                            <a className="footer__link" href={QUICK_YOUR_DOST_URL} target="_blank" rel="noreferrer"><PeopleAltRoundedIcon />Your Dost</a>
                            <a className="footer__link" href={QUICK_HMC_URL} target="_blank" rel="noreferrer"><HomeRoundedIcon />Hall Management Centre</a>
                            <a className="footer__link" href={QUICK_KGP_URL} target="_blank" rel="noreferrer"><HomeWorkRoundedIcon />IITKGP Website</a>
                            <a className="footer__link" href={QUICK_YELLOW_URL} target="_blank" rel="noreferrer"><LocalPhoneRoundedIcon />Yellow Pages</a>
                            <a className="footer__link" href={QUICK_CC_URL} target="_blank" rel="noreferrer"><FavoriteRoundedIcon />Counselling Centre</a>
                        </div>
                        <h1>Social Links</h1>
                        <div className="footer__social">
                            <FacebookRoundedIcon onClick={() => window.open(CONTACT_FB_URL, "_blank")} />
                            <TwitterIcon onClick={() => window.open(CONTACT_TW_URL, "_blank")} />
                            <YouTubeIcon onClick={() => window.open(CONTACT_YT_URL, "_blank")} />
                            <GitHubIcon onClick={() => window.open(CONTACT_GH_URL, "_blank")} />
                        </div>
                    </div>
                </div>
            </div>
            <p className="footer__end">Technology Students' Gymkhana, IIT Kharagpur © All Rights Reserved</p>
        </div>
    );
};

export default Footer;
