var rn_bridge = require('rn-bridge');
const Hyperbeam = require('hyperbeam');

const beam = new Hyperbeam('this-test-topic');
const beamPipe = process.stdin.pipe(beam);

rn_bridge.channel.on('message', (msg) => {
  beamPipe.pipe(msg);
});

rn_bridge.channel.send("Node was initialized.");