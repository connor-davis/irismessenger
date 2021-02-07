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
let configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };

class IrisProcotol {
    constructor(id, dispatch) {
        this._id = id;
        this._peerId = "";
        this._dispatch = dispatch;
        this._io = io(API_URI, {
            forceNew: true,
        });
        this._buffer = Buffer;
        this._peer = new Peer(undefined, {
            host: "197.89.142.244",
            secure: false,
            port: 4493,
            path: "/p2p",
        });
        this._peerConnection = new RTCPeerConnection(configuration);

        this.openEvents();

        this._peer.on("error", (error) => console.log(error));
    }

    /**
     * This function will follow the protocol
     * of adding another peer.
     * 
     * @id this peers id
     * @info this peers info+
     * 
     * @peerId the other peers id
     */
    addPeer({ id, info, peerId }) {
        this._io.emit("_addPeer", { id, info, peerId });
    }

    /**
     * This function will make sure that other
     * peers who know about this peer are
     * notified about a new @peerId for this
     * peer.
     */
    openEvents() {
        this._peer.on("open", peerId => {
            this._peerId = peerId;

            this._peerConnection.createOffer().then((description) => {
                this._peerConnection.setRemoteDescription(description).then(() => {
                    this._io.emit("_peerInitialized", { id: this._id, peerId: this._peerId });
                });
            });

            this._io.on("connect", () => {
                console.log("Connected to Iris Discovery Server.");

                this._peerConnection.createOffer().then((description) => {
                    this._peerConnection.setRemoteDescription(description).then(() => {
                        this._io.emit("_peerInitialized", { id: this._id, peerId: this._peerId });
                    });
                });
            });
        });
    }
}

export let initProtocol = (id, dispatch) => {
    return new IrisProcotol(id, dispatch);
}