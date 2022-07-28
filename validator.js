const Ajv = require("ajv/dist/2020")
const ajv = new Ajv()
const schema = require("./schemas/orders.json")

const validate = ajv.compile(schema)

const validator = (req, res, next) => { 
    const { body } = req
    console.log(body)
    const valid = validate(body)
    if(!valid) {
        res.status(408).send(validate.errors)
    }
    next()
}

module.exports = validator