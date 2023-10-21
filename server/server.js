require ('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const port = 8000;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Live Chat Server');
});

const routes = require('./routes/index');

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});