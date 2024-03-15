const Event = require("../models/Event")
const EventJoin = require("../models/EventJoin")

module.exports = {
    addEvent: async (req, res) => {
        const newEvent = new Event(req.body);
        newEvent.createBy = req.user.id;
        newEvent.updateBy = req.user.id;

        try {

            if( !newEvent.type){
                newEvent.type = 'Featured';
            }

            await newEvent.save();
            res.status(201).json({ status: true, message: 'Event successfully created' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addEventJoin: async (req, res) => {
        const newEventJoin = new EventJoin(req.body);
        newEventJoin.createBy = req.user.id;

        try {
            await newEventJoin.save();
            res.status(201).json({ status: true, message: 'Event Join successfully created' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    isEvetnJoinByUser: async (req, res) => {
        try {
            let eventJoin = await EventJoin.findOne({eventId:req.params.eventId, createBy:req.user.id})
            
            if (!eventJoin) {
                return res.status(200).json({ status: true, data: {joined:false}} );
            }else{
                eventJoin.joined = true;
                return res.status(200).json({ status: true, data: {joined:true}} );
            }

            res.status(200).json(eventJoin);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getEventById: async (req, res) => {
        const eventId = req.params.id
        try {
            const event = await Event.findById(eventId)
            .populate({
                path: 'createBy',
                select: "username profileImage"
            })
            .populate("joinUser").lean()
            .populate({
                path: "joinUser", 
                populate: {
                    path: 'createBy',
                    select: "username profileImage"
                }
             })
             .populate({
                path: "attendUser", 
                populate: {
                    path: 'createBy',
                    select: "username profileImage"
                }
             })
            
            

            if (!event) {
                return res.status(404).json({ status: false, message: 'Event item not found' });
            }

            res.status(200).json(event);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getEventList: async (req, res) => {
        
        const type = req.params.type

        try {

            console.log( " event type : " + type);

            if( !type){
                console.log(" all ")
                const events = await Event.find({type: 'Featured'})
                .populate("joinUser").lean()
                .populate({
                    path: "joinUser", 
                    populate: {
                        path: 'createBy',
                        select: "username profileImage"
                    }
                 })
                 .populate({
                    path: "attendUser", 
                    populate: {
                        path: 'createBy',
                        select: "username profileImage"
                    }
                 })
                 .sort({startAt: -1})
                 res.status(200).json({ status: true, data: events}); 
            }else{
                const events = await Event.find({type: type})
                .populate("joinUser").lean()
                .populate({
                    path: "joinUser", 
                    populate: {
                        path: 'createBy',
                        select: "username profileImage"
                    }
                 })
                 .populate({
                    path: "attendUser", 
                    populate: {
                        path: 'createBy',
                        select: "username profileImage"
                    }
                 })
                 .sort({startAt: -1})
                 res.status(200).json({ status: true, data: events}); 
            }
            

            
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    

    deleteEventById: async (req, res) => {
        const eventId = req.params.id;

        try {
            const event = await Event.findByIdAndDelete(eventId);

            if (!event) {
                return res.status(404).json({ status: false, message: 'Event item not found' });
            }

            res.status(200).json({ status: true, message: 'Event item successfully deleted' });
        } catch (error) {
            res.status(500).json(error);
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