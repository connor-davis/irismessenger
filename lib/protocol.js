import { Buffer } from "buffer";
import io from "socket.io-client";
import Peer from "react-native-peerjs";

import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';

let API_URI = "http://197.89.142.244:4493";

class IrisProcotol {
    constructor(id, dispatch) {
        this._id = id;
        this._dispatch = dispatch;
        this._io = io(API_URI, {
            forceNew: true,
        });
        this._buffer = Buffer;

        this._io.on("connect", () => console.log("Connected to Iris Discovery Server."));
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
    addPeer({ id, info, peerId }) {
        this._io.emit("_addPeer", { id, info, peerId });
    }
}

export let initProtocol = (id, dispatch) => {
    return new IrisProcotol(id, dispatch);
}