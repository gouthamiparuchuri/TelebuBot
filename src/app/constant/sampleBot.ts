export const sampleBot = {
    "_id": "",
    "name": "",
    "port": "5007",
    "createdAt": "",
    "updatedAt": "",
    "__v": 0,
    "nlu": [{
        "start": ["hey", "hello", "hi", "good morning", "good evening", "hey there"]
    }],
    "stories": {
    },
    "story": {
        1: {
            "label": "start",
            "title": "start",
            "type": "intent",
            "id": 1,
            "target": [2, 3],
            "parentNode": 0
        }
    },
    "domain": {
        "intents": ["start"],
        "actions": ["utter_connect"],
        "entities": ["group"],
        "slots": {
            "group": {
                "type": "text"
            }
        },
        "responses": {
            "utter_connect": [
                {
                    "custom": [
                        {
                            "payload": "Endchat",
                            "text": "Connecting to our Agent…"
                        }
                    ]
                }
            ]
        }
    }
}