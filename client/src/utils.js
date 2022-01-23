import axios from "axios";
import { MESSAGES_GET_ENDPOINT, USER_GET_ENDPOINT } from "./constants/endpoints";

const imageTypes = ["jpg", "JPG", "png", "jpeg", "gif", "apng", "svg", "bmp", "ico"];
const videoTypes = ["mp4", "webm", "ogg"];
const docTypes = ["pdf"];

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const truncateString = (string, maxLength) => string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

export const mediaType = (ext) => {
    if (imageTypes.includes(ext)) return "image";
    else if (videoTypes.includes(ext)) return "video";
    else if (docTypes.includes(ext)) return "doc";
};

export const getProfile = async email => {
    try {
        return await axios.get(USER_GET_ENDPOINT + "/" + email)
            .then(res => res.data)
            .catch(err => err.response.data.msg)
    } catch (err) { return err; };
};

export const getMessages = async email => {
    try {
        return await axios.get(MESSAGES_GET_ENDPOINT + "/" + email)
            .then(res => res.data)
            .catch(err => err.response.data.msg)
    } catch (err) { return err; };
};

export const getSearchStr = obj => {
    let searchStr = "";
    Object.values(obj).forEach(value => searchStr += value);
    return searchStr.toLowerCase();
};