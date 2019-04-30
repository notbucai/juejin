export default (axios) => {
  return {
    async navigation() {
      return (await axios.get("/navigation")).data;
    },
    async getTagsByNavId(id){
      return (await axios.get(`/getTagsByNavId?id=${id}`)).data;
    }
  }
}