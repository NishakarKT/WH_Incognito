import React, { useContext } from "react";
import "./SideCard.css";
// components
import MediaSlider from "../mediaSlider/MediaSlider";
// contexts
import UserContext from "../../contexts/userContext";
// utils
import { truncateString } from "../../utils";

const SideCard = ({ data, style }) => {
    const { setPost } = useContext(UserContext);

    return (
        data ? <div className="sideCard" style={style}>
            <MediaSlider mediaFiles={data.fileURLs} isCarousel style={{ width: "250px", height: "200px" }} />
            <div className="sideCard__content">
                {data.date ? <p className="sideCard__date">{new Date(data.date).toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p> : null}
                {data.title ? <p className="sideCard__title">{data.title}</p> : null}
                {data.category ? <p className="sideCard__category">{data.category}</p> : null}
                {data.description ? <p className="sideCard__description">{truncateString(data.description, 100)} <span className="sideCard__link" onClick={() => setPost(data)}>Read more</span></p> : null}
                {data.host ? <p className="sideCard__host">~ {data.host}</p> : null}
            </div>
        </div> : <></>
    );
};

export default SideCard;
