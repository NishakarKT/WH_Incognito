import React, { useState, useEffect, useRef } from "react";
import "./StudentsAcademicQuestions.css";
// mui
import { Button, Pagination, TextField, IconButton } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// data
import papers from "./data.json";

const StudentsAcademicQuestions = () => {
    const searchRef = useRef(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    const handlePage = value => {
        setPage(value);
        window.scrollTo(0, window.innerHeight - 200);
    };

    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchRef.current.value);
    };

    return (
        <div className="studentsAcademicQuestions">
            <h1>Previous Year Questions (PYQs)</h1>
            <form className="studentsAcademicQuestions__search" onSubmit={e => handleSearch(e)}>
                <TextField variant="standard" label="Search question papers!" inputRef={searchRef} />
                <IconButton type="submit"><SearchRoundedIcon /></IconButton>
            </form>
            <div className="studentsAcademicQuestions__list">
                {papers.filter(paper => JSON.stringify(paper).toLowerCase().includes(search.toLowerCase())).slice(25 * (page - 1), 25 * (page - 1) + 25).map((paper, index) => (
                    <div key={index} className="studentsAcademicQuestions__card">
                        <p><b>Title: </b> {paper.Paper}</p>
                        <p><b>Year: </b> {paper.Year}</p>
                        <p><b>Department: </b> {paper.Department}</p>
                        <Button onClick={() => window.open(paper.Link)}>View Paper</Button>
                    </div>
                ))
                }
            </div>
            <Pagination count={Math.ceil(papers.length / 25)} onChange={(e, value) => handlePage(value)} />
        </div>
    );
};

export default StudentsAcademicQuestions;
