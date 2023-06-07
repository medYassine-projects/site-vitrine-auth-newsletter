const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const blogSchema = new mongoose.Schema({
    creator:{type : String},
    title:{type : String},
    backgroundImage:[{type : String}],
    desc:{String}
}
)
const Blog = mongoose.model("blog",blogSchema)
module.exports=Blog;