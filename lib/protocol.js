import io from "socket.io-client";

let socket = io("http://192.168.8.120:8080");

export let init = (id, dispatch) => {
    socket.on("connect", () => {
        socket.emit("_signalID", { id });
    });

    socket.on(`_${id}NewPeer`, ({ id, info }) => {
        console.log("Peer with id " + id + " and info " + JSON.stringify(info) + " wants to connect.");
    });
}

/**
 * This function will follow the protocol
 * of adding another peer.
 * 
 * @id this peers id
 * @info this peers info
 * 
 * @peerId the other peers id
 */
export let addPeer = ({ id, info, peerId }) => {
    socket.emit("_addPeer", { id, info, peerId });
}