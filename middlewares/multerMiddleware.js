// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination : (req,file,callback)=>{
//         callback(null,'./uploads') 
//     },
//     filename:(req,file,callback)=>{
//         callback(null,`image-${Date.now()}-${file.originalname}`)
//     }
// })

// const multerMiddleware = multer({
//     storage
// })

// module.exports = multerMiddleware

const multer = require('multer');
const storage = multer.diskStorage({
  destination : (req,file,callback)=>{
        callback(null,'./uploads') 
        },
        filename:(req,file,callback)=>{
            callback(null,`image-${Date.now()}-${file.originalname}`)
        }
});
const upload = multer({ storage: storage });

// Middleware to handle specific file fields
const multerMiddleware = upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]);

module.exports = multerMiddleware