import { Alert } from "react-native";
import io from "socket.io-client";

let socket = io("http://192.168.8.120:8080");

export let init = (id, dispatch) => {
    socket.emit("_signalID", { id });

    socket.on(`_${id}NewPeer`, ({ id, info }) => {
        console.log("Peer with id " + id + " and info " + JSON.stringify(info) + " wants to connect.");
    });

    socket.on("disconnect", () => {
        Alert.alert("Disconnected from the server ...");
    });
}

export let addPeer = ({ id, info, peerId }) => {
    socket.emit("_addPeer", { id, info, peerId });
}