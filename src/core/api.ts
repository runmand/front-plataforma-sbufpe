import axios from 'axios';

const baseURL = process.env.PLANEJA_API;

export const Api = axios.create({ baseURL });