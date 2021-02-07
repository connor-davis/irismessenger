import {Buffer} from "buffer";
import udp from "react-native-udp";
import io from "socket.io-client";

export class IrisProcotol {
    constructor(id, dispatch) {
        this._id = id;
        this._dispatch = dispatch;
        this._io = io("http://192.168.8.120:8080");
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