const Event = require("../models/Event")
const EventReview = require("../models/EventReview")

module.exports = {
    addEventReview: async (req, res) => {
        const newEventReview = new EventReview(req.body);
        try {
            newEventReview.createBy = req.user.id;
            newEventReview.updateBy = req.user.id;
            await newEventReview.save();

            console.log(" test 1 : ")
            const ratingAvg =  await EventReview.aggregate([
                { $match: { eventId: newEventReview.eventId} },
                { $group: { _id: null, average: { $avg: "$rating" } } } 
            ]);
            console.log(" test 2 : ")
  
            if( ratingAvg && ratingAvg.length > 0){
                const _ratingAvg =  Math.round(ratingAvg[0].average * 10) / 10;
                await Event.findByIdAndUpdate(newEventReview.eventId, {rating: _ratingAvg}, { new: true, runValidators: true });
            }
            console.log(" test 3 : ")

            res.status(201).json({ status: true, message: 'EventReview item successfully created' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getEventReviewById: async (req, res) => {
        const eventReviewId = req.params.id;

        try {
            const eventReview = await EventReview.findById(eventReviewId)

            if (!eventReview) {
                return res.status(404).json({ status: false, message: 'EventReview item not found' });
            }

            res.status(200).json(eventReview);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getEventReviewListByEvent: async (req, res) => {
      const eventId = req.params.id

        try {
            const eventReviews = await EventReview.find({"eventId": eventId})
            .sort({createAt: -1})
            .populate({
                path: 'createBy',
                select: "username profileImage"
            });

            res.status(200).json({ status: true, data: eventReviews}); 
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    
    getEventReviewListByEventTop1: async (req, res) => {
        const eventId = req.params.id
  
          try {
              const eventReviews = await EventReview.find({"eventId": eventId})
              .sort({createAt: -1})
              .populate({
                  path: 'createBy',
                  select: "username profileImage"
              });
  
              res.status(200).json({ status: true, data: eventReviews}); 
          } catch (error) {
              res.status(500).json({ status: false, message: error.message });  
          }
      }, 

    deleteEventReviewById: async (req, res) => {
        const eventReviewId = req.params.id;

        try {
            const eventReview = await EventReview.findById(eventReviewId)
            const eventReviewDelete = await EventReview.findByIdAndDelete(eventReviewId);

            if (!eventReviewDelete) {
                return res.status(404).json({ status: false, message: 'EventReview item not found' });
            }else{
                const ratingAvg =  await EventReview.aggregate([
                    { $match: { eventId: eventReview.eventId} },
                    { $group: { _id: null, average: { $avg: "$rating" } } } 
                ]);
      
                if( ratingAvg && ratingAvg.length > 0){
                    const _ratingAvg =  Math.round(ratingAvg[0].average * 10) / 10;
                    await Event.findByIdAndUpdate(eventReview.eventId, {rating: _ratingAvg}, { new: true, runValidators: true });
                }
            }

            res.status(200).json({ status: true, message: 'EventReview item successfully deleted' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateEventReviewById: async (req, res) => {
        const eventReviewId = req.params.id;

        try {
            const updatedEventReview = await EventReview.findByIdAndUpdate(eventReviewId, req.body, { new: true, runValidators: true });

            if (!updatedEventReview) {
                return res.status(404).json({ status: false, message: 'EventReview item not found' });
            }

            res.status(200).json({ status: true, message: 'EventReview item successfully updated' });
        } catch (error) {
            res.status(500).json(error);
        }
    },


}