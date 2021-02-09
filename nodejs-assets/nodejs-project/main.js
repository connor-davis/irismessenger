var rn_bridge = require('rn-bridge');
const Hyperbeam = require('hyperbeam');

const beam = new Hyperbeam('this-test-topic');

rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send.pipe(beam).pipe(msg);
});

rn_bridge.channel.send("Node was initialized.");