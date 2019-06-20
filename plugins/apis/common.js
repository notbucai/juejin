/**
 * 公共
 */
export default (axios) => {
  return {
    async navigation() {
      return (await axios.get("/navigation")).data;
    },
    async getTagsByNavId(id) {
      return (await axios.get(`/getTagsByNavId?id=${id}`)).data;
    },
    async getArticleListByNav_id({ nav_id, tag_id, page, sort } = {}) {
      return (await axios.get(`/getArticleListByNav_id`, {
        params: {
          nav_id, tag_id, page, sort
        }
      })).data;
    },
    async code(phone) {
      return (await axios.get(`/common/code?phone=${phone}`)).data;
    },
  }
}