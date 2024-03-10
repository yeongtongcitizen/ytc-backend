const EventFile = require("../models/EventFile")
const Great = require("../models/Great")

module.exports = {
    uploadEventFiles: async (req, res) => {
        const files = req.files;
        if (!files) {
          return res.status(400).json({
            success: false,
            message: "Dosya Yüklenemedi.",
          });
        }
        return res.status(200).json({
          success: true,
          message: "파일업로드 성공",
          file: files,
        });
      },

    addEventFile: async (req, res) => {
        const newEventFile = new EventFile(req.body);
        try {
            newEventFile.createBy = req.user.id;
            newEventFile.updateBy = req.user.id;
            await newEventFile.save();
            res.status(201).json({ status: true, message: 'EventFile item successfully created' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getEventFileById: async (req, res) => {
        const eventFileId = req.params.id;

        try {
            const eventFile = await EventFile.findById(eventFileId)

            if (!eventFile) {
                return res.status(404).json({ status: false, message: 'EventFile item not found' });
            }

            res.status(200).json(eventFile);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getEventFileListByEvent: async (req, res) => {
      const eventId = req.params.id

        try {
            const eventFiles = await EventFile.find({"eventId": eventId}).sort({createAt:-1})
            .populate({
                path: 'createBy',
                select: "username profileImage"
            })
            res.status(200).json({ status: true, data: eventFiles}); 
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 

    getEventFileList: async (req, res) => {

        try {
            const eventFiles = await EventFile.find().sort({createAt:-1});
            res.status(200).json({ status: true, data: eventFiles}); 
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    
    deleteEventFileById: async (req, res) => {
        const eventFileId = req.params.id;

        try {

            const eventFile = await EventFile.deleteOne({_id:eventFileId, createBy: req.user.id});

            console.log(eventFile)

            if (eventFile && eventFile.deletedCount > 0) {
                res.status(200).json({ status: true, message: '활동 기록이 정상적으로 삭제되었습니다' });
            }else{
                return res.status(200).json({ status: false, message: '활동기록이 존재하지 않거나 본인만 삭제가능합니다' });
            }

           
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateEventFileById: async (req, res) => {
        const eventFileId = req.params.id;

        try {
            const updatedEventFile = await EventFile.findByIdAndUpdate(eventFileId, req.body, { new: true, runValidators: true });

            if (!updatedEventFile) {
                return res.status(404).json({ status: false, message: 'EventFile item not found' });
            }

            res.status(200).json({ status: true, message: 'EventFile item successfully updated' });
        } catch (error) {
            res.status(500).json(error);
        }
    },


}