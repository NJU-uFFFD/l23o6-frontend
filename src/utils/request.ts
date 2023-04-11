import axios from "axios";
import { SERVER_ADDR } from "../config";

// 封装一下发起请求的部分, 便于本地测试时调用
function request(args) {
    args.url = SERVER_ADDR + args.path
    return axios.request(args)
}

export default request