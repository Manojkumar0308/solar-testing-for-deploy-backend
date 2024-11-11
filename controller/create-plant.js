const SolarPlant = require('../models/solarPlantModel');
// Create a new solar plant
exports.createSolarPlant = async (req, res) => {
    try {
      const { customer_id, plant_name, plant_id, capacity_kw, location, status } = req.body;
      const newSolarPlant = new SolarPlant({
        customer_id,
        plant_name,
        plant_id,
        capacity_kw,
        location,
        status
      });
  
      const savedPlant = await newSolarPlant.save();
      res.status(200).json({ message: "Solar plant created successfully", data: savedPlant });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating solar plant", error: err.message });
    }
  };
  
  // Get all solar plants
  exports.getAllSolarPlants = async (req, res) => {
    try {
      const plants = await SolarPlant.find().populate("customer_id", "name email"); // Populating the customer data
      res.status(200).json({ message: "Solar plants fetched successfully", data: plants });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching solar plants", error: err.message });
    }
  };
  
  // Get a single solar plant by ID
  exports.getSolarPlantById = async (req, res) => {
    try {
      const { id } = req.params;
      const plant = await SolarPlant.findById(id).populate("customer_id", "name email");
  
      if (!plant) {
        return res.status(404).json({ message: "Solar plant not found" });
      }
  
      res.status(200).json({ message: "Solar plant fetched successfully", data: plant });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching solar plant", error: err.message });
    }
  };
  
  // Update a solar plant by ID
  exports.updateSolarPlant = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedPlant = await SolarPlant.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedPlant) {
        return res.status(404).json({ message: "Solar plant not found" });
      }
  
      res.status(200).json({ message: "Solar plant updated successfully", data: updatedPlant });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating solar plant", error: err.message });
    }
  };
  
  // Delete a solar plant by ID
  exports.deleteSolarPlant = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPlant = await SolarPlant.findByIdAndDelete(id);
  
      if (!deletedPlant) {
        return res.status(404).json({ message: "Solar plant not found" });
      }
  
      res.status(200).json({ message: "Solar plant deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting solar plant", error: err.message });
    }
  };