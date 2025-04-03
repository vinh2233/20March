let mongoose = require('mongoose');
const slugify = require('slugify');


let categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true
    },description:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

// Tạo slug tự động trước khi lưu
categorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });

  
module.exports = mongoose.model('category',categorySchema);