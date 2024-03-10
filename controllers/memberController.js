const Member = require("../models/Member")
const Finance = require("../models/Finance")

module.exports = {
    addMember: async (req, res) => {
        const newMember = new Member(req.body);
        newMember.createBy = req.user.id;
        newMember.updateBy = req.user.id;

        try {
            await newMember.save();
            res.status(201).json({ status: true, message: 'Member successfully created' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getMemberById: async (req, res) => {
        const memberId = req.params.id;

        try {
            const member = await Member.findById(memberId)
            .populate({
                path: 'createBy',
                select: "username profileImage"
            })

            if (!member) {
                return res.status(404).json({ status: false, message: 'Member not found' });
            }

            res.status(200).json({ status: true, data: member});
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getMemberList: async (req, res) => {
      const type = req.params.type
        try {

            console.log( type)
            if( type && type != 'all' ){
                const members = await Member.find({type:type}).sort({ord: 1});

                res.status(200).json({ status: true, data: members}); 
            }else{
                const members = await Member.find().sort({ord: 1});

                res.status(200).json({ status: true, data: members}); 
            }
            
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });  
        }
    }, 
    

    deleteMemberById: async (req, res) => {
        const memberId = req.params.id;

        try {
            const member = await Member.findByIdAndDelete(memberId);

            if (!member) {
                return res.status(404).json({ status: false, message: 'Member item not found' });
            }

            res.status(200).json({ status: true, message: 'Member item successfully deleted' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    updateMemberById: async (req, res) => {
        const memberId = req.params.id;

        try {
            const updatedMember = await Member.findByIdAndUpdate(memberId, req.body, { new: true, runValidators: true });

            if (!updatedMember) {
                return res.status(404).json({ status: false, message: 'Member item not found' });
            }

            res.status(200).json({ status: true, message: 'Member item successfully updated' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    
    getFinanceList: async (req, res) => {
   
          try {
              const finance = await Finance.find().sort({ord: 1});
  
              res.status(200).json({ status: true, data: finance}); 
          } catch (error) {
              res.status(500).json({ status: false, message: error.message });  
          }
      }, 

}