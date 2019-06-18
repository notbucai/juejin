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
  }
}