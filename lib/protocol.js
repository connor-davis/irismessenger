import nodejs from 'nodejs-mobile-react-native';

export let init = () => {
    nodejs.start("main.js");
    nodejs.channel.addListener(
        "message",
        (msg) => {
            alert("From node: " + msg);
        },
        this
    );
}

export let send = () => {
    nodejs.channel.send("Hello World!");
}