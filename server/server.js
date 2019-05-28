const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

app.use(cors());

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb+srv://blaker1136:ATYoyoyo55@cluster0-f3lbr.mongodb.net/lyricaldb?retryWrites=true';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config.js');
// app.use(webpackMiddleware(webpack(webpackConfig)));

// module.exports = app;



const PORT = process.env.PORT || 4000;

app.listen(PORT);
