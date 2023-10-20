const app = require('express')();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Live Chat Server');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});