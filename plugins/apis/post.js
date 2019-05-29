const basePath = "/post";
export default (axios) => {
  return {
    async getAeticleByid(id) {
      return (await axios.get(basePath + "/getAeticleByid?id=" + id)).data;
    },
  }
}