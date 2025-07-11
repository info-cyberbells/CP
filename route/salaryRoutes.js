import express from 'express';
// import multer from 'multer';
// import path from 'path';
import {
  submitAdvanceSalaryRequest,
  getUserAdvanceRequestsById,
  getAllAdvanceSalaryRequests,
  updateAdvanceSalaryStatus,
} from '../controller/salaryController.js';

const routeSalary = express.Router();


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/salary/'); 
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, 
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only JPEG, PNG, or GIF images are allowed.'));
//     }
//   }
// });

routeSalary.post('/request', submitAdvanceSalaryRequest);
routeSalary.get('/myRequests/:id', getUserAdvanceRequestsById);
routeSalary.get('/allRequestes', getAllAdvanceSalaryRequests);
routeSalary.put('/updateRequest/:id', updateAdvanceSalaryStatus);

export default routeSalary;