const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "login", component: () => import("pages/Login.vue") }
    ]
  },
  {
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Dashboard.vue") },
      { path: "users", component: () => import("pages/UsersManagment.vue") },
      { path: "exercises", component: () => import("pages/Exercises.vue") }
    ],
    meta: { requiresAuth: true }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error.vue")
  }
]

export default routes