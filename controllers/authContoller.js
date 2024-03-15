const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const admin = require('firebase-admin')


module.exports = {
    createUser: async (req, res) => {
        const user = req.body;
        try {

            console.log( " new user : " + JSON.stringify(user));
            const newUser = new User(req.body);

            await newUser.save();
            res.status(201).json({ status: true })
        } catch (createUserError) {
            console.log(createUserError);
             res.status(500).json({ error: 'An error occurred while creating the user.'});
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }, { __v: 0, createdAt: 0, updatedAt: 0, skills: 0, email: 0});
            !user && res.status(401).json("Wrong Login Details")
            const decrytedpass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const userToken = jwt.sign({
                id: user._id, userType: user.userType, email: user.email
            }, process.env.JWT_SEC,
                { expiresIn: "21d" });
            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, userToken });
        } catch (error) {
            res.status({status: false, error: error.message});
        }
    },

    snsLoginUser: async (req, res) => {
        try {
            console.log("1");
            const user = await User.findOne({ snsId: req.body.snsId }, { __v: 0});
            console.log(user);
            !user && res.status(200).json({ status: false, message: '존재하지 않습니다' });
            const userToken = jwt.sign({
                id: user._id, userType: user.userType, email: user.email
            }, process.env.JWT_SEC,
                { expiresIn: "21d" });
            res.status(200).json({ status: true, userToken: userToken, user: user });

        } catch (error) {
            console.log(error);
            res.status({status: false, error: error.message});
        }
    }
}