const User = require("../Models/user.js")

exports.deleteuserbyid = (req,res) => {
    User.findByIdAndDelete(req.body.id)
    .then((deletedUser) => {
        console.log(`Deleted user: ${deletedUser}`);
    })
    .catch((error) => {
    console.log(`Error deleting user: ${error}`);
    });
}

exports.deleteuserbyname_email = (req,res) => {
    User.findOneAndDelete({"name":req.body.name,"lastname":req.body.lastname,"email":req.body.email})
    .then((deletedUser) => {
        res.send(`Deleted user: ${deletedUser}`)
    })
    .catch((error)=>{
        res.send(`Error deleting user: ${error}`)
    })
}