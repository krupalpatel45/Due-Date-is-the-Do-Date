//import  u from "../Models/user.js";
const User = require("../Models/user.js")
exports.allusersRoutes = (req, res) => {
    User.find().exec((err, ud) => {
        // if(err){
        //     res.status(400).json({
        //         error:"no user found"
        //     })
        // }
        res.json(ud)
    })
}

exports.userDetails = (req, res) => {
    User.findById(req.query.userId, (err, user) => {
        if (err) 
            res.status(500).end();
        return res.status(200).json({user});
    })
}

//export {allusersRoutes}