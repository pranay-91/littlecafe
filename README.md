# Little cafe

A basic node express app to simulate schema validation.

It includes a middlware that validates the request body and returns validation error if payload does not conform to the schema. Otherwise it will continue the request to the next route/middleware.

Library being used:
- [Express](https://expressjs.com)
- [ajv](https://ajv.js.org)
- Read about [JSON Schema](https://json-schema.org)
- [JSON schema builder tool](https://json-everything.net/json-path)

We are using draft version: `Draft 2020-12`


## Feature 
You can order a coffee or a tea from the cafe by using following requests
1. A perfect coffee order  -> `POST /order`

```json
{
    "item": "coffee",
    "category": "latte",
    "sugar": 0,
    "milk": "yes"
}
```
You will get a response 
```
Barista says, "One latte coming your way!"
```

2. A non ideal coffee order -> `POST /order` 
```json
{
    "item": "coffee",
    "category": "latte",
    "sugar": 2,
    "milk": "yes"
}
```
You will get a response
```
Barista says, "Normally coffee does not go together but thats okay!!"
```
3. An invalid order with missing fields `POST /order` 
```json
{
    "item": "coffee",
    "sugar": 2,
    "milk": "yes"
}
```
The schema validator will catch this and responds with 
```json
[
    {
        "instancePath": "",
        "schemaPath": "#/then/required",
        "keyword": "required",
        "params": {
            "missingProperty": "category"
        },
        "message": "must have required property 'category'"
    }
]
```

4. If you are not sure what type of coffee you feel like drinking but you fancy a tea. `POST /order` 
```json
{
    "item": "tea",
    "sugar": 2,
    "milk": "yes"
}
```
You will get a response
```
Tea is brewing!!
```

## Schema

The schema can be retrieved throught `GET` `/schema` endpoint. It kind of looks like:
```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "description": "An order for a cafe",
    "type": "object",
    "properties": {
        "item": {
            "type": "string"
        },
        "milk": {
            "type": "string"
        },
        "sugar": {
            "type": "number"
        },
        "category": {
            "type": "string"
        }
    },
    "required": [
        "item",
        "milk",
        "sugar"
    ],
    "if": {
        "properties": {
            "item": {
                "const": "coffee"
            }
        }
    },
    "then": {
        "required": [
            "item",
            "milk",
            "sugar",
            "category"
        ]
    },
    "else": {
        "required": [
            "item",
            "milk",
            "sugar"
        ]
    }
}
```