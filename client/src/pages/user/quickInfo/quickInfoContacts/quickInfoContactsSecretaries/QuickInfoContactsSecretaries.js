import React, { useContext } from "react";
import "./QuickInfoContactsSecretaries.css";
// contexts
import QuickInfoContext from "../../../../../contexts/quickInfoContext";
// components
import ContactCard from "../../../../../components/contactCard/ContactCard";

const QuickInfoContactsSecretaries = () => {
    const contactsList = useContext(QuickInfoContext).data.filter(data => data.subCategory === "Secretaries");

    return (
        <div className="quickInfoContactsSecretaries">
            {contactsList.map(contact => <ContactCard contact={contact} />)}
        </div>
    );
};

export default QuickInfoContactsSecretaries;
