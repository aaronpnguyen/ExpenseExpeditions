const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')

// GraphQL
const {graphqlHTTP} = require('express-graphql');
const schema = require("./models/graph.model")

const app = express();
const port = 8000;

// Express, Cors, graphQL
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// GraphQL
app.use('/graphql', graphqlHTTP({schema, graphiql: true,}))

// Mongoose
require("./config/mongoose.config");

// Routes
require("./routes/user.route")(app) // User
require("./routes/finance.route")(app) // Finances

app.listen(port, () => console.log(`Listening on port: ${port}\n(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧`));