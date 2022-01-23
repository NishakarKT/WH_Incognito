import React from "react";
import MediaSlider from "../mediaSlider/MediaSlider";
import "./ContactCard.css";
// mui
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

const ContactCard = ({ contact, style }) => {
    return (
        <div className="contactCard" style={style}>
            <MediaSlider mediaFiles={contact.fileURLs} isCarousel style={{ height: "300px" }} />
            <div className="contactCard__shapeDivider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="contactCard__conent">
                <p className="contactCard__name">{contact.name}</p>
                <p className="contactCard__designation">{contact.designation}</p>
                {contact.contact.number ? <p><LocalPhoneRoundedIcon />{contact.contact.number}</p> : null}
                {contact.contact.email ? <p onClick={() => window.open("mailto:" + contact.contact.email)} className="contactCard__link"><AlternateEmailRoundedIcon />{contact.contact.email}</p> : null}
            </div>
        </div>
    );
};

export default ContactCard;
