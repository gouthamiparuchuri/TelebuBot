import { Injectable } from '@angular/core';
import { constantApis } from '../constant/constantapis';
import { HttpService } from './http.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class BotService {
    currentBotData: any;
    botData: any;
    private _botData$: Subject<any> = new Subject<any>();

    constructor(private _http: HttpService, private _toastr: ToastrService) { }

    public setBotData(botData: any): void {
        this._botData$.next(botData);
    }
    public getBotData(): Observable<any> {
        return this._botData$.asObservable();
    }
    getBot(): void {
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
                "Service_Register_Related": ["Service Register Related"]
            }, {
                "Payroll_Related": ["payroll Related"]
            }, {
                "Update_Mobile_Number_in_SR": ["Update Mobile Number in SR"]
            }, {
                "How_to_update_aadhar_number_in_SR?": ["How to update aadhar number in SR?"]
            }, {
                "How_to_generate_time_bond__Increment": ["How_to_generate_time_bond__Increment"]
            }, {
                "Paybill_not_validate_issues_while_pushing_the_bills?": ["Paybill not validate issues while pushing the bills?"]
            }],
            "stories": {
                "conversation path1": {
                    1: {
                        "label": "start",
                        "title": "start",
                        "type": "intent",
                        "id": 1,
                        "target": [2, 3],
                        "parentNode": 0
                    },
                    2: {
                        "label": "Service Register Related",
                        "title": "Service_Register_Related",
                        "type": "response",
                        "id": 2,
                        "target": [4, 5],
                        "parentNode": 1
                    },
                    3: {
                        "label": "Payroll Related",
                        "title": "Payroll_Related",
                        "type": "response",
                        "id": 3,
                        "target": [8, 12],
                        "parentNode": 1
                    },
                    4: {
                        "label": "Update Mobile Number in SR",
                        "title": "Update_Mobile_Number_in_SR",
                        "type": "response",
                        "id": 4,
                        "target": [6],
                        "parentNode": 2
                    },
                    5: {
                        "label": "How to update aadhar number in SR?",
                        "title": "How_to_update_aadhar_number_in_SR?",
                        "type": "response",
                        "id": 5,
                        "target": [7],
                        "parentNode": 2
                    },
                    6: {
                        "label": "IN Service register module update employe basic detail submobile.By using this screen DDo can update the mobile number",
                        "title": "IN_Service register module update employe basic detail submobile.By using this screen DDo can update the mobile number",
                        "type": "text",
                        "id": 6,
                        "target": [],
                        "parentNode": 4
                    },
                    7: {
                        "label": "Download the mobile app by using the webportal line provided in the application detailed user name is provided in below line",
                        "title": "Download the mobile app by using the webportal line provided in the application detailed user name is provided in below line",
                        "type": "text",
                        "id": 7,
                        "target": [],
                        "parentNode": 5
                    },
                    8: {
                        "label": "How to generate time bond  Increment",
                        "title": "How_to_generate_time_bond__Increment",
                        "type": "response",
                        "id": 8,
                        "target": [9],
                        "parentNode": 3
                    },
                    9: {
                        "label": "DDO has to insert the TB record",
                        "title": "DDO has to insert the TB record",
                        "type": "text",
                        "id": 9,
                        "target": [10],
                        "parentNode": 8
                    },
                    10: {
                        "label": "the record will go for HOD appraisal",
                        "title": "the record will go for HOD appraisal",
                        "type": "text",
                        "id": 10,
                        "target": [11],
                        "parentNode": 9
                    },
                    11: {
                        "label": "After that DDO has to generate the *** using screen arrears - Generate arrears",
                        "title": "After that DDO has to generate the *** using screen arrears - Generate arrears",
                        "type": "text",
                        "id": 11,
                        "target": [],
                        "parentNode": 10
                    },
                    12: {
                        "label": "Paybill not validate issues while pushing the bills?",
                        "title": "Paybill_not_validate_issues_while_pushing_the_bills?",
                        "type": "response",
                        "id": 12,
                        "target": [13],
                        "parentNode": 3
                    },
                    13: {
                        "label": "payroll check the installment cant of lines(GPF,KGID).the cant second not cross 40 for principal $8 for interest.",
                        "title": "payroll check the installment cant of lines(GPF,KGID).the cant second not cross 40 for principal $8 for interest.",
                        "type": "text",
                        "id": 13,
                        "target": [],
                        "parentNode": 12
                    }
                }

            },
            "domain": {
                "intents": ["start", "Paybill_not_validate_issues_while_pushing_the_bills?", "How_to_generate_time_bond__Increment", "Service_Register_Related", "Payroll_Related", "Update_Mobile_Number_in_SR", "How_to_update_aadhar_number_in_SR?"],
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
                            "payload": "/service_conversation{\"group\":\"service\"}",
                            "id": 2
                        }, {
                            "title": "Payroll related",
                            "payload": "/Payroll_conversation{\"group\":\"Payroll\"}",
                            "id": 3
                        }]
                    }],
                    "utter_2": [{
                        "text": "",
                        "buttons": [{
                            "title": "Update Mobile Number in SR",
                            "payload": "/mobile_conversation{\"group\":\"mobile\"}",
                            "id": 4
                        }, {
                            "title": "How to update aadhar number in SR?",
                            "payload": "/aadhar_conversation{\"group\":\"aadhar\"}",
                            "id": 5
                        }]
                    }],
                    "utter_3": [{
                        "text": "",
                        "buttons": [{
                            "title": "How to generate time bond  Increment",
                            "payload": "/increment_conversation{\"group\":\"increment\"}",
                            "id": 8
                        }, {
                            "title": "Paybill not validate issues while pushing the bills?",
                            "payload": "/bills_conversation{\"group\":\"paybill\"}",
                            "id": 12
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
        this.currentBotData = { ...res };
        this.botData = { ...res };
        this.setBotData(res)
        //     },error => {
        //     console.warn("error at getting bots", error)
        //     this._toastr.info("something went wrong")
        // })
    }
}