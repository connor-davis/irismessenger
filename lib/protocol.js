import { Buffer } from "buffer";
import udp from "react-native-udp";
import io from "socket.io-client";

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
        this._io = io("http://192.168.1.43:8080");
        this._socket = udp.createSocket({
            type: "udp4",
            reusePort: false,
            debug: false,
        });
        this._buffer = Buffer;
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