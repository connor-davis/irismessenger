import {Buffer} from 'buffer';
import dgram from 'react-native-udp';
import io from 'socket.io-client';
import getPort from './getport';
import publicIp from 'public-ip';
import {setUserConnection} from './slices/user.slice';
import {encryptedPacket, signature} from "./encryption";

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
};

/**
 * This function sends messages to other
 * udp sockets.
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
export let send = ({message, user, connection}) => {
  let signature = signature({ privateKey: user.keys.privateKey, message });
  let packet = {
    from: {...user, keys: [user.keys.publicKey]},
    content: message,
  };

  packet = encryptedPacket({ packet, publicKey: user.keys.publicKey, signature });
  
  let buffer = Buffer.from(JSON.stringify(packet), 'utf-8');

  socket.send(
    buffer,
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
    connection.port,
    connection.ip,
    (error) => console.log(error),
  );
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
export let recieve = ({user, dispatch}) => {
  if (_socket) _socket.on("message", (packet, remoteInfo) => {
    let decrypted = decryptedPacket(JSON.parse(packet), user.keys.privateKey);
    let verified = verifyPacket(packet, getIssuer(decrypted.issuerID, user.friends).keys.publicKey);
    if (verified) console.log(decrypted);
  });
};
