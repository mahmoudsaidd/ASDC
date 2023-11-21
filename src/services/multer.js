import multer from 'multer';

// need multer to upload excel file

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'src/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype.includes('excel')) {
//         cb(null, true);
//       } else {
//         cb(new Error('Only Excel files are allowed'), false);
//       }
//     },
//   });
  

// export default upload;

export const validationType = {
    //excel files
    EXCEL: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"],
  };
  export const HME = (err, req, res, next) => {
    if (err) {
      res.json({ message: "multer error message", err :err.message});
      // next(new Error("multer error message", {cau}));
    } else {
      next();
    }
  };
  
  export function myMulter(acceptType) {
      const storage = multer.diskStorage({});
  
    function fileFilter(req, file, cb) {
      if (acceptType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb("inavlid ", false);
      }
    }
  
    const uploads = multer({  fileFilter, storage });
  
    return uploads;
  }