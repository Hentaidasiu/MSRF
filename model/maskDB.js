const   mongoose = require('mongoose');

let MaskSchema = new mongoose.Schema({
    mask_name : String,
    mask_number : Number,
    count : String
});

module.exports = mongoose.model('mask', MaskSchema);