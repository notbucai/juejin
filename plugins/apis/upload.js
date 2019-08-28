/**
 * 喜欢
 */
export default (axios) => {
  return {
    async img(img) {
      const form = new FormData();
      form.append('smfile', img);
      form.append('format', 'json');

      return (await axios.post(`https://sm.ms/api/v2/upload`, form, {
        headers: {
          "Authorization": "n9vtG91icNHcfZPyqt242Xxg9RJOex9V",
        }
      })).data;
    },
  }
}