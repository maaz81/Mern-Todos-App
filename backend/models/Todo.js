// const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//     title: {
//       type: String,
//       required: true
//     },
//     desc: {
//       type: String,
//     },
//   });
  
//   module.exports = mongoose.model('Todo', todoSchema);

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    createdAt:{
        type: Date,
        defautl: Date.now
    }
});

module.exports = mongoose.model('Todo', todoSchema);