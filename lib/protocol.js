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

  _socket.bind({ port: 4494 });
};

/**
 * This function sends messages to other
 * udp sockets.
 *
 * @param {message} the message to send, it will
 * be converted into a Buffer and sent.
 *
 * @param {remoteIp} the remote ip address
 * @param {remotePort} the remote port
 */
export let send = ({message, remoteIp, remotePort}) => {
  let buffer = Buffer.from(message, 'utf-8');

  socket.send(
    buffer,
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
    remotePort,
    remoteIp,
    (error) => console.log(error),
  );
};
