import {Buffer} from 'buffer';
import dgram from 'react-native-udp';
import io from 'socket.io-client';
import getPort from './getport';
import publicIp from 'public-ip';
import {setUserConnection} from './slices/user.slice';
import {encryptedPacket, sign} from './encryption';
import {Alert} from 'react-native';
import {NetworkInfo} from 'react-native-network-info';

let _io, _socket;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export let init = async (dispatch) => {
  _io = io('http://localhost:4493');
  _socket = dgram.createSocket({
    type: 'udp4',
  });

  let _publicIp = await publicIp.v4();

  let _port = randomIntFromInterval(4494, 5100);

  dispatch(
    setUserConnection({
      ip: _publicIp,
      port: _port,
    }),
  );
};

export let closeSocket = () => {
  if (_socket) _socket.close();
};

/**
 * This function sends messages to other
 * udp sockets.
 *
 * @param {to}                the id of the user to send the message to.
 *
 * @param {message}           the message to send, it will be converted
 *                            into a Buffer and sent.
 *
 * @param {user}              the user's information that the recieving
 *                            user will use to know who the message is
 *                            from.
 *
 * @param {connection}        the connection information for where the
 *                            message is to be sent to.
 */
export let send = ({to, message, user, connection}) => {
  let signature = sign({privateKey: user.keys.privateKey, message});
  let packet = {
    sender: user.id,
    reciever: to.id,
    content: message,
  };

  packet = encryptedPacket({packet, publicKey: to.keys.publicKey, signature});

  let buffer = Buffer.from(JSON.stringify(packet), 'utf-8');

  _io.emit('_sendText', buffer);
};

/**
 * This function recieves messages from
 * other udp sockets.
 *
 * @param {user}              the user's information that the recieving
 *                            user will use to know who the message is
 *                            from.
 *
 * @param {dispatch}          use dispatch from react.
 */
export let recieve = ({user, dispatch}) => {};
