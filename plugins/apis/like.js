/**
 * 喜欢
 */
export default (axios) => {
  return {
    async like(id) {
      return (await axios.get(`/verify/like/like?id=${id}`)).data;
    },

  }
}