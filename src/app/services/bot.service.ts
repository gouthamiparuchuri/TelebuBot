import { Injectable } from '@angular/core';
import { constantApis } from '../constant/constantapis';
import { HttpService } from './http.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class BotService {
    botData: any;

    constructor(private _http: HttpService, private _toastr: ToastrService) { }

    getBotData(): Promise<any> {
        return new Promise((resolve, reject) => {
            // this._http.loginCall(constantApis.getBots, 'get', {}).subscribe(response => {
            // this.botData = response;
            let res = {
                "_id": "60c0a02a7f527776c4aa80e1",
                "name": "sampleBot1",
                "port": "5007",
                "createdAt": "2021-06-09T11:04:10.055Z",
                "updatedAt": "2021-06-09T11:04:10.055Z",
                "__v": 0,
                "nlu": [{
                    "start": ["hey", "hello", "hi", "good morning", "good evening", "hey there"]
                }, {
                    "service_conversation": ["service related"]
                }, {
                    "payroll_conversation": ["payroll related"]
                }, {
                    "mobile_conversation": ["update mobile number"]
                }, {
                    "aadhar_conversation": ["updaate aadhar number"]
                }, {
                    "increment_conversation": ["time bond increment"]
                }, {
                    "bills_conversation": ["pay bills"]
                }],
                "stories": {
                    "conversation path1": [{
                        "label": "start",
                        "title": "start",
                        "type": "intent",
                        "id": 1,
                        "target": [2, 3]
                    }, {
                        "label": "Service Register Related",
                        "title": "Service Register Related",
                        "type": "response",
                        "id": 2,
                        "target": [4, 5]
                    }, {
                        "label": "Payroll Related",
                        "title": "Payroll Related",
                        "type": "response",
                        "id": 3,
                        "target": [8, 12]
                    }, {
                        "label": "Update Mobile Number in SR",
                        "title": "Update Mobile Number in SR",
                        "type": "response",
                        "id": 4,
                        "target": [6]
                    }, {
                        "label": "How to update aadhar number in SR?",
                        "title": "How to update aadhar number in SR?",
                        "type": "response",
                        "id": 5,
                        "target": [7]
                    }, {
                        "label": "IN Service register module update employe basic detail submobile.By using this screen DDo can update the mobile number",
                        "title": "IN Service register module update employe basic detail submobile.By using this screen DDo can update the mobile number",
                        "type": "text",
                        "id": 6,
                        "target": []
                    }, {
                        "label": "Download the mobile app by using the webportal line provided in the application detailed user name is provided in below line",
                        "title": "Download the mobile app by using the webportal line provided in the application detailed user name is provided in below line",
                        "type": "text",
                        "id": 7,
                        "target": []
                    }, {
                        "label": "How to generate time bond  Increment",
                        "title": "How to generate time bond  Increment",
                        "type": "response",
                        "id": 8,
                        "target": [9]
                    }, {
                        "label": "DDO has to insert the TB record",
                        "title": "DDO has to insert the TB record",
                        "type": "text",
                        "id": 9,
                        "target": [10]
                    }, {
                        "label": "the record will go for HOD appraisal",
                        "title": "the record will go for HOD appraisal",
                        "type": "text",
                        "id": 10,
                        "target": [11]
                    }, {
                        "label": "After that DDO has to generate the *** using screen arrears - Generate arrears",
                        "title": "After that DDO has to generate the *** using screen arrears - Generate arrears",
                        "type": "text",
                        "id": 11,
                        "target": []
                    }, {
                        "label": "Paybill not validate issues while pushing the bills?",
                        "title": "Paybill not validate issues while pushing the bills?",
                        "type": "response",
                        "id": 12,
                        "target": [13]
                    }, {
                        "label": "payroll check the installment cant of lines(GPF,KGID).the cant second not cross 40 for principal $8 for interest.",
                        "title": "payroll check the installment cant of lines(GPF,KGID).the cant second not cross 40 for principal $8 for interest.",
                        "type": "text",
                        "id": 13,
                        "target": []
                    }]

                },
                "domain": {
                    "intents": ["start", "service_conversation", "payroll_conversation", "mobile_conversation", "aadhar_conversation", "increment_conversation", "bills_conversation"],
                    "actions": ["utter_greet", "utter_1", "utter_2", "utter_3", "utter_4", "utter_5", "utter_8", "utter_9", "utter_10", "utter_12", "utter_goodbye", "utter_thankyou", "utter_end"],
                    "entities": ["group"],
                    "slots": {
                        "group": {
                            "type": "text"
                        }
                    },
                    "templates": {
                        "utter_1": [{
                            "text": "Please select ",
                            "buttons": [{
                                "title": "Service Register Related",
                                "payload": "/service_conversation{\"group\":\"service\"}"
                            }, {
                                "title": "Payroll related",
                                "payload": "/Payroll_conversation{\"group\":\"Payroll\"}"
                            }]
                        }],
                        "utter_2": [{
                            "text": "",
                            "buttons": [{
                                "title": "Update Mobile Number in SR",
                                "payload": "/mobile_conversation{\"group\":\"mobile\"}"
                            }, {
                                "title": "How to update aadhar number in SR?",
                                "payload": "/aadhar_conversation{\"group\":\"aadhar\"}"
                            }]
                        }],
                        "utter_3": [{
                            "text": "",
                            "buttons": [{
                                "title": "How to generate time bond  Increment",
                                "payload": "/increment_conversation{\"group\":\"increment\"}"
                            }, {
                                "title": "Paybill not validate issues while pushing the bills?",
                                "payload": "/bills_conversation{\"group\":\"paybill\"}"
                            }]
                        }],
                        "utter_4": [{
                            "text": "IN Service register module update employe basic detail submobile.By using this screen DDo can update the mobile number"
                        }],
                        "utter_5": [{
                            "text": "Download the mobile app by using the webportal line provided in the application detailed user name is provided in below line"
                        }],
                        "utter_8": [{
                            "text": "DDO has to insert the TB record"
                        }],
                        "utter_9": [{
                            "text": "the record will go for HOD appraisal"
                        }],
                        "utter_10": [{
                            "text": "After that DDO has to generate the *** using screen arrears - Generate arrears"
                        }],
                        "utter_12": [{
                            "text": "payroll check the installment cant of lines(GPF,KGID).the cant second not cross 40 for principal $8 for interest."
                        }],
                        "utter_end": [{
                            "custom": {
                                "status": "completed",
                                "text": "Bye"
                            }
                        }],
                        "utter_goodbye": [{
                            "text": "Bye"
                        }],
                        "utter_greet": [{
                            "text": "Hello!!"
                        }],
                        "utter_thankyou": [{
                            "text": "Thanks for visiting."
                        }],
                        "utter_submit": [{
                            "text": "All done!"
                        }]
                    }
                }
            }
            this.botData = res;
            resolve(res)
            //     },error => {
            //     console.warn("error at getting bots", error)
            //     this._toastr.info("something went wrong")
            // })
        })
    }
}