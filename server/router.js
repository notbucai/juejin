const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const { navigation } = require('./api/nav');
const { getTagsByNavId } = require('./api/tag');
const article = require('./api/article');
const comment = require('./api/comment');

router.get('/navigation', navigation);
router.get('/getTagsByNavId', getTagsByNavId);
router.get('/getAeticleListByNav_id', article.getAeticleListByNav_id);
router.get('/post/getAeticleByid', article.getAeticleByid);
router.get('/comment/getCommentListByid', comment.getCommentListByid);

module.exports = router;