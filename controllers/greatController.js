const Great = require("../models/Great")

module.exports = {
    addGreat: async (req, res) => {
        const newGreat = new Great(req.body);
        newGreat.createBy = req.user.id;
        newGreat.userId = req.user.id;

        try {
            
            console.log(' Great AddStart');
            console.log(' Great body : ' + JSON.stringify(req.body));

            const great = await Great.findOne({targetId:req.body.targetId, targetSource:req.body.targetSource, userId:req.user.id})

            console.log(" grate : " + JSON.stringify(great));

            if( !great ){
                await newGreat.save();
                console.log(" add ");
                res.status(201).json({ status: true, data:"add",  message: 'Great successfully created' });
            }else{
                console.log(" delete  ");
                const great = await Great.findOneAndDelete({targetId:req.body.targetId, targetSource:req.body.targetSource, userId:req.user.id});
                console.log(" delete :  " + JSON.stringify(great));

                res.status(201).json({ status: true, data:"delete", message: 'Great successfully delete' });
            }

            
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getGreatSum: async (req, res) => {
        try {

            console.log(' Great getGreat Sum Start');
            const great = await Great.aggregate([
                { $match: { targetId: req.body.targetId, targetSource: req.body.targetSource  } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);

            res.status(200).json({ status: true, great }); 
            
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },

    getGreatByUser: async (req, res) => {
        try {
            const great = await Great.findOne({targetId:req.body.targetId, targetSource:req.body.targetSource, userId:req.user.id})
            
            if (!great) {
                return res.status(200).json({ status: true, data: null}  );
            }else{
                return res.status(200).json({ status: true, data: great});
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },
   
    deleteGreatById: async (req, res) => {
        const greatId = req.params.id;

        try {
            const great = await Great.findByIdAndDelete(greatId);

            if (!great) {
                return res.status(404).json({ status: false, message: 'Great not found' });
            }

            res.status(200).json({ status: true, message: 'Great successfully deleted' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    },


}