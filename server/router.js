const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const { navigation } = require('./routes/nav');
const { getTagsByNavId } = require('./routes/tag');

router.get('/navigation', navigation);
router.get('/getTagsByNavId', getTagsByNavId);

module.exports = router;