import Technology from '../model/technologyModel.js';

export const addTechnology = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create a new Technology
    const newTechnology = new Technology({
      name,
      description
    });

    // Save the Technology to the database
    const savedTechnology = await newTechnology.save();

    // Create a response object without sensitive information (if needed)
    const TechnologyWithoutSensitiveInfo = {
      _id: savedTechnology._id,
      name: savedTechnology.name,
      description: savedTechnology.description
    };

    // Send a success response
    res.status(201).json({ success: true, data: [TechnologyWithoutSensitiveInfo] });
  } catch (error) {
    // Handle any errors
    res.status(400).json({ success: false, error: error.message });
  }
};



export const fetchAllTechnology = async (req, res) => {
  try {
    const technologies = await Technology.find(); // Fetch all technologies
    res.status(200).json({ success: true, data: technologies });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const detailTechnology = async (req, res) => {
  try {
    const { id } = req.params;

    // Use a different variable name for the fetched technology
    const technology = await Technology.findById(id); // Fetch Technology by ID

    if (!technology) {
      return res.status(404).json({ success: false, error: 'Technology not found' });
    }

    res.status(200).json({ success: true, data: [technology] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const updateTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedTechnology = await Technology.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    if (!updatedTechnology) {
      return res.status(404).json({ success: false, error: 'Technology not found' });
    }

    res.status(200).json({ success: true, data: [updatedTechnology] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};



  // Delete Technology by ID
export const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTechnology = await Technology.findByIdAndDelete(id);

    if (!deletedTechnology) {
      return res.status(404).json({ error: 'Technology not found' });
    }

    res.status(200).json({ message: 'Technology deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  
