<template>
  <div class="posts">
    <h1>Edit Student Info</h1>
      <div class="form">
        <div>
          <input type="text"  placeholder="firstname" v-model="firstname">
        </div>
        <div>
          <input type="text"  placeholder="lastname" v-model="lastname">
        </div>
        <div>
          <input type="text"  placeholder="email" v-model="email">
        </div>
        <div>
          <input type="text"  placeholder="course" v-model="course">
        </div>
        <div>
          <input type="number"  placeholder="age" v-model="age">
        </div>
        <div>
          <input type="number"  placeholder="phone" v-model="phone">
        </div>
        <div>
          <input type="date"  placeholder="graduation" v-model="graduation">
        </div>
        <div>
          <button class="app_post_btn" @click="updatePost">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'editstudent',
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      course: '',
      age: '',
      phone: '',
      graduation: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.firstname = response.data.firstname
      this.lastname = response.data.lastname
      this.email = response.data.email
      this.course = response.data.course
      this.age = response.data.age
      this.phone = response.data.phone
      this.graduation = response.data.graduation
    },
    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        course: this.course,
        age: this.age,
        phone: this.phone,
        graduation: this.graduation
      })
      this.$swal(
        'Great!',
        `Student Resource post has been updated!`,
        'success'
      )
      this.$router.push({ name: 'students' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>

