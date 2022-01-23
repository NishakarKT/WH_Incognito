import React, { useEffect, useRef } from "react";
import "./MediaSlider.css";
// utils
import { mediaType } from "../../utils";
// mui
import { Button } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// test data
const defaultFiles = [
    { type: "image", url: "https://firebasestorage.googleapis.com/v0/b/tsg-hackathon.appspot.com/o/event_201221_1.jpg?alt=media&token=22af03eb-e4f3-4fd0-abf5-0aa58e27e75e" },
    { type: "image", url: "https://firebasestorage.googleapis.com/v0/b/tsg-hackathon.appspot.com/o/event_201221_2.jpg?alt=media&token=01dd4de3-4fc4-4b0a-a8c0-d876415c27ce" },
    { type: "image", url: "https://firebasestorage.googleapis.com/v0/b/tsg-hackathon.appspot.com/o/event_201221_3.jpg?alt=media&token=22af03eb-e4f3-4fd0-abf5-0aa58e27e75e" }
];

const MediaSlider = ({ mediaFiles, isBgFixed, isCarousel, canDefault, style }) => {
    let cardsInterval;
    const containerRef = useRef(null);
    const myMediaFiles = mediaFiles.map(mediaFile => mediaFile.type ? mediaFile : ({ type: mediaType(mediaFile.split("tsg-hackathon.appspot.com/o/")[1].split("?")[0].split(".").slice(-1)[0]), url: mediaFile }));

    useEffect(() => {
        clearInterval(cardsInterval);
        if (isCarousel)
            cardsInterval = setInterval(nextFile, 7000);
    }, [isCarousel]);

    const prevFile = () => {
        const current = containerRef.current?.querySelector(".mediaSlider__current");
        if (current) {
            current.classList.remove("mediaSlider__current");
            if (current.previousElementSibling.classList.contains("mediaSlider__card"))
                current.previousElementSibling.classList.add("mediaSlider__current");
            else
                containerRef.current.lastElementChild.classList.add("mediaSlider__current");
        };
    };

    const nextFile = () => {
        const current = containerRef.current?.querySelector(".mediaSlider__current");
        if (current) {
            current.classList.remove("mediaSlider__current");
            if (current.nextElementSibling)
                current.nextElementSibling.classList.add("mediaSlider__current");
            else
                containerRef.current.querySelector(".mediaSlider__card").classList.add("mediaSlider__current");
        };
    };

    return ((myMediaFiles.length || canDefault) ?
        <div className="mediaSlider" ref={containerRef} style={style}>
            {!isCarousel ? <Button onClick={() => prevFile()}><ArrowBackIosRoundedIcon /></Button> : null}
            {!isCarousel ? <Button onClick={() => nextFile()}><ArrowForwardIosRoundedIcon /></Button> : null}
            {(!myMediaFiles.length ? defaultFiles : myMediaFiles).map((mediaFile, index) => {
                return (
                    <div key={index} className={`mediaSlider__card ${index === 0 ? "mediaSlider__current" : ""}`} style={mediaFile.type === "image" ? { background: `url(${mediaFile.url}) ${isBgFixed ? "fixed" : ""} no-repeat center center/cover` } : {}}>
                        {mediaFile.type === "video" ? <video className="mediaSlider__video" src={mediaFile.url} muted controls autoPlay loop /> : null}
                    </div>
                )
            })}
        </div> : null
    );
};

export default MediaSlider;
