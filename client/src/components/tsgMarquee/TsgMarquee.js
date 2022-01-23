import React from "react";
import "./TsgMarquee.css";
// constants
import { TSG_LOGO_WHITE_PNG } from "../../constants/images";
// mui
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const TsgMarquee = ({ dataList, style }) => {
    return (
        dataList.length ?
            <marquee className="tsgMarquee" style={style} >
                <div className="tsgMarquee__text">
                    {dataList.map((data, index) => (
                        <React.Fragment key={index}>
                            <img className="tsgMarquee__separator" src={TSG_LOGO_WHITE_PNG} alt="" />
                            {data.date ? <p className="tsgMarquee__dataItem" style={{ color: "lime" }}>{new Date(data.date).toLocaleDateString()}</p> : null}
                            {data.title ?
                                <React.Fragment>
                                    <TimelineRoundedIcon className="tsgMarquee__separator" style={{ color: "yellow" }} />
                                    <p className="tsgMarquee__dataItem" style={{ color: "yellow" }}>{data.title}</p>
                                </React.Fragment>
                                : null}
                            {data.category ?
                                <React.Fragment>
                                    <LanguageRoundedIcon className="tsgMarquee__separator" style={{ color: "cyan" }} />
                                    <p className="tsgMarquee__dataItem" style={{ color: "cyan" }}>{data.category}</p>
                                </React.Fragment>
                                : null}
                            {data.description ?
                                <React.Fragment>
                                    <DescriptionRoundedIcon className="tsgMarquee__separator" style={{ color: "white" }} />
                                    <p className="tsgMarquee__dataItem" style={{ color: "white" }}>{data.description}</p>
                                </React.Fragment>
                                : null}
                            <img className="tsgMarquee__separator" style={{ marginRight: "100px" }} src={TSG_LOGO_WHITE_PNG} alt="" />
                        </React.Fragment>
                    ))}
                </div>
            </marquee> : <></>
    );
};

export default TsgMarquee;
