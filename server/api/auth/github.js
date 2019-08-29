const Auth = require('./auth');
const axios = require('axios');
const githubConfig = Auth.config.github;
const User = Auth.User;

const getGithubUrl = (state) => {
  return `https://github.com/login/oauth/authorize?client_id=${githubConfig.client_id}&scope=${githubConfig.user}&state=${state}`;
}
const getToken = async (code, state) => {
  const res = await axios.post("https://github.com/login/oauth/access_token",
    {
      code,
      state,
      client_id: githubConfig.client_id,
      client_secret: githubConfig.client_secret,
    },
    {
      headers: {
        Accept: "application/json"
      }
    });

  if (res.data && res.data.access_token) {
    return res.data;
  } else {
    const errmsg = res.data && res.data.error + " => " + res.data.error_description || "未知错误";
    throw new Error(errmsg);
  }
}
const getUser = async (token) => {
  const res = await axios.get("https://api.github.com/user?access_token=" + token);
  return res.data;
}

const redirect = async (ctx, next) => {
  const state = ctx.session.state = ((Math.random() * 9999999) | 0);
  ctx.redirect(getGithubUrl(state));
}
const callback = async (ctx, next) => {
  const { code, state } = ctx.query;

  const token = await getToken(code, state);

  const data = await getUser(token.access_token);

  const { id, login, avatar_url, html_url, blog, email, bio } = data;

  const user = new User({
    username: login,
    useremail: email,
    github_id: id,
    avatar: avatar_url,
    url: blog || html_url,
    bio: bio,
  });
  const userInfo = await User.thirdparty_login(user, 'github');
  ctx.session.user = userInfo;

  ctx.redirect("/close");
}


module.exports = {
  redirect,
  callback
};