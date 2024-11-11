const inverterModel = require("../models/inverterSchema");
exports.createInverter = async (req, res) => {
    try {
      const { plant_id,inverter_id, inverter_name, capacity_kw, status } = req.body;
      const newInverter = new inverterModel({
        plant_id,
        inverter_id,
        inverter_name,
        capacity_kw,
        status
      });
  
      const savedInverter = await newInverter.save();
      res.status(201).json({ message: "Inverter created successfully", data: savedInverter });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating inverter", error: err.message });
    }
  };
  
  // Get all inverters
  exports.getAllInverters = async (req, res) => {
    try {
      const inverters = await inverterModel.find().populate("plant_id", "plant_name capacity_kw"); // Populating the plant data
      res.status(200).json({ message: "Inverters fetched successfully", data: inverters });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching inverters", error: err.message });
    }
  };
  
  // Get a single inverter by ID
  exports.getInverterById = async (req, res) => {
    try {
      const { id } = req.params;
      const inverter = await inverterModel.findById(id).populate("plant_id", "plant_name capacity_kw");
  
      if (!inverter) {
        return res.status(404).json({ message: "Inverter not found" });
      }
  
      res.status(200).json({ message: "Inverter fetched successfully", data: inverter });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching inverter", error: err.message });
    }
  };
  
  // Update an inverter by ID
  exports.updateInverter = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedInverter = await inverterModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedInverter) {
        return res.status(404).json({ message: "Inverter not found" });
      }
  
      res.status(200).json({ message: "Inverter updated successfully", data: updatedInverter });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating inverter", error: err.message });
    }
  };
  
  // Delete an inverter by ID
  exports.deleteInverter = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedInverter = await inverterModel.findByIdAndDelete(id);
  
      if (!deletedInverter) {
        return res.status(404).json({ message: "Inverter not found" });
      }
  
      res.status(200).json({ message: "Inverter deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting inverter", error: err.message });
    }
  };
  