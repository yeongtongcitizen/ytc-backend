const Suggestion = require("../models/Suggestion")
const SuggestionReview = require("../models/SuggestionReview")

module.exports = {
    addSuggestionReview: async (req, res) => {
        const newSuggestionReview = new SuggestionReview(req.body);
        try {

            newSuggestionReview.createBy = req.user.id;
            newSuggestionReview.updateBy = req.user.id;
            await newSuggestionReview.save();

            const ratingAvg =  await SuggestionReview.aggregate([
                { $match: { suggestionId: newSuggestionReview.suggestionId} },
                { $group: { _id: null, average: { $avg: "$rating" } } } 
            ]);
  
            if( ratingAvg && ratingAvg.length > 0){
                const _ratingAvg =  Math.round(ratingAvg[0].average * 10) / 10;
                await Suggestion.findByIdAndUpdate(newSuggestionReview.suggestionId, {rating: _ratingAvg}, { new: true, runValidators: true });
            }
            
            res.status(201).json({ status: true, message: 'SuggestionReview item successfully created' });
        } catch (error) {
            console.log(" error : " + error);
            res.status(500).json(JSON.stringify(error));
        }
    },

    getSuggestionReviewById: async (req, res) => {
        const suggestionReviewId = req.params.id;

        try {
            const suggestionReview = await SuggestionReview.findById(suggestionReviewId)

            if (!suggestionReview) {
                return res.status(404).json({ status: false, message: 'SuggestionReview item not found' });
            }

            res.status(200).json(suggestionReview);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getSuggestionReviewListBySuggestion: async (req, res) => {
      const suggestionId = req.params.id

        try {
            const suggestionReviews = await SuggestionReview.find({"suggestionId": suggestionId})
            .sort({createAt: -1})
            .populate({
                path: 'createBy',
                select: "username profileImage"
            });

            res.status(200).json({ status: true, data: suggestionReviews}); 
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    
    getSuggestionReviewListByEventTop1: async (req, res) => {
        const suggestionId = req.params.id
  
          try {
              const suggestionReviews = await SuggestionReview.find({"suggestionId": suggestionId})
              .sort({createAt: -1})
              .populate({
                  path: 'createBy',
                  select: "username profileImage"
              });
  
              res.status(200).json({ status: true, data: suggestionReviews}); 
          } catch (error) {
              res.status(500).json({ status: false, message: error.message });  
          }
      }, 

    deleteSuggestionReviewById: async (req, res) => {
        const suggestionReviewId = req.params.id;

        try {

            const suggestionReview = await SuggestionReview.findById(suggestionReviewId)
            const suggestionReviewDelete = await SuggestionReview.findByIdAndDelete(suggestionReviewId);

            if (!suggestionReviewDelete) {
                return res.status(404).json({ status: false, message: 'SuggestionReview item not found' });
            }else{
                const ratingAvg =  await SuggestionReview.aggregate([
                    { $match: { suggestionId: suggestionReview.suggestionId} },
                    { $group: { _id: null, average: { $avg: "$rating" } } } 
                ]);
      
                if( ratingAvg && ratingAvg.length > 0){
                    const _ratingAvg =  Math.round(ratingAvg[0].average * 10) / 10;
                    await Suggestion.findByIdAndUpdate(suggestionReview.suggestionId, {rating: _ratingAvg}, { new: true, runValidators: true });
                }
            }

            res.status(200).json({ status: true, message: 'SuggestionReview item successfully deleted' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateSuggestionReviewById: async (req, res) => {
        const suggestionReviewId = req.params.id;

        try {
            const updatedSuggestionReview = await SuggestionReview.findByIdAndUpdate(suggestionReviewId, req.body, { new: true, runValidators: true });

            if (!updatedSuggestionReview) {
                return res.status(404).json({ status: false, message: 'SuggestionReview item not found' });
            }

            res.status(200).json({ status: true, message: 'SuggestionReview item successfully updated' });
        } catch (error) {
            res.status(500).json(error);
        }
    },


}