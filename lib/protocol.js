import nodejs from 'nodejs-mobile-react-native';
import { Alert } from 'react-native';

export let init = () => {
    nodejs.start("main.js");
    nodejs.channel.addListener(
        "message",
        (msg) => {
            Alert.alert("From node: " + msg);
        },
        this
    );
}

export let send = () => {
    nodejs.channel.send("Hello World!");
}