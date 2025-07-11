import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    
  },
  description: {
    type: String,
    
  },


}, { timestamps: true });

const Technology = mongoose.model('Technology', technologySchema, 'Technology');

export default Technology;
