
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageUsers.vue') },
      { path: '/Auth', component: () => import('pages/PageAuth.vue') },
      { path: '/Chat', component: () => import('pages/PageChat.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
