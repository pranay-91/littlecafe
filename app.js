const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const validator = require("./validator.js");
const routes = require("./routes");

app.get('/', (req, res) => {
    res.send('Hello Cafe!');
});

app.get('/schema', (_, res)=> res.sendFile(__dirname + "/schemas/orders.json"))

app.use(bodyParser.json());
app.use(validator);
app.use(routes);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

