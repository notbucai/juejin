const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const { navigation } = require('./api/nav');
const { getTagsByNavId } = require('./api/tag');
const article = require('./api/article');
const comment = require('./api/comment');
const user = require('./api/user');
// 凡是url 中以 verify 开头的都要 通过jwt 
// 全局相关的
router.get('/navigation', navigation);
router.get('/getTagsByNavId', getTagsByNavId);
router.get('/getArticleListByNav_id', article.getArticleListByNav_id);
// 文章相关
router.get('/post/getArticleByid', article.getArticleByid);
// 评论相关
router.get('/comment/getCommentListByid', comment.getCommentListByid);
router.post('/verify/comment/saveComment', comment.saveComment);
// 用户相关
router.get('/user/getHotSimpleUserList', user.getHotSimpleUserList);
router.get('/user/getHotUserList', user.getHotUserList);
router.get('/user/getUserById', user.getUserById);
router.post('/user/login', user.login);


module.exports = router;