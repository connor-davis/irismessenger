import io from "socket.io-client";

let socket = io("http://localhost:8080");

export let init = (id) => {
    console.log(id);
    socket.emit("_signalID", {id});
}