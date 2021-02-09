import Hyperbeam from "hyperbeam";
import { Alert } from 'react-native';

const beam = new Hyperbeam('this-iris-test');

export let init = () => {
    beam.addListener("data", (data) => console.log(data));
}

export let send = () => {
    
}