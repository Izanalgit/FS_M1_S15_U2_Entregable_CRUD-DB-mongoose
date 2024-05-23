const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnection (){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Done : initialzing data base');
    }catch(error){
        console.error(error);
        throw new Error('Error : initialzing data base');
    }
}

module.exports = {dbConnection}
