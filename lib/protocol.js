import {Buffer} from 'buffer';
import dgram from 'react-native-udp';
import io from 'socket.io-client';
import getPort from './getport';
import publicIp from 'public-ip';
import {setUserConnection} from './slices/user.slice';

let _io, _socket;

export let init = async (dispatch) => {
  _io = io('http://localhost:4493');
  _socket = dgram.createSocket({
    type: 'udp6',
  });

  let _ip = await publicIp.v4();
  let _port = await getPort({port: getPort.makeRange(4444, 5000)});

  dispatch(
    setUserConnection({
      ip: _ip,
      port: _port,
    }),
  );

  _socket.bind({port: _port});
};

export let closeSocket = () => {
    if (_socket) _socket.close();
}

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
