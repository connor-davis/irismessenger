import nodejs from 'nodejs-mobile-react-native';

export let init = () => nodejs.start("main.js");

export let send = () => {
    nodejs.channel.send("Hello World!");
}