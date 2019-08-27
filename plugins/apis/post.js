/**
 * 文章相关
 */
const basePath = "/post";
export default (axios) => {
  return {
    async getArticleByid(id) {
      return (await axios.get(basePath + "/getArticleByid?id=" + id)).data;
    },
    async getArticleListByKey(key, page = 1) {
      return (await axios.get(`${basePath}/getArticleListByKey?key=${key}&page=${page}`)).data;
    },
  }
}