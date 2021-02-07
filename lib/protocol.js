import io from "socket.io-client";

let socket = io("http://192.168.8.120:8080");

export let init = (id, dispatch) => {

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

module.exports = {
    socket
};