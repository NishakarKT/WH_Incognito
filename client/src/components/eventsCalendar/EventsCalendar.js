import React, { useEffect, useState, useRef } from "react";
import "./EventsCalendar.css";
// mui
import { TextField } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const EventsCalendar = () => {
    const [date, setDate] = useState(new Date());
    const calendarRef = useRef(null);

    useEffect(() => {
        const calendar = calendarRef.current;
        console.log(calendar);
    }, []);

    return (
        <div className="eventsCalendar" ref={calendarRef}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker displayStaticWrapperAs="desktop" openTo="day" value={date} onChange={() => { }} renderInput={params => <TextField {...params} />} />
            </LocalizationProvider>
        </div>
    );
};

export default EventsCalendar;
