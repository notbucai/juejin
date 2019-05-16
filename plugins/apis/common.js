export default (axios) => {
  return {
    async navigation() {
      return (await axios.get("/navigation")).data;
    },
    async getTagsByNavId(id) {
      return (await axios.get(`/getTagsByNavId?id=${id}`)).data;
    },
    async getAeticleListByNav_id({ nav_id, tag_id, page, sort } = {}) {
      return (await axios.get(`/getAeticleListByNav_id`, {
        params: {
          nav_id, tag_id, page, sort
        }
      })).data;
    },
  }
}