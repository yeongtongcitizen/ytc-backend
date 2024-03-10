const Configuration = require("../models/Configuration")

module.exports = {
    addConfiguration: async (req, res) => {
        const newConfiguration = new Configuration(req.body);
        newConfiguration.createBy = req.user.id;
        newConfiguration.updateBy = req.user.id;

        try {
            await newConfiguration.save();
            res.status(201).json({ status: true, message: 'Configuration successfully created' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getConfigurationByCode: async (req, res) => {
        try {
            
            const configurations = await Configuration.aggregate([
                { $match: { code: req.params.code } },
                { $sample: { size: 1 } } 
            ]);

            if (!configurations) {
                return res.status(404).json({ status: false, message: 'Configuration not found' });
            }

            res.status(200).json({ status: true, data: configurations[0]});
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getConfigurationById: async (req, res) => {
        const configurationId = req.params.id;

        try {
            const configuration = await Configuration.findById(configurationId)
            .populate({
                path: 'createBy',
                select: "username profileImage"
            })

            if (!configuration) {
                return res.status(404).json({ status: false, message: 'Configuration not found' });
            }

            res.status(200).json({ status: true, data: configuration});
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getConfigurationList: async (req, res) => {
      const flag = req.params.id

        try {
            const configurations = await Configuration.find();

            res.status(200).json({ status: true, data: configurations}); 
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    

    deleteConfigurationById: async (req, res) => {
        const configurationId = req.params.id;

        try {
            const configuration = await Configuration.findByIdAndDelete(configurationId);

            if (!configuration) {
                return res.status(404).json({ status: false, message: 'Configuration not found' });
            }

            res.status(200).json({ status: true, message: 'Configuration successfully deleted' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    updateConfigurationById: async (req, res) => {
        const configurationId = req.params.id;

        try {
            const updatedConfiguration = await Configuration.findByIdAndUpdate(configurationId, req.body, { new: true, runValidators: true });

            if (!updatedConfiguration) {
                return res.status(404).json({ status: false, message: 'Configuration not found' });
            }

            res.status(200).json({ status: true, message: 'Configuration successfully updated' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },


}