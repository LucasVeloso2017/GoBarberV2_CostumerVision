import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.100:3333',
  headers:{
    Authorization: `Bearer ${AsyncStorage.getItem('@GoBarber:token')}`
}

});

export default api;

