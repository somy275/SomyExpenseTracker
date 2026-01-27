import multer from "multer";
console.log("ok");
const storage = multer.diskStorage({  //Configure storage
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

//File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        
        cb(null,true)
    }
    else {
        cb(new Error("only .jpeg, .png and .jpg formats are allowed"))
    }
}

export const upload = multer({
    storage, fileFilter
})
