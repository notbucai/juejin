export const state = () => ({
  navs: [
    {
      name: "首页",
      url: "/timeline/recommended"
    },
    {
      name: "沸点",
      url: "/pins/recommended"
    },
    {
      name: "话题",
      url: "/topics"
    },
    {
      name: "小册",
      url: "/books"
    }
  ],
  user: null,
  current_show_auth: 0
});

export const mutations = {
  current_show_auth(state, auth) {
    state.current_show_auth = auth;
  },
  user(state, user) {
    state.user = user;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.user) {
      commit('user', req.session.user)
    }
  },
  change_current_show_auth({ commit }, auth) {

    switch (auth) {
      case 1:
      case 2:
      case 0:
        commit('current_show_auth', auth);
        break;
      default:
        break;
    }

  },
  login({ commit }, user) {
    commit("user", user);
    localStorage.setItem('user', JSON.stringify(user));
  }
};