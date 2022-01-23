import React, { useEffect, useContext } from "react";
import "./QuickInfoLinks.css";
// contexts
import QuickInfoContext from "../../../../contexts/quickInfoContext";

const QuickInfoLinks = () => {
    const quickLinks = useContext(QuickInfoContext).data.filter(data => data.category === "links");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="quickInfoLinks">
            <div className="quickInfoLinks__intro">
                <h1>Quick Links</h1>
                <p>Here you get access to some of the important links of IIT Kharagpur.</p>
            </div>
            {quickLinks.map((link, index) => (
                <div key={index} className="quickInfoLinks__linkBox">
                    <b>{link.name}:</b> <a className="quickInfoLinks__link" href={link.URL} target="_blank" rel="noreferrer">{link.URL}</a>
                </div>
            ))}
        </div>
    );
};

export default QuickInfoLinks;
