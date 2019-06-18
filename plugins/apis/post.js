/**
 * 文章相关
 */
const basePath = "/post";
export default (axios) => {
  return {
    async getArticleByid(id) {
      return (await axios.get(basePath + "/getArticleByid?id=" + id)).data;
    },
  }
}