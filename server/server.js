require ('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors')
const port = 8000;

require('./models/db');

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