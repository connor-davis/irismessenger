import {Buffer} from 'buffer';
import dgram from 'react-native-udp';
import io from 'socket.io-client';
import {Alert} from 'react-native';

let _io, _socket;

export let init = () => {
  _io = io('http://localhost:4493');
  _socket = dgram.createSocket({
    type: 'udp6',
  });

  _socket.bind().catch((error) => console.log(error));
};

export let send = () => {};
