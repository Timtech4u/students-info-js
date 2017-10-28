var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  course: String,
  age: Number,
  phone: Number,
  graduation : Date,
});

var Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
