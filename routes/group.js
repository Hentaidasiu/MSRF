const   express = require('express'),
        router = express.Router(),
        mongoose = require("mongoose"),
        multer = require('multer'),
        path = require('path'),
        fs = require('fs'),
        moment = require('moment'),
        util = require('util');
const   mask = require('../model/maskDB');
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null,path.basename(file.originalname,path.extname(file.originalname))+'-'+Date.now()+ path.extname(file.originalname));
    }
});
const imageFilter = function(req, file, cb){
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.pptx' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.docx'  && ext !== '.pdf'&& ext !== '.xlxs'){
        return cb(new Error('Only image is allowed'), false)
        }
        cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFilter})

/*-------------------------------------------*/
router.get("/", async function (req, res) {
    let response = await mask.aggregate([
        {
            $match: {
                "count" : "1"
            }
        }
    ])
    console.log(response)
    res.render("landing",{info: response});
})
router.put("/:id", async function (req, res) {
    let n_name = req.body.name;
    let n_number = req.body.number;
    var n_mask = {mask_name:n_name,mask_number:n_number};
    mask.findByIdAndUpdate(req.params.id, n_mask, function(error,update){
        if(error){
            console.log(error)
        }else{
            req.flash('success','saved')
            res.redirect('/')
        }
    })
})

module.exports = router;