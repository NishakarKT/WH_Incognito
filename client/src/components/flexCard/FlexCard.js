import React, { useState, useEffect } from "react";
import "./FlexCard.css";
// components
import MediaSlider from "../mediaSlider/MediaSlider";
// utils
import PostHead from "../postHead/PostHead";
// utils
import { getProfile } from "../../utils";
// mui icons
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const FlexCard = ({ data, style }) => {
    const [host, setHost] = useState({});

    useEffect(() => {
        try {
            getProfile(data.host)
                .then(res => setHost(res))
                .catch(err => { })
        } catch (err) { }
    }, [data]);

    return (
        data ? <div className="flexCard" style={style}>
            <PostHead profilePic={host.profilePic} name={host.name || data.host} date={data.date} />
            <MediaSlider mediaFiles={data.fileURLs} style={{ height: "250px" }} />
            <div className="flexCard__content">
                {data.title ? <p className="flexCard__title">{data.title}</p> : null}
                {data.category ? <p className="flexCard__category"><PushPinRoundedIcon />{data.category}</p> : null}
                {data.description ? <p className="flexCard__description">{data.description}</p> : null}
                {data.host ? <p className="flexCard__host"><GroupsRoundedIcon /> ~ {data.host}</p> : null}
            </div>
        </div> : null
    );
};

export default FlexCard;
