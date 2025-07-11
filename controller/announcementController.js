import Announcement from '../model/announcementModel.js';
import Employee from "../model/employeeModel.js";

// Create Announcement
export const addAnnouncement = async (req, res) => {
  try {
    const { type, description, date, createdBy } = req.body;

    const newAnnouncement = new Announcement({
      type,
      description,
      date,
      createdBy,
    });

    await newAnnouncement.save();

    res.status(201).json({ message: 'Announcement created successfully', announcement: newAnnouncement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Announcements
export const fetchAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('createdBy', 'name');

    if (!announcements) {
      return res.status(404).json({ message: 'No announcements found' });
    }

    res.status(200).json({ announcements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Announcement by ID
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate('createdBy', 'name');

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ announcement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { type, description, date } = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { type, description, date },
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement updated successfully', announcement: updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getAllEmployeesBasicDetails = async (req, res) => {
  try {
    // Get the base URL dynamically from the request
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    // Function to process image URLs
    const processImageUrl = (imagePath) => {
      if (!imagePath) return null;
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      return `${baseUrl}${imagePath}`;
    };

    const employees = await Employee.find(
      {
        status: { $ne: "0" }
      },
      "_id name dob joiningDate image"
    ).sort({ name: 1 });

    // Get current date
    const today = new Date();

    // Add base URL to image paths and conditionally include joiningDate
    const employeesWithFullUrls = employees.map(employee => {
      const employeeObj = employee.toObject();

      // Check if employee has completed at least 10 months
      let includeJoiningDate = true;

      if (employeeObj.joiningDate) {
        const joiningDate = new Date(employeeObj.joiningDate);
        const tenMonthsLater = new Date(joiningDate);
        tenMonthsLater.setMonth(joiningDate.getMonth() + 10);

        // If today is before the 10 months completion date, exclude joiningDate
        if (today < tenMonthsLater) {
          includeJoiningDate = false;
        }
      }

      const result = {
        ...employeeObj,
        image: processImageUrl(employeeObj.image)
      };

      // Remove joiningDate if employee hasn't completed 10 months
      if (!includeJoiningDate) {
        delete result.joiningDate;
      }

      return result;
    });

    res.status(200).json({
      success: true,
      data: employeesWithFullUrls
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};