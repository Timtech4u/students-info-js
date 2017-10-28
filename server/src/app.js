const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");

app.get('/posts', (req, res) => {
  Post.find({}, 'firstname lastname email course age phone graduation', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

app.post('/add_post', (req, res) => {
	var db = req.db;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var course = req.body.course;
	var age = req.body.age;
	var phone = req.body.phone;
	var graduation = req.body.graduation;
	
	var new_post = new Post({
		firstname: firstname,
		lastname: lastname,
		email: email,
		course: course,
		age: age,
		phone: phone,
		graduation: graduation
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

app.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'firstname lastname email course age phone graduation', function (error, post) {
	  if (error) { console.error(error); }

	  post.firstname = req.body.firstname;
	  post.lastname = req.body.lastname;
	  post.email = req.body.email;
	  post.course = req.body.course;
	  post.age = req.body.age;
	  post.phone = req.body.phone;
	  post.graduation = req.body.graduation;

	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'firstname lastname email course age phone graduation', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

app.listen(process.env.PORT || 8081)
