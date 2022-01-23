import React, { useContext } from "react";
import "./QuickInfoContactsCurrentOfficeBearers.css";
// contexts
import QuickInfoContext from "../../../../../contexts/quickInfoContext";
// components
import ContactCard from "../../../../../components/contactCard/ContactCard";

const QuickInfoContactsCurrentOfficeBearers = () => {
    const contactsList = useContext(QuickInfoContext).data.filter(data => data.subCategory === "Current Office Bearers");

    return (
        <div className="quickInfoContactsCurrentOfficeBearers">
            {contactsList.map(contact => <ContactCard contact={contact} />)}
        </div>
    );
};

export default QuickInfoContactsCurrentOfficeBearers;
