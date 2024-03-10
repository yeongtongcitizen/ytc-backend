const User = require("../models/User");


module.exports = {

    exsisUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.snsId }, { __v: 0, createdAt: 0, updatedAt: 0, skills: 0, email: 0});
            if(user){
                res.status(200).json("exists");
            }else{
                res.status(401).json("not exists")
            }

        } catch (error) {
            res.status({status: false, error: error.message});
        }
    },

    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id, {
                $set: req.bodyc
            }, { new: true });
            const { password, __v, createdAt, ...others } = updatedUser._doc;

            res.status(200).json({ ...others });
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id)
            res.status(200).json("Successfully Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    },

  
    getUser: async (req, res) => {
        try {
            
            const user = await User.findById(req.user.id);
            const { password, __v, createdAt, ...userdata } = user._doc;
            res.status(200).json(userdata)
        } catch (error) {
            res.status(500).json(error)
        }
    },
 

    getAllUsers: async (req, res) => {
        try {
            const allUser = await User.find();

            res.status(200).json(allUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },



}