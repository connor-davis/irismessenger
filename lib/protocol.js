import {
  decryptedPacket,
  encryptedPacket,
  sign,
  verifyPacket,
} from './encryption';

import { Alert } from 'react-native';
import { Buffer } from 'buffer';
import io from 'socket.io-client';

let _io = io('http://192.168.1.35:4493');

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export let init = () => {
  console.log("Initialized Iris Protocol...");
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
 * @param {user}              the user's information that the receiving
 *                            user will use to know who the message is
 *                            from.
 *
 * @param {connection}        the connection information for where the
 *                            message is to be sent to.
 */
export let send = ({ to, message, user }) => {
  let signature = sign({ privateKey: user.keys.privateKey, message });
  let packet = {
    sender: user.id,
    receiver: to.id,
    content: message,
    publicKeys: [to.keys.publicKey],
    signature,
  }

  packet = encryptedPacket({ packet, publicKeys: packet.publicKeys, signature: packet.signature });

  let buffer = Buffer.from(JSON.stringify(packet), 'utf8');

  _io.emit('_sendText', { buffer, receiver: to.id });
};

/**
 * This function receives messages from
 * other udp sockets.
 *
 * @param {user}              the user's information that the receiving
 *                            user will use to know who the message is
 *                            from.
 *
 * @param {dispatch}          use dispatch from react.
 */
export let receive = ({ receiver, dispatch }) => {
  _io.on(`_${receiver.id}NewText`, (packet) => {
    packet = decryptedPacket({
      packet: JSON.parse(packet),
      privateKey: receiver.keys.privateKey,
    });

    let payload = JSON.parse(packet.message);
    let verified = verifyPacket({ packet: payload, publicKeys: payload.publicKeys });

    if (verified) Alert.alert('New Text', payload.content);
  });
};