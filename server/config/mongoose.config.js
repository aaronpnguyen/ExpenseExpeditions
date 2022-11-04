const mongoose = require("mongoose");
require('dotenv').config();
const DATABASE = process.env.MYDATABASE

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established a connection to ${DATABASE}!`))
    .catch(error => console.log(`Something went wrong when connecting to the database `, error))