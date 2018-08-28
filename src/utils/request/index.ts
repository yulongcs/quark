import axios from './axios';
import fetch from './fetch';

const request = self.fetch ? fetch : axios;

export default request;
