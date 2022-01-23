import React, { useState, useEffect, useContext, useCallback } from "react";
import "./Assistant.css";
// constants
import { NYRA_PNG } from "../../constants/images";
// components
import ChatBox from "../chatBox/ChatBox";
// contexts
import UserContext from "../../contexts/userContext";
// mui
import { Fab, Avatar } from "@mui/material";
// speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new SpeechRecognition();
// speech synthesis
const utterance = new SpeechSynthesisUtterance();

const Assistant = () => {
    const { user } = useContext(UserContext);
    const [activate, setActivate] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isNyraSpeaking, setIsNyraSpeaking] = useState(false);
    const [messages, setMessages] = useState([{
        date: new Date(), content: "Hey there! How may I help you today?", from: "Nyra"
    }]);

    const saySpeech = speech => {
        utterance.text = speech;
        window.speechSynthesis.speak(utterance);
    }

    const processCommand = useCallback(command => {
        const myCommand = command.toLowerCase();
        let content;

        // recognisable commands
        if (myCommand.startsWith("open")) {
            const url = "https://" + myCommand.split(" ").slice(1).join(" ") + ".com";
            window.open(url.replaceAll(" ", ""));
            content = "Okay! I am redirecting you to " + url.replace("https://", "");
        }
        else if (myCommand.startsWith("search")) {
            const searchOn = myCommand.split(" ")[1];
            const searchStr = myCommand.split(" ").slice(2).join(" ");

            if (searchOn === "google") window.open("https://google.com/search?q=" + searchStr);
            else if (searchOn === "youtube") window.open("https://www.youtube.com/results?search_query=" + searchStr);
            else if (searchOn === "linkedin") window.open("https://www.linkedin.com/search/results/all/?keywords=" + searchStr);

            content = `Okay! I am running a ${searchOn} search for ${searchStr}`;
        }
        else {
            content = "I'm sorry. I couldn't understand you!";
        }

        saySpeech(content);
        return ({ from: "Nyra", content, date: new Date() });
    }, []);

    const handleNewCommand = useCallback(command => {
        const newMessage = { from: user.roll, content: command, date: new Date() }
        setMessages(messages => [...messages, newMessage]);

        const nyraMessage = processCommand(command);
        setTimeout(() => {
            setMessages(messages => [...messages, nyraMessage]);
        }, 500);
    }, [user, processCommand]);

    useEffect(() => {
        // recognizer
        recognizer.onstart = () => {
            console.log("Started Listening...");
        }
        recognizer.onend = () => {
            console.log("Stopped Listening...");
        }
        recognizer.onresult = e => {
            setIsListening(false);
            const command = e.results[0][0].transcript;
            handleNewCommand(command);
        }
        // utterance
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices()
            utterance.voice = voices[12];
        };
        utterance.onstart = () => {
            setIsNyraSpeaking(true);
        };
        utterance.onend = () => {
            setIsNyraSpeaking(false);
        };
    }, [handleNewCommand]);

    useEffect(() => {
        if (isListening) recognizer.start();
        else recognizer.stop();
    }, [isListening]);

    return (
        <div className="assistant">
            <Fab className="assistant__toggle" onClick={() => setActivate(activate => !activate)} tabIndex={0}>
                <Avatar src={NYRA_PNG} alt="" />
            </Fab>
            <ChatBox isListening={isListening} setIsListening={setIsListening} isNyraSpeaking={isNyraSpeaking} setActivate={setActivate} username={user.name} messages={messages} handleNewCommand={handleNewCommand} style={activate ? { width: "350px", height: "450px" } : { width: "0px", height: "0px" }} />
        </div>
    );
};

export default Assistant;
