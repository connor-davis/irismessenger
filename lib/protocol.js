import io from "socket.io-client";

let socket = io("http://192.168.8.120:8080");

export let init = (id) => {
    console.log(id);
    socket.emit("_signalID", { id });
}

export let addPeer = ({ id, info, peerId }) => {
    socket.emit("_addPeer", { id, info, peerId });
}