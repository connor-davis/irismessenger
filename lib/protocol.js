import { Swarm } from "hyperswarm";
import { Alert } from 'react-native';

export let init = () => {
    let swarm = new Swarm();

    swarm.join("this-iris-swarm");
}

export let send = () => {
    
}