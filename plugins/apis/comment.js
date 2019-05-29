const basePath = "/comment";
export default (axios) => {
  return {
    async getCommentListByid(id) {
      return (await axios.get(basePath + "/getCommentListByid?id=" + id)).data;
    },
  }
}