import express from 'express';
import "./cronJobs/leaveQuotaCron.js";
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './db.js';
import router from './route/authRoute.js'; 
import routerEmployees from './route/employeeRoute.js'; 
import routerTechnologies from './route/technologyRoute.js'; 
import routerUser from './route/userRoute.js'; 
import routerStatus from './route/statusRoute.js'; 
import routerAnnouncement from './route/AnnouncementRoute.js'; 
import routerProject from './route/projectRoute.js'; 
import routerEvent from './route/eventRoute.js'; 
import routerLeaveRequest from './route/leaveRequestRoutes.js'; 
import routerTask from './route/taskRoute.js'; 
import routerAttendance from './route/attendanceRoute.js'; 
import routerHelpDesk from './route/helpDeskRoute.js'; 
import routerHoliday from './route/holidayRoute.js'; 
import departmentRoutes from "./route/departmentRoutes.js";
import routeSalary from './route/salaryRoutes.js';
import handbookRoutes from './route/handbookRoutes.js'



import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
dotenv.config();
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cors());

// Use import.meta.url and fileURLToPath to get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', router); 
app.use('/api/employee', routerEmployees); 
app.use('/api/announcement', routerAnnouncement); 
app.use('/api/event', routerEvent); 
app.use('/api/leave', routerLeaveRequest); 
app.use('/api/task', routerTask); 
app.use('/api/attendance', routerAttendance); 
app.use('/api/help/desk', routerHelpDesk); 
app.use('/api/holiday', routerHoliday); 

app.use('/api/user', routerUser); 
app.use('/api/technology', routerTechnologies); 
app.use('/api/status', routerStatus); 
app.use('/api/projects', routerProject); 
app.use("/api/department", departmentRoutes);
app.use("/api/salary", routeSalary);
app.use("/api/handbook", handbookRoutes);


const PORT = process.env.PORT || 4040

;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
