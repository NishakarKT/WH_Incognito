import React from "react";
import "./CardsList.css";
// components
import MainCard from "../mainCard/MainCard";
import SideCard from "../sideCard/SideCard";

const CardsList = ({ list, style }) => {
    return (
        <div className="cardsList">
            {list.map((event, index) => (
                index % 3 === 0 ?
                    <div key={index} className="cardsList__group" style={{ flexDirection: index % 6 === 0 ? "row" : "row-reverse" }}>
                        <MainCard data={event} style={{ flex: "1", height: "400px", margin: index % 6 === 0 ? "0 10px 0 0" : "0 0 0 10px" }} />
                        <div className="cardsList__subGroup" style={{ width: "100%" }}>
                            {list[index + 1] ? <SideCard data={list[index + 1]} style={{ height: "195px", margin: index % 6 === 0 ? "0 10px 10px 0" : "0 0 10px 0" }} /> : null}
                            {list[index + 2] ? <SideCard data={list[index + 2]} style={{ height: "195px", margin: index % 6 === 0 ? "0 10px 0 0" : "0 0 0 0" }} /> : null}
                        </div>
                    </div> : null
            ))}
        </div>
    );
};

export default CardsList;
