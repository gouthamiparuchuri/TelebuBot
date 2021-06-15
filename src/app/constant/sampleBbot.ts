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
        "conversation path1": [{
            "label": "start",
            "title": "start",
            "type": "intent",
            "id":  1,
            "target": []
        }]    
    },
    "domain": {
        "intents": ["start"],
        "actions": ["utter_greet"],
        "entities": ["group"],
        "slots": {
            "group": {
                "type": "text"
            }
        },
        "templates": {
            "utter_serviceorpayroll": [{
                "text": "Please select ",
                "buttons": [{
                    "title": "Service related",
                    "payload": "/service_conversation{\"group\":\"service\"}"
                }, {
                    "title": "Payroll related",
                    "payload": "/Payroll_conversation{\"group\":\"Payroll\"}"
                }]
            }],
            "utter_greet": [{
                "text": "Hello!!"
            }]
        }
    }
}