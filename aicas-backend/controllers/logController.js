const Log = require("../models/Log");

exports.getLogs = async (req,res) => {

  try{

    const logs = await Log.find()
      .sort({ createdAt:-1 })
      .limit(100);

    res.json(logs);

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};