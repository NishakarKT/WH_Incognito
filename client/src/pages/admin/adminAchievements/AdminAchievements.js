import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./AdminAchievements.css";
// constants
import { ACHIEVEMENTS_DELETE_ENDPOINT, ACHIEVEMENTS_GET_ENDPOINT, ACHIEVEMENTS_PATCH_ENDPOINT, ACHIEVEMENTS_POST_ENDPOINT, TSG_GET_ENDPOINT, SOCIETIES_GET_ENDPOINT } from "../../../constants/endpoints";
// contexts
import UserContext from "../../../contexts/userContext";
// components
import Loader from "../../../components/loader/Loader";
// utils
import { getSearchStr } from "../../../utils";
// mui
import { NativeSelect, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, TextareaAutosize, Button, IconButton, Dialog, FormControl, InputLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const AdminAchievements = () => {
    const { admin } = useContext(UserContext);
    const listRef = useRef(null);
    const newFormRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [achievements, setAchievements] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [canDelete, setCanDelete] = useState({});

    useEffect(() => {
        setIsLoading(true);
        try {
            axios.get(ACHIEVEMENTS_GET_ENDPOINT + "/all")
                .then(res => {
                    setIsLoading(false);
                    setAchievements(res.data);
                })
                .catch(err => setIsLoading(false));
        } catch (err) { setIsLoading(false); };
    }, []);

    useEffect(() => {
        try {
            setIsLoading(true);
            axios.get(TSG_GET_ENDPOINT)
                .then(res => {
                    setIsLoading(false);
                    setEvents(res.data);
                })
                .catch(err => setIsLoading(false));
            setIsLoading(true);
            axios.get(SOCIETIES_GET_ENDPOINT)
                .then(res => {
                    setIsLoading(false);
                    setEvents(events => [...res.data, ...events]);
                })
                .catch(err => setIsLoading(false));
        } catch (err) { setIsLoading(false); };
    }, []);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleUpload = (data, mode) => {
        setIsLoading(true);
        if (mode === "patch") {
            axios.patch(ACHIEVEMENTS_PATCH_ENDPOINT, data)
                .then(res => {
                    setIsLoading(false);
                    setExpanded(false);
                    listRef.current.scrollTo(0, 0);
                    setAchievements(events => {
                        const myArray = events;
                        const myIndex = myArray.findIndex(e => e._id === data._id);
                        myArray[myIndex] = { ...myArray[myIndex], ...data };
                        return myArray;
                    });
                })
                .catch(err => {
                    setIsLoading(false);
                    setExpanded(false);
                })
        }
        else if (mode === "post") {
            axios.post(ACHIEVEMENTS_POST_ENDPOINT, data)
                .then(res => {
                    setAchievements(achievements => [res.data.doc, ...achievements]);
                    setIsLoading(false);
                    setExpanded(false);
                    listRef.current.scrollTo(0, 0);
                    newFormRef.current.reset();
                })
                .catch(err => {
                    setIsLoading(false);
                    setExpanded(false);
                });
        };
    };

    const handleForm = (e, mode, updatesBy) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const _id = formData.get("_id");
        const achiever = formData.get("achiever");
        const date = new Date();
        const event = formData.get("event");
        const pos = formData.get("pos");
        const total = formData.get("total");
        const certificate = formData.get("certificate");
        const newUpdatesBy = [...updatesBy, { date: new Date(), id: admin._id }];

        const data = { achiever, date, event, pos, total, certificate, updatesBy: newUpdatesBy };
        if (_id) data._id = _id;

        handleUpload(data, mode);
    };

    const handleSearch = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchStr = formData.get("search");
        setSearch(searchStr);
    };

    const handleDelete = _id => {
        setIsLoading(true);
        axios.delete(ACHIEVEMENTS_DELETE_ENDPOINT + "/" + _id)
            .then(res => {
                const { _id } = res.data;
                setAchievements(achievements => {
                    let myEvents = achievements.filter(event => event._id !== _id);
                    return myEvents;
                });
                setExpanded(false);
                setIsLoading(false);
                setCanDelete({});
                listRef.current.scrollTo(0, 0);
            })
            .catch(err => setIsLoading(false))
    };

    return (
        <div className="adminTsg">
            {isLoading ? <Loader /> : null}
            {canDelete._id ? <Dialog open={true} onClose={() => setCanDelete({})}>
                <div className="adminAchievements__alertBox">
                    <h1>Are you sure you wish to delete, <span style={{ color: "#1974ec", fontWeight: "500" }}>{canDelete.title}</span>?</h1>
                    <p>Note that you shall no longer shall be able to retrieve back the data once deleted.</p>
                    <div className="adminAchievements__alertButtons">
                        <Button onClick={() => setCanDelete({})}>Cancel</Button>
                        <Button onClick={() => handleDelete(canDelete._id)}>Delete</Button>
                    </div>
                </div>
            </Dialog> : null}
            <div className="adminAchievements__new">
                <h1>New Achievement</h1>
                <p>Add an achievement.</p>
                <form onSubmit={e => handleForm(e, "post", [])} ref={newFormRef}>
                    <TextField variant="standard" label="Achiever's Email Address" inputProps={{ name: "achiever" }} fullWidth required />
                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                        <InputLabel variant="standard" htmlFor="adminAchievements__selectCategory">Event</InputLabel>
                        <NativeSelect inputProps={{ name: "event", id: "adminAchievements__selectCategory" }}>
                            {events.map(event => <option key={event._id} value={JSON.stringify(event)}>{event.title} | {event.category} | {event.host}</option>)}
                        </NativeSelect>
                    </FormControl>
                    <div className="adminAchievements__group">
                        <TextField variant="standard" type="number" label="Achiever's Position" style={{ marginRight: "2.5px" }} inputProps={{ name: "pos" }} required />
                        <TextField variant="standard" type="number" label="Number of Winners" inputProps={{ name: "total" }} style={{ marginLeft: "2.5px" }} required />
                    </div>
                    <TextField variant="standard" label="Link To The Certificate" inputProps={{ name: "certificate" }} fullWidth required />
                    <div className="adminAchievements__buttons">
                        <Button type="submit"><SaveRoundedIcon />Save</Button>
                    </div>
                </form>
            </div>
            <div className="adminAchievements__old">
                <div className="adminAchievements__head">
                    <div className="adminAchievements__title">
                        <h1>Achievements List</h1>
                        <p>List of achievements from various events around the campus.</p>
                    </div>
                    <form className="adminAchievements__search" onSubmit={e => handleSearch(e)}>
                        <TextField variant="standard" label="Search" name="search" />
                        <IconButton type="submit"><SearchRoundedIcon /></IconButton>
                    </form>
                </div>
                <div className="adminAchievements__list" ref={listRef}>
                    {achievements.filter(event => getSearchStr(event).includes(search.toLowerCase())).map((event, index) =>
                        <form key={event._id} onSubmit={e => handleForm(e, "patch", event.updatesBy)}>
                            <Accordion expanded={expanded === "panel" + (index + 1)} onChange={handleChange("panel" + (index + 1))} TransitionProps={{ unmountOnExit: true }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                    <Typography sx={{ color: 'text.secondary', width: '33%', flexShrink: 0 }}>
                                        Last Update:<br />{new Date(event.updatedAt).toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}
                                    </Typography>
                                    <Typography style={{ marginLeft: "10px" }}>{event.achiever}</Typography>
                                    <IconButton onClick={() => setCanDelete(event)}><DeleteRoundedIcon /></IconButton>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <input style={{ display: "none" }} name="_id" defaultValue={event._id} />
                                    <TextField variant="standard" label="Achiever's Email Address" inputProps={{ name: "achiever" }} defaultValue={event.achiever} fullWidth required />
                                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                                        <InputLabel variant="standard" htmlFor="adminAchievements__selectCategory">Event</InputLabel>
                                        <NativeSelect inputProps={{ name: "event", id: "adminAchievements__selectCategory" }} disabled>
                                            {events.map(event => <option key={event._id} value={JSON.stringify(event)}>{event.title} | {event.category} | {event.host}</option>)}
                                        </NativeSelect>
                                    </FormControl>
                                    <div className="adminAchievements__group">
                                        <TextField variant="standard" type="number" label="Achiever's Position" style={{ marginRight: "2.5px" }} inputProps={{ name: "pos" }} defaultValue={event.pos} required />
                                        <TextField variant="standard" type="number" label="Number of Winners" inputProps={{ name: "total" }} style={{ marginLeft: "2.5px" }} defaultValue={event.total} required />
                                    </div>
                                    <TextField variant="standard" label="Link To The Certificate" inputProps={{ name: "certificate" }} defaultValue={event.certificate} fullWidth required />
                                    <div className="adminAchievements__buttons">
                                        <Button type="submit"><SaveRoundedIcon />Save</Button>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </form>)}
                </div>
            </div>
        </div>
    );
};

export default AdminAchievements;
