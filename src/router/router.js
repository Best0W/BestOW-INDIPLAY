/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

Vue.use(VueRouter);

const adminCheck = (to, from, next) => {
  if (!store.state.user) {
    if (to.path !== "/") return next("/");
  } else {
    if (store.state.claims.level > 0) throw alert("Admin Page");
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/stream",
    name: "stream",
    component: () =>
      import(/* webpackChunkName: "stream" */ "../views/Stream.vue")
  },
  {
    path: "/upload",
    name: "upload",
    component: () =>
      import(/* webpackChunkName: "upload" */ "../views/Upload.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.user) return next("/");
      next();
    }
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/Calendar.vue")
  },
  {
    path: "/community",
    name: "community",
    component: () =>
      import(/* webpackChunkName: "community" */ "../views/Community.vue")
  },
  {
    path: "/admin/users",
    name: "users",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin/users.vue"),
    beforeEnter: adminCheck
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/Mypage.vue")
  },
  {
    path: "/create/:contentId?",
    name: "create",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../components/community/Create.vue")
  },
  {
    path: "/detail/:contentId",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../components/community/Detail.vue")
  },
    {
    path: "/edit/:contentId",
    name: "edit",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../components/community/Edit.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
