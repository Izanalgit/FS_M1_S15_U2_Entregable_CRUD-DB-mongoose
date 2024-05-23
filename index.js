const express = require('express');
const {dbConnection} = require('./config/config');

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();

dbConnection();

app.use(express.json());

app.use('/',require('./routes/tasks'));

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))