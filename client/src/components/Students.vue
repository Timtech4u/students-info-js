<template>
  <div class="posts">
    <h1>Students Information Management </h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addstudent' }" class="">Add Student Info</router-link>
      </div>
      <table>
        <tr>
          <td>Firstname</td>
          <td>Lastname</td>
          <td>Email</td>
          <td>Course</td>
          <td>Age</td>
          <td>Phone</td>
          <td>Graduation</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in posts">
          <td>{{ post.firstname }}</td>
          <td>{{ post.lastname }}</td>
          <td>{{ post.email }}</td>
          <td>{{ post.course }}</td>
          <td>{{ post.age }}</td>
          <td>{{ post.phone }}</td>
          <td>{{ post.graduation }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'editstudent', params: { id: post._id } }">Edit</router-link> |
            <a href="#" @click="deletePost(post._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no students resource.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addstudent' }" class="add_post_link">Add Student Resource </router-link>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'students',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
    },
    async deletePost (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        PostsService.deletePost(id)
        $this.$router.go({
          path: '/'
        })
      })
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
