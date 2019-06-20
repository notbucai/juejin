/**
 * 用户相关
 */
const basePath = "/user";
export default (axios) => {
  return {
    async getUserInfoByid(id) {
      return (await axios.get(basePath + "/getUserById?id=" + id)).data;
    },
    async getHotUserList() {
      return (await axios.get(basePath + "/getHotUserList")).data;
    },
    async getHotSimpleUserList() {
      return (await axios.get(basePath + "/getHotSimpleUserList")).data;
    },
    async login({ loginPass, loginName }) {
      return (await axios.post(basePath + "/login", { loginPass, loginName })).data;
    },
    async register({ username, userphone, userpass, code }) {
      return (await axios.post(basePath + "/register", { username, userphone, userpass, code: parseInt(code) })).data;
    },
  }
}