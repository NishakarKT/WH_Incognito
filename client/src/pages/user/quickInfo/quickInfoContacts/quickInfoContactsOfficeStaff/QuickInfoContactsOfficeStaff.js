import React, { useContext } from "react";
import "./QuickInfoContactsOfficeStaff.css";
// contexts
import QuickInfoContext from "../../../../../contexts/quickInfoContext";
// comopnents
import ContactCard from "../../../../../components/contactCard/ContactCard";

const QuickInfoContactsOfficeStaff = () => {
    const contactsList = useContext(QuickInfoContext).data.filter(data => data.subCategory === "Office Staff");

    return (
        <div className="quickInfoContactsOfficeStaff">
            {contactsList.map(contact => <ContactCard contact={contact} />)}
        </div>
    );
};

export default QuickInfoContactsOfficeStaff;
