const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
const port = 8000;

// Express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Mongoose
require("./config/mongoose.config");

// Routes
require("./routes/user.route")(app)

app.listen(port, () => console.log(`Listening on port: ${port}\n(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧`));