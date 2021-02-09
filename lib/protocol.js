import Hyperbeam from "hyperbeam";
import { Alert } from 'react-native';

const beam = new Hyperbeam('from mafintosh');

export let init = () => {
    beam.addListener("data", (data) => console.log(data));
}

export let send = () => {
    
}