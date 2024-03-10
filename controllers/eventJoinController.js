const EventJoin = require("../models/EventJoin")

module.exports = {
    addEventJoin: async (req, res) => {
        const newEventJoin = new EventJoin(req.body);
        newEventJoin.createBy = req.user.id;
        newEventJoin.userId = req.user.id;

        try {
            console.log(' param : ' + JSON.stringify({eventId:newEventJoin.eventId, userId:req.user.id}));

            const eventJoin = await EventJoin.findOne({eventId:newEventJoin.eventId, userId:req.user.id})
            console.log(" join : " + JSON.stringify(eventJoin));
            if( !eventJoin ){
                await newEventJoin.save();
                res.status(201).json({ status: true, message: 'Event Join successfully created' });
            }else{
                await EventJoin.findByIdAndDelete(eventJoin._id);
                res.status(200).json({ status: false, message: "Event Join successfully deleted" }); 
            }

            
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getEventJoinByEventId: async (req, res) => {
        try {
            const eventJoin = await EventJoin.findOne({eventId:req.params.eventId, userId:req.user.id})
            
            if (!eventJoin) {
                return res.status(200).json({ status: true, data: {joined:false}} );
            }else{
                return res.status(200).json({ status: true, data: eventJoin});
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getEventJoinById: async (req, res) => {
        const eventJoinId = req.params.id;
        try {
            const eventJoin = await EventJoin.findOne({eventId: eventJoinId})
            .populate({
                path: 'userId',
                select: "username profileImage"
            })
            

            if (!eventJoin) {
                return res.status(404).json({ status: false, message: 'Event Join not found' });
            }

            return res.status(200).json({ status: false, data:eventJoin});
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getEventJoinList: async (req, res) => {
        try {
            const eventJoins = await EventJoin.find({eventId:req.params.eventId})
            .populate({
                path: 'userId',
                select: "username profileImage"
            })
             .sort({startAt: -1})

            res.status(200).json({ status: true, data: eventJoins}); 
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    
    deleteEventJoinById: async (req, res) => {
        const eventJoinId = req.params.id;

        try {
            const eventJoin = await EventJoin.findByIdAndDelete(eventJoinId);

            if (!eventJoin) {
                return res.status(404).json({ status: false, message: 'Event Join not found' });
            }

            res.status(200).json({ status: true, message: 'Event Join successfully deleted' });
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