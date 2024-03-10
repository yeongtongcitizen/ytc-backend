const Driver = require('../models/Driver')

module.exports = {
    registerDriver: async (req, res) => {
        console.log("-----hit register driver----");
        const userId = req.user.id;
        const newDriver = new Driver({
            driver: userId, 
            vehicleType: req.body.vehicleType,
            phone: req.body.phone,
            vehicleNumber: req.body.vehicleNumber,
            currentLocation: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
        });
    
        try {
            await newDriver.save();
            res.status(201).json({ status: true, message: 'Driver successfully added', data: newDriver });
        } catch (error) {
            res.status(500).json({ message: 'Error adding driver', error: error.message });
        }
    },    

    getDriverDetails: async (req, res) => {
        const driverId = req.user.id;
    
        try {
            const driver = await Driver.find({driver: driverId})
            if (driver) {
                res.status(200).json({ status: true, data: driver });
            } else {
                res.status(404).json({ status: false, message: 'Driver not found' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateDriverDetails: async (req, res) => {
        const driverId  = req.params.id;
    
        try {
            const updatedDriver = await Driver.findByIdAndUpdate(driverId, req.body, { new: true });
            if (updatedDriver) {
                res.status(200).json({ status: true, message: 'Driver details updated successfully' });
            } else {
                res.status(404).json({ status: false, message: 'Driver not found' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteDriver: async (req, res) => {
        const driverId = req.params.id;
    
        try {
            await Driver.findByIdAndDelete(driverId);
            res.status(200).json({ status: true, message: 'Driver deleted successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    setDriverAvailability: async (req, res) => {
        const driverId  = req.params.id;
    
        try {
            const driver = await Driver.findById(driverId);
            if (!driver) {
                res.status(404).json({ status: false, message: 'Driver not found' });
                return;
            }
    
            // Toggle the availability
            driver.isAvailable = !driver.isAvailable;
            await driver.save();
    
            res.status(200).json({ status: true, message: `Driver is now ${driver.isAvailable ? 'available' : 'unavailable'}`, data: driver });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
}