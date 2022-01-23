import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "./AdminNews.css";
// firebase
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../../firebase";
// constants
import { NEWS_GET_ENDPOINT, NEWS_POST_ENDPOINT, NEWS_PATCH_ENDPOINT, NEWS_DELETE_ENDPOINT } from "../../../constants/endpoints";
// contexts
import UserContext from "../../../contexts/userContext";
// components
import Loader from "../../../components/loader/Loader";
import MediaSlider from "../../../components/mediaSlider/MediaSlider";
// utils
import { mediaType, getSearchStr } from "../../../utils";
// mui
import { NativeSelect, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, TextareaAutosize, Button, IconButton, Dialog, FormControl, InputLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const AdminNews = () => {
    const { admin } = useContext(UserContext);
    const listRef = useRef(null);
    const newFormRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newsList, setNewsList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [newMediaFiles, setNewMediaFiles] = useState([]);
    const [progress, setProgress] = useState([]);
    const [search, setSearch] = useState("");
    const [canDelete, setCanDelete] = useState({});

    useEffect(() => {
        setIsLoading(true);
        try {
            axios.get(NEWS_GET_ENDPOINT)
                .then(res => {
                    setIsLoading(false);
                    setNewsList(res.data);
                })
                .catch(err => setIsLoading(false));
        } catch (err) { setIsLoading(false); };
    }, []);

    const handleChange = panel => (event, isExpanded) => {
        setMediaFiles([]);
        setExpanded(isExpanded ? panel : false);
    };

    const handleFiles = (e, type) => {
        if (type === "old")
            setMediaFiles(Array.from(e.target.files).map(file => {
                const type = mediaType(file.name.split(".").slice(-1)[0]);
                return ({ type, url: URL.createObjectURL(file) });
            }));
        else if (type === "new")
            setNewMediaFiles(Array.from(e.target.files).map(file => {
                const type = mediaType(file.name.split(".").slice(-1)[0]);
                return ({ type, url: URL.createObjectURL(file) });
            }));
    };

    const handleUpload = (data, files, mode) => {
        setIsLoading(true);

        if (files)
            getFileURLs(data, files, mode);
        else if (mode === "patch") {
            axios.patch(NEWS_PATCH_ENDPOINT, data)
                .then(res => {
                    setIsLoading(false);
                    setExpanded(false);
                    listRef.current.scrollTo(0, 0);
                    setNewsList(events => {
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
            axios.post(NEWS_POST_ENDPOINT, data)
                .then(res => {
                    setNewsList(newsList => [res.data.doc, ...newsList]);
                    setIsLoading(false);
                    setExpanded(false);
                    setNewMediaFiles([]);
                    listRef.current.scrollTo(0, 0);
                    newFormRef.current.reset();
                })
                .catch(err => {
                    setIsLoading(false);
                    setExpanded(false);
                });
        };
    };

    const getFileURLs = (data, files, mode) => {
        const fileURLs = [];
        setProgress([]);

        files.map((file, index) => {
            const storageRef = ref(storage, "newsList/" + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_change",
                snapshot => {
                    const taskProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress => {
                        const myProgress = [...progress];
                        myProgress[index] = { file: file.name, taskProgress };
                        return myProgress;
                    });
                },
                error => null,
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setProgress(progress => {
                        const myProgress = progress.filter(progress => progress.file !== file.name);
                        return myProgress;
                    });
                    fileURLs.push(downloadURL);
                    if (fileURLs.length === files.length)
                        handleUpload({ ...data, fileURLs }, null, mode);
                });
        });
    };

    const handleForm = (e, mode, updatesBy) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const files = formData.getAll("files");

        const _id = formData.get("_id");
        const title = formData.get("title");
        const date = formData.get("date");
        const category = formData.get("category");
        const description = formData.get("description");
        const host = formData.get("host");
        const subCategory = "";
        const newUpdatesBy = [...updatesBy, { date: new Date(), id: admin._id }];

        const data = { title, date, description, category, subCategory, host, updatesBy: newUpdatesBy };
        if (_id) data._id = _id;

        handleUpload(data, files[0].name ? files : null, mode);
    };

    const handleSearch = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchStr = formData.get("search");
        setSearch(searchStr);
    };

    const handleDelete = _id => {
        setIsLoading(true);
        axios.delete(NEWS_DELETE_ENDPOINT + "/" + _id)
            .then(res => {
                const { _id } = res.data;
                setNewsList(newsList => {
                    let myEvents = newsList.filter(event => event._id !== _id);
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
        <div className="adminNews">
            {isLoading ? <Loader progress={progress} /> : null}
            {canDelete._id ? <Dialog open={true} onClose={() => setCanDelete({})}>
                <div className="adminNews__alertBox">
                    <h1>Are you sure you wish to delete, <span style={{ color: "#1974ec", fontWeight: "500" }}>{canDelete.title}</span>?</h1>
                    <p>Note that you shall no longer shall be able to retrieve back the data once deleted.</p>
                    <div className="adminNews__alertButtons">
                        <Button onClick={() => setCanDelete({})}>Cancel</Button>
                        <Button onClick={() => handleDelete(canDelete._id)}>Delete</Button>
                    </div>
                </div>
            </Dialog> : null}
            <div className="adminNews__new">
                <h1>New News</h1>
                <p>Add a news event to the website.</p>
                <form onSubmit={e => handleForm(e, "post", [])} ref={newFormRef}>
                    <TextField variant="standard" label="Title" name="title" fullWidth />
                    <p style={{ marginBottom: "5px" }}>Description</p>
                    <TextareaAutosize id="adminNews__description" placeholder="Description" name="description" />
                    <div className="adminNews__group">
                        <FormControl>
                            <InputLabel variant="standard" htmlFor="adminNews__selectCategory">Category</InputLabel>
                            <NativeSelect inputProps={{ name: "category", id: "adminNews__selectCategory", }} defaultValue={"Technology"} style={{ marginRight: "5px" }}>
                                <option value="Technology">Technology</option>
                                <option value="Social And Culture">Social And Culture</option>
                                <option value="Sports And Games">Sports And Games</option>
                                <option value="Students' Welfare">Students' Welfare</option>
                            </NativeSelect>
                        </FormControl>
                        <FormControl>
                            <InputLabel variant="standard" htmlFor="adminNews__selectSubCategory">Sub-Category</InputLabel>
                            <NativeSelect defaultValue="NA" inputProps={{ name: "subCategory", id: "adminNews__selectSubCategory" }} style={{ marginLeft: "5px" }}>
                                <option value="NA">Not Applicable</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                    <div className="adminNews__group">
                        <TextField variant="standard" label="Date" type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} fullWidth />
                        <TextField variant="standard" label="Host" name="host" style={{ marginLeft: "5px" }} fullWidth />
                    </div>
                    <MediaSlider mediaFiles={newMediaFiles} style={{ height: "250px", marginBottom: "10px" }} />
                    <div className="adminNews__buttons">
                        <div className="adminNews__filesInput" style={{ marginRight: "2.5px" }}>
                            <Button onClick={e => e.target.nextElementSibling.click()}><PictureAsPdfRoundedIcon />Choose Files</Button>
                            <input type="file" name="files" onChange={e => handleFiles(e, "new")} style={{ display: "none" }} multiple />
                        </div>
                        <Button type="submit" style={{ marginLeft: "2.5px" }}><SaveRoundedIcon />Save</Button>
                    </div>
                </form>
            </div>
            <div className="adminNews__old">
                <div className="adminNews__head">
                    <div className="adminNews__title">
                        <h1>News List</h1>
                        <p>List of News around the campus.</p>
                    </div>
                    <form className="adminNews__search" onSubmit={e => handleSearch(e)}>
                        <TextField variant="standard" label="Search" name="search" />
                        <IconButton type="submit"><SearchRoundedIcon /></IconButton>
                    </form>
                </div>
                <div className="adminNews__list" ref={listRef}>
                    {newsList.filter(event => getSearchStr(event).includes(search.toLowerCase())).map((event, index) =>
                        <form key={event._id} onSubmit={e => handleForm(e, "patch", event.updatesBy)}>
                            <Accordion expanded={expanded === "panel" + (index + 1)} onChange={handleChange("panel" + (index + 1))} TransitionProps={{ unmountOnExit: true }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                    <Typography sx={{ color: 'text.secondary', width: '33%', flexShrink: 0 }}>
                                        Last Update:<br />{new Date(event.updatedAt).toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}
                                    </Typography>
                                    <Typography style={{ marginLeft: "10px" }}>{event.title}</Typography>
                                    <IconButton onClick={() => setCanDelete(event)}><DeleteRoundedIcon /></IconButton>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <input style={{ display: "none" }} name="_id" defaultValue={event._id} />
                                    <TextField variant="standard" label="Title" name="title" defaultValue={event.title} fullWidth />
                                    <p style={{ marginBottom: "5px" }}>Description</p>
                                    <TextareaAutosize id="adminNews__description" placeholder="Description" name="description" defaultValue={event.description} />
                                    <div className="adminNews__group">
                                        <FormControl>
                                            <InputLabel variant="standard" htmlFor="adminNews__editCategory">Category</InputLabel>
                                            <NativeSelect defaultValue={event.category} inputProps={{ name: "category", id: "adminNews__editCategory" }} style={{ marginRight: "5px" }}>
                                                <option value="Technology">Technology</option>
                                                <option value="Social And Culture">Social And Culture</option>
                                                <option value="Sports And Games">Sports And Games</option>
                                                <option value="Students' Welfare">Students' Welfare</option>
                                            </NativeSelect>
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel variant="standard" htmlFor="adminNews__editSubCategory">Sub Category</InputLabel>
                                            <NativeSelect defaultValue="NA" inputProps={{ name: "subCategory", id: "adminNews__editSubCategory" }} style={{ marginLeft: "5px" }}>
                                                <option value="NA">Not Applicable</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                    <div className="adminNews__group">
                                        <TextField variant="standard" label="Date" type="date" name="date" defaultValue={(new Date(event.date)).toISOString().split('T')[0]} style={{ marginRight: "5px" }} fullWidth />
                                        <TextField variant="standard" label="Host" name="host" defaultValue={event.host} style={{ marginLeft: "5px" }} fullWidth />
                                    </div>
                                    <MediaSlider mediaFiles={mediaFiles.length ? mediaFiles : event.fileURLs} style={{ height: "250px", marginBottom: "10px" }} />
                                    <div className="adminNews__buttons">
                                        <div className="adminNews__filesInput" style={{ marginRight: "2.5px" }}>
                                            <Button onClick={e => e.target.nextElementSibling.click()}><PictureAsPdfRoundedIcon />Choose Files</Button>
                                            <input type="file" name="files" onChange={e => handleFiles(e, "old")} style={{ display: "none" }} multiple />
                                        </div>
                                        <Button type="submit" style={{ marginLeft: "2.5px" }}><SaveRoundedIcon />Save</Button>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </form>)}
                </div>
            </div>
        </div>
    );
};

export default AdminNews;
