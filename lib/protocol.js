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

let getNetworkIP = (callback) => {
  var socket = net.createConnection(80, 'www.google.com');
  socket.on('connect', function () {
    callback(undefined, socket.address().address);
    socket.end();
  });
  socket.on('error', function (e) {
    callback(e, 'error');
  });
};

export let init = async (dispatch) => {
  _io = io('http://localhost:4493');
  _socket = dgram.createSocket({
    type: 'udp4',
  });

  let _publicIp = await publicIp.v4();

  let _port = await getPort({port: getPort.makeRange(4495, 5000)});

  dispatch(
    setUserConnection({
      ip: _publicIp,
      port: _port,
    }),
  );

  NetworkInfo.getIPAddress().then(ipAddress => {
    console.log(ipAddress);
  });
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
  let signature = sign({privateKey: user.keys.privateKey, message});
  let packet = {
    from: {...user, keys: {}},
    content: message,
  };

  // packet = encryptedPacket({ packet, publicKey: user.keys.publicKey, signature });

  let buffer = Buffer.from(JSON.stringify(packet), 'utf-8');

  console.log(
    'Sent: ' + JSON.stringify(packet) + ', to: ' + JSON.stringify(connection),
  );

  _socket.send(
    JSON.stringify(packet),
    null,
    null,
    connection.port,
    connection.ip,
    (error) => console.log(error),
  );

  Alert.alert('Sent Message', message);
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
  if (_socket)
    _socket.on('message', (packet, remoteInfo) => {
      packet = JSON.parse(packet);

      Alert.alert(packet);
      // let decrypted = decryptedPacket(JSON.parse(packet), user.keys.privateKey);
      // let verified = verifyPacket(packet, getIssuer(decrypted.issuerID, user.friends).keys.publicKey);
      // if (verified) console.log(decrypted);
    });
};
