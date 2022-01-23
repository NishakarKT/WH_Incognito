import { io } from "socket.io-client";
import { ENDPOINT } from "./constants/endpoints";

const socket = io(ENDPOINT);

export default socket;