/**
 * 喜欢
 */
export default (axios) => {
  return {
    async img(img) {
      const form = new FormData();
      form.append('img', img);
      return (await axios.post(`/verify/upload/img`, form)).data;
    },
  }
}