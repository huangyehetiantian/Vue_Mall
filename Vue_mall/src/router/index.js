import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/page/Hello'

Vue.use(Router)

export default new Router({
  history: false,
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        default: Hello
      }
    }
  ]
})
