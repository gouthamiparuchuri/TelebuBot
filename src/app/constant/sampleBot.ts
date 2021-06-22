import { environment } from 'src/environments/environment';

export const sampleBot = {
    "_id": environment.botId,
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
        "actions": [],
        "entities": ["group"],
        "slots": {
            "group": {
                "type": "text"
            }
        },
        "templates": {           
        }
    }
}