const Suggestion = require("../models/Suggestion")
const uuid4 = require("uuid4");

module.exports = {
    addSuggestion: async (req, res) => {
        const newSuggestion = new Suggestion(req.body);
        newSuggestion.id = uuid4()
        newSuggestion.createBy = req.user.id;
        newSuggestion.updateBy = req.user.id;


        try {
            await newSuggestion.save();
            res.status(201).json({ status: true, message: 'Suggestion successfully created' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getSuggestionById: async (req, res) => {
        const suggestionId = req.params.id;

        try {
            const suggestion = await Suggestion.findById(suggestionId)
            .populate({
                path: 'createBy',
                select: "username profileImage"
            })

            if (!suggestion) {
                return res.status(404).json({ status: false, message: 'Suggestion not found' });
            }

            res.status(200).json({ status: true, data: suggestion});
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getSuggestionList: async (req, res) => {
        
        let type = req.params.type
        console.log("suggestion type :  " + type);
        try {
            let suggestions;
            if( !type ){
                console.log("suggestion all ");
                suggestions = await Suggestion.find()
                .populate({
                    path: 'createBy',
                    select: "username profileImage"
                })
                .populate("great").lean()
                .populate({
                    path: "great", 
                    populate: {
                        path: 'createBy',
                        select: "username profileImage"
                    }
                 })
                .sort({createAt: -1});
            }else{
                suggestions = await Suggestion.find({type: type})
                .populate({
                    path: 'createBy',
                    select: "username profileImage"
                })
                .populate("great").lean()
                .populate({
                    path: "great", 
                    populate: {
                        path: 'createBy',
                        select: "username profileImage"
                    }
                 })
                .sort({createAt: -1});
            }
            

            res.status(200).json({ status: true, data: suggestions}); 
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    

    deleteSuggestionById: async (req, res) => {
        const suggestionId = req.params.id;

        try {
            const suggestion = await Suggestion.findByIdAndDelete(suggestionId);

            if (!suggestion) {
                return res.status(404).json({ status: false, message: 'Suggestion item not found' });
            }

            res.status(200).json({ status: true, message: 'Suggestion item successfully deleted' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    updateSuggestionById: async (req, res) => {
        const suggestionId = req.params.id;

        try {
            const updatedSuggestion = await Suggestion.findByIdAndUpdate(suggestionId, req.body, { new: true, runValidators: true });

            if (!updatedSuggestion) {
                return res.status(404).json({ status: false, message: 'Suggestion item not found' });
            }

            res.status(200).json({ status: true, message: 'Suggestion item successfully updated' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },


}