
function randomCode() {
  return (Math.random() * (999999 - 100000) | 0) + 100000;
}
async function sendCode(code) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve({ code: 0 });
    }, 300);
  });
}

const code = async (ctx, next) => {
  const { phone } = ctx.query;
  console.log(phone);
  // TODO 获取验证码
  // TODO 1。校验手机号
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    throw new Error("手机号验证失败");
  }
  // 1.1 验证在60秒内是否已经获取过
  const validation = ctx.session.validation;
  if (validation) {
    const v = validation;
    // 如果失效时间大于现在时间 说明验证码未超时 等待超时再获取
    if (v.now > Date.now()) {
      throw new Error("请等待超时后再获取");
    }
  }
  // 2.生成验证码
  const _v = {
    now: 0,
    code: randomCode(),
    phone: phone,
  };
  // 3.发送验证码
  // TODO 手机短信发送 暂不发送 直接返回 延迟一下，，，
  const { code } = await sendCode(_v.code);
  // 4.返回请求
  if (code !== 0) {
    throw new Error("验证码发送出错，请再试一次");
  }

  _v.now = Date.now() + 59 * 1000;
  ctx.session.validation = _v;

  ctx.body = {
    code: 0,
    data: {
      _v
    }
  }
}

module.exports = {
  code
}