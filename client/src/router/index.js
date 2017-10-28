import Vue from 'vue'
import Router from 'vue-router'
import Students from '@/components/Students'
import AddStudent from '@/components/AddStudent'
import EditStudent from '@/components/EditStudent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'students',
      component: Students
    },
    {
      path: '/students/add',
      component: AddStudent,
      name: 'addstudent'
    },
    {
      path: '/posts/:id/edit',
      component: EditStudent,
      name: 'editstudent'
    }
  ]
})
