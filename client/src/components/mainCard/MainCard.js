import React, { useContext } from "react";
import "./MainCard.css";
// components
import MediaSlider from "../mediaSlider/MediaSlider";
// contexts
import UserContext from "../../contexts/userContext";
// utils
import { truncateString } from "../../utils";

const MainCard = ({ data, style }) => {
    const { setPost } = useContext(UserContext);

    return (
        data ? <div className="mainCard" style={style}>
            <MediaSlider mediaFiles={data.fileURLs} isBgFixed isCarousel style={{ position: "absolute", top: "0", height: "100%" }
            } />
            < div className="mainCard__content" >
                {data.date ? <p className="mainCard__date">{data.date.toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p> : null}
                {data.title ? <p className="mainCard__title">{data.title}</p> : null}
                {data.category ? <p className="mainCard__category">{data.category}</p> : null}
                {data.description ? <p className="mainCard__description">{truncateString(data.description, 200)} <span className="mainCard__link" onClick={() => setPost(data)}>Read more</span></p> : null}
                {data.host ? <p className="mainCard__host">~ {data.host}</p> : null}
            </div>
        </div > : <></>
    );
};

export default MainCard;
