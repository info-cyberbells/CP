import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  
  type: { 
    type: String, 
   
    required: true 
  },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // Admin/Manager who created it
  createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema, "Announcement");

export default Announcement;

