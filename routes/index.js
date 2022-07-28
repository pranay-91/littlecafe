const express = require('express');
const router = express.Router();

router.post('/order', (req, res) => {
    const { body } = req;
    const { item, sugar, category } = body;

    if (item === "tea")
        res.send("Tea is brewing!!")
    if (item === "coffee" && sugar > 0)
        res.send('Barista says, "Normally coffee does not go together but thats okay!!"') 
    if (item === "coffee") 
        res.send(`Barista says, "One ${category} coming your way!"`)
    res.send(`${item} is not available in the menu!`)
});


module.exports = router;