const Blog = require('../models/blog')

exports.create = async(req,res) =>{
    try {
    const blog = new Blog(req.body)
    const img = []
    if (req.files){
        req.files.forEach(e => {
            img.push(e.path)
        });
    }
    blog.backgroundImage = img
    const b1 = await blog.save()
    res.status(200).json({blog:b1})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:error
        })
    }
}

exports.get = async(req,res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).send({
          data: blogs,
          message: '  ',
        })
      } catch (error) {
        res.status(400).send('Error' + error)
      }
}

exports.delete = async (req,res) => {
  try {
    
   // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No newsletter with id: ${id}`);
    await Blog.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Newsletter deleted successfully." });
  } catch (error) {
    res.status(400).send('Error' + error)
  }
}
