import axios from "axios"
//网络请求根路径
// axios.defaults.baseURL = "http://120.79.1.28:2003"
axios.defaults.baseURL = `http://${process.env.VUE_APP_BASE_API}:2003`
// axios.defaults.baseURL = "http://103.49.94.145:2003"

export default axios