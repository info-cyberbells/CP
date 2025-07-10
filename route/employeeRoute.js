// import express from 'express';
// // import { addEmployee, fetchAllEmployee,  detailEmployee, updateEmployee, deleteEmployee, login} from '../controller/employeeController.js';
// // import { login } from '../controller/authController.js';
// import { updateProfile, changePassword, uploadProfileImage, addEmployee, updateDocument, fetchAllEmployee, requestResetPassword, detailEmployee, updateEmployee, forgotPassword, verifyResetCodeAndChangePassword, deleteEmployee, login } from '../controller/employeeProfileController.js';
// import { updateProfileWeb, changePasswordWeb, uploadProfileImageWeb } from '../controller/userProfileWebController.js';
// import multer from "multer";

// const routerEmployees = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/documents');
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
//   });

//   const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//     fileFilter: (req, file, cb) => {
//       const filetypes = /pdf|jpg|jpeg|png/;
//       const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//       const mimetype = filetypes.test(file.mimetype);
//       if (extname && mimetype) {
//         return cb(null, true);
//       }
//       cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed!'));
//     }
//   }).single('document');


// // Employee Routes
// routerEmployees.post('/login', login);
// routerEmployees.post('/add', addEmployee);
// routerEmployees.get('/fetchAll', fetchAllEmployee);
// routerEmployees.get('/detail/:id', detailEmployee);
// // routerEmployees.patch('/update/:id', updateEmployee);   
// routerEmployees.delete('/delete/:id', deleteEmployee);

// routerEmployees.patch('/profile-update/:id', uploadProfileImageWeb, updateProfileWeb);
// routerEmployees.patch('/change-password/:id', changePasswordWeb);

// routerEmployees.patch('/update/:id', uploadProfileImage, updateProfile);

// routerEmployees.patch('/change/password/:id/', changePassword);


// routerEmployees.post("/requestPassword", requestResetPassword);


// routerEmployees.post("/verifyResetCode", verifyResetCodeAndChangePassword);


// routerEmployees.patch('/update/:id', upload, updateDocument);



// export default routerEmployees;


import express from 'express';
import mongoose from 'mongoose';
import { updateProfile, changePassword, uploadProfileImage, addEmployee, fetchAllEmployee, requestResetPassword, detailEmployee, updateEmployee, forgotPassword, verifyResetCodeAndChangePassword, deleteEmployee, login, sendSalarySlip } from '../controller/employeeProfileController.js';
import { updateProfileWeb, changePasswordWeb, uploadProfileImageWeb } from '../controller/userProfileWebController.js';
import { uploadDocument, getEmployeeDocuments, uploadSalarySlip } from '../controller/documentsController.js';

const routerEmployees = express.Router();

// Employee Routes
routerEmployees.post('/login', login);
routerEmployees.post('/add', addEmployee);
routerEmployees.get('/fetchAll', fetchAllEmployee);
routerEmployees.get('/detail/:id', detailEmployee);
routerEmployees.delete('/delete/:id', deleteEmployee);

// Profile and Password Routes
routerEmployees.patch('/profile-update/:id', uploadProfileImageWeb, updateProfileWeb);
routerEmployees.patch('/change-password/:id', changePasswordWeb);
routerEmployees.patch('/update/:id', uploadProfileImage, updateProfile);
routerEmployees.patch('/change/password/:id', changePassword);

// Password Reset Routes
routerEmployees.post('/requestPassword', requestResetPassword);
routerEmployees.post('/verifyResetCode', verifyResetCodeAndChangePassword);

// Document Routes
routerEmployees.patch('/document/update/:id', uploadDocument);
routerEmployees.get('/getDocuments/:employeeId', getEmployeeDocuments);
routerEmployees.patch('/uploadSalarySlip/:employeeId', uploadSalarySlip);

//Salary Slip Routes
routerEmployees.post('/sendSalarySlip', sendSalarySlip)

export default routerEmployees;