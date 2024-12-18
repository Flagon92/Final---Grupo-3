const express = require('express');
const app = express();

// upload file
const fileUpload = async(req, res, err) => {

    const file = req.file;    

    // console.log(req.file);
    
    return res.status(200).json({
        ok: true,
        file
    })
};

module.exports = {
    fileUpload,

};