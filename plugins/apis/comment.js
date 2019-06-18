/**
 * 评论相关
 */
const basePath = "/comment";
export default (axios) => {
  return {
    async getCommentListByid(id) {
      return (await axios.get(basePath + "/getCommentListByid?id=" + id)).data;
    },
    async sendComment({
      article_id, user_id, reply_user_id, comment_id, content
    }) {
      return (await axios.post("/verify/comment/saveComment", { article_id, user_id, reply_user_id, comment_id, content })).data;
    },
  }
}