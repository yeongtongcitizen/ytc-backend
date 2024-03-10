const EventAttend = require("../models/EventAttend")

module.exports = {
    addEventAttend: async (req, res) => {
        const newEventAttend = new EventAttend(req.body);
        newEventAttend.createBy = req.user.id;
        newEventAttend.userId = req.user.id;

        try {
            const eventAttend = await EventAttend.findOne({eventId: newEventAttend.eventId, userId:req.user.id});
            console.log(' attend : ' + JSON.stringify(eventAttend));
            if(!eventAttend){
                await newEventAttend.save();
                res.status(201).json({ status: true, message: 'Event Attend successfully created' });
            }else{
                await EventAttend.findByIdAndDelete(eventAttend._id);
                res.status(200).json({ status: true, message: 'Event Attend successfully deleted' });
            }
            
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getEventAttendByEventId: async (req, res) => {
        try {
            const eventAttend = await EventAttend.findOne({eventId:req.params.eventId, userId:req.user.id})
            
            if (!eventAttend) {
                return res.status(200).json({ status: true, data: {attended:false}} );
            }else{
                return res.status(200).json({ status: true, data: eventAttend});
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getEventAttendById: async (req, res) => {
        const eventAttendId = req.params.id;
        try {
            const eventAttend = await EventAttend.findOne({eventId: eventAttendId})
            .populate({
                path: 'userId',
                select: "username profileImage"
            })
            

            if (!eventAttend) {
                return res.status(404).json({ status: false, message: 'Event Attend not found' });
            }

            return res.status(200).json({ status: false, data:eventAttend});
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getEventAttendList: async (req, res) => {
        try {
            const eventAttends = await EventAttend.find({eventId:req.params.eventId})
            .populate({
                path: 'userId',
                select: "username profileImage"
            })
             .sort({startAt: -1})

            res.status(200).json({ status: true, data: eventAttends}); 
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    
    deleteEventAttendById: async (req, res) => {
        const eventAttendId = req.params.id;

        try {
            const eventAttend = await EventAttend.findByIdAndDelete(eventAttendId);

            if (!eventAttend) {
                return res.status(404).json({ status: false, message: 'Event Attend not found' });
            }

            res.status(200).json({ status: true, message: 'Event Attend successfully deleted' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    updateEventById: async (req, res) => {
        const eventId = req.params.id;

        try {
            const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true, runValidators: true });

            if (!updatedEvent) {
                return res.status(404).json({ status: false, message: 'Event item not found' });
            }

            res.status(200).json({ status: true, message: 'Event item successfully updated' });
        } catch (error) {
            res.status(500).json(error);
        }
    },


}