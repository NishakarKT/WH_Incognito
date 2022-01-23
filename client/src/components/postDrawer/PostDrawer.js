import React from "react";
import "./PostDrawer.css";
// components
import MediaSlider from "../mediaSlider/MediaSlider";
// mui
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const PostDrawer = ({ post, setPost, style }) => {
    return (
        post ? <div className="postDrawer" style={style}>
            {post.fileURLs ? <MediaSlider mediaFiles={post.fileURLs} /> : null}
            <div className="postDrawer__content">
                <CancelRoundedIcon className="postDrawer__closeBtn" onClick={() => setPost(null)} />
                {post.date ? <p className="postDrawer__date">{post.date.toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p> : null}
                {post.title ? <p className="postDrawer__title">{post.title}</p> : null}
                {post.category ? <p className="postDrawer__category">{post.category}</p> : null}
                {post.description ? <p className="postDrawer__description">{post.description}</p> : null}
                {post.host ? <p className="postDrawer__host">{post.host}</p> : null}
            </div>
        </div> : <></>
    );
};

export default PostDrawer;
