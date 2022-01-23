import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ProfileMessages.css";
// constants
import { USER_PROFILE_ROUTE } from "../../../../constants/routes";
import { PROFILE_CHAT_BG_JPG } from "../../../../constants/images";
import { MESSAGES_GET_ENDPOINT, MESSAGES_POST_ENDPOINT, MESSAGES_PATCH_ENDPOINT } from "../../../../constants/endpoints";
// contexts
import UserContext from "../../../../contexts/userContext";
import ProfileContext from "../../../../contexts/profileContext";
// components
import ChatBubble from "../../../../components/chatBubble/ChatBubble";
// utils
import { truncateString } from "../../../../utils";
// socket
import socket from "../../../../socket";
// mui
import { Avatar, Drawer, TextField } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded"

const ProfileMessages = () => {
    const history = useHistory();
    const chatRef = useRef(null);
    const newMessageRef = useRef(null);
    const { user } = useContext(UserContext);
    const { itsMe, profile } = useContext(ProfileContext);
    const { friends } = useContext(UserContext);
    const [myFriend, setMyFriend] = useState({});
    const [drawerState, setDrawerState] = useState(false);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!itsMe)
            history.push(USER_PROFILE_ROUTE + "/" + profile.email)
    }, [history, itsMe, profile]);

    useEffect(() => {
        setMyFriend(friends[0] || {})
        setTimeout(() => setDrawerState(true), 0);
        try {
            axios.get(MESSAGES_GET_ENDPOINT + "/" + user.email)
                .then(res => {
                    setMessages(res.data.messages || []);
                    setTimeout(() => chatRef.current ? chatRef.current.scrollTop = chatRef.current.scrollHeight : null, 0);
                })
                .catch(err => { });
        } catch (err) { };
    }, [friends]);

    useEffect(() => {
        socket.emit("join", user.email);
        socket.on("recieveMessage", message => {
            setMessages(messages => [...messages, message]);
            setTimeout(() => chatRef.current ? chatRef.current.scrollTop = chatRef.current.scrollHeight : null, 0);
        });
    }, []);

    const handleNewMessage = e => {
        e.preventDefault();
        const from = user.email;
        const to = myFriend.email;
        const content = text;
        const date = new Date();
        const newMessage = { from, to, content, date };
        // send message
        socket.emit("sendMessage", newMessage);
        // update messages list
        setMessages(messages => [...messages, newMessage]);
        // update messages database
        try {
            if (messages.length)
                axios.patch(MESSAGES_PATCH_ENDPOINT, { user1: user.email, user2: myFriend.email, newMessage })
                    .then(res => console.log(res.data.doc))
                    .catch(err => console.log(err));
            else
                axios.post(MESSAGES_POST_ENDPOINT, { newMessage })
                    .then(res => console.log(res.data.doc))
                    .catch(err => console.log(err));

        } catch (err) { console.log(err); };
        // reset
        setText("");
        setTimeout(() => chatRef.current.scrollTop = chatRef.current.scrollHeight, 0);
    };

    const handleMyFriend = friend => {
        setMyFriend(friend);
        setTimeout(() => chatRef.current.scrollTop = chatRef.current.scrollHeight, 0);
    };

    return (
        <Drawer anchor="top" open={drawerState}>
            <div className="profileMessages">
                <div className="profileMessages__list">
                    <div className="profileMessages__listItems">
                        {friends.map(friend =>
                            <div key={friend._id} className={`profileMessages__listItem ${friend.email === myFriend.email ? "profileMessages__listItemActive" : ""}`} onClick={() => handleMyFriend(friend)}>
                                <Avatar src={friend.profilePic} alt="" />
                                <div>
                                    <p className="profileMessages__name">{friend.name}</p>
                                    <p className="profileMessages__message">{truncateString("Here is the last message sent/recieved with the friend.", 45)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="profileMessages__chat">
                    <div className="profileMessages__chatHead">
                        <Avatar src={myFriend.profilePic} alt="" />
                        <div>
                            <p className="profileMessages__name">{myFriend.name}</p>
                            <p className="profileMessages__roll">{myFriend.roll}</p>
                        </div>
                        <CancelRoundedIcon onClick={() => history.push(USER_PROFILE_ROUTE + "/" + profile.email + "/friends")} />
                    </div>
                    <div className="profileMessages__chatBody">
                        <img src={PROFILE_CHAT_BG_JPG} alt="" />
                        <div className="profileMessages__messagesList" ref={chatRef}>
                            {messages.filter(message => message.from === myFriend.email || message.to === myFriend.email).map((message, index) => <ChatBubble key={index} message={message} myText={user.email === message.from} />)}
                        </div>
                    </div>
                    <form className="profileMessages__chatFoot" onSubmit={e => handleNewMessage(e)} ref={newMessageRef}>
                        <TextField variant="standard" label="Type your message" name="content" value={text} onChange={e => setText(e.target.value)} />
                        <SendRoundedIcon onClick={() => newMessageRef.submit()} />
                    </form>
                </div>
            </div>
        </Drawer>
    );
};

export default ProfileMessages;
