import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Notebooks from '@/components/Notebooks'
import NoteDetail from '@/components/NoteDetail'
import Trash from '@/components/Trash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notebooks',
      name: 'Notebooks',
      component: Notebooks
    },
    {
      path: '/notedetail/:noteID',
      name: 'NoteDetail',
      component: NoteDetail
    },
    {
      path: '/trash',
      name: 'Trash',
      component: Trash
    },
  ]
})
