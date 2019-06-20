const Koa = require('koa')
const path = require('path');
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const router = require('./router');
const koaBody = require('koa-body');
const KoaSession = require('koa-session2');
const Store = require("./lib/Store");
// const jwtFn = require('./middleware/jwt');
const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
// const websiteConfig = require('../website.config');
config.dev = !(app.env === 'production');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

async function koaInit() {
  app.keys = ['session xxx nb'];
  const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: true,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
  };
  app
    /**
     * 捕获错误
     */
    .use(async function (ctx, next) {
      try {
        await next();
      } catch (error) {
        ctx.body = {
          code: 500,
          message: error.message || "未知错误"
        };
      }
    })
    .use(KoaSession({
      store: new Store(),
      key: "SESSIONID",  // default "koa:sess"
    }))
    .use(async (ctx, next) => {
      //  nuxtjs 获取 req.session 而 koa-session 属于ctx 不存在于 ctx.req 
      ctx.req.session = ctx.session;
      await next();
    })
    /**
     * 鉴权=》错误信息
     */
    .use(async (ctx, next) => {
      return next().catch((err) => {
        if (err.status === 401) {

          ctx.status = 401;
          ctx.body = {
            code: ctx.status,
            message: "权限问题"
          };
        } else {
          throw err;
        }
      });
    })
    //  权限验证
    .use(async (ctx, next) => {
      //  nuxtjs 获取 req.session 而 koa-session 属于ctx 不存在于 ctx.req 
      if (!/^(?!\/api\/verify\/).*$/.test(ctx.url)) {
        if (ctx.session.user && ctx.session.user._id) {
          await next();
        } else {
          ctx.throw(401);
          return;
        }
      }else{
        await next();
      }
    })
    /**
     * post数据传递
     */
    .use(koaBody({
      multipart: true, // 支持文件上传
      encoding: 'utf-8',
      formidable: {
        uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
          // console.log(`name: ${name}`);
          // console.log(file);
        },
      }
    }))
    /**
     * 鉴权
     */

    // .use(koajwt(websiteConfig.jwt).unless({
    //   path: [/^(?!\/api\/verify).*$/] /*不是\/api\/verify 就不鉴权 */
    // }))
    // .use(jwtFn(websiteConfig.jwt.secret))

    /**
     * 路由
     */
    .use(router.routes())
    .use(router.allowedMethods());

}

koaInit();
start();
