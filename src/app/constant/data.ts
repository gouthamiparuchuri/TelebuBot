let botData = {
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
		"conversation path1": [{
			"title": "start",
			"type": "intent"
		}, {
			"title": "utter_1",
			"type": "response"
		}, {
			"title": "Service_Register_Related",
			"type": "intent"
		}, {
			"title": "utter_2",
			"type": "response"
		}, {
			"title": "Update_Mobile_Number_in_SR",
			"type": "intent"
		}, {
			"title": "utter_4",
			"type": "response"
		}],
		"conversation path2": [{
			"title": "start",
			"type": "intent"
		}, {
			"title": "utter_1",
			"type": "response"
		}, {
			"title": "Service_Register_Related",
			"type": "intent"
		}, {
			"title": "utter_2",
			"type": "response"
		}, {
			"title": "How_to_update_aadhar_number_in_SR?",
			"type": "intent"
		}, {
			"title": "utter_5",
			"type": "response"
		}],
		"conversation path3": [{
			"title": "start",
			"type": "intent"
		}, {
			"title": "utter_1",
			"type": "response"
		}, {
			"title": "Payroll_Related",
			"type": "intent"
		}, {
			"title": "utter_3",
			"type": "response"
		}, {
			"title": "How_to_generate_time_bond__Increment",
			"type": "intent"
		}, {
			"title": "utter_8",
			"type": "response"
		}, {
			"title": "utter_9",
			"type": "response"
		}, {
			"title": "utter_10",
			"type": "response"
		}],
		"conversation path4": [{
			"title": "start",
			"type": "intent"
		}, {
			"title": "utter_1",
			"type": "response"
		}, {
			"title": "Payroll_Related",
			"type": "intent"
		}, {
			"title": "utter_3",
			"type": "response"
		}, {
			"title": "Paybill_not_validate_issues_while_pushing_the_bills?",
			"type": "intent"
		}, {
			"title": "utter_12",
			"type": "response"
		}]
	},
	"story": {
		"1": {
			"label": "start",
			"title": "start",
			"type": "intent",
			"id": 1,
			"target": [2, 3],
			"parentNode": 0,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 395,
				"y": 45
			},
			"data": {
				"color": "#7aa3e5"
			},
			"transform": "translate(320, 20)"
		},
		"2": {
			"label": "Service Register Related",
			"title": "Service_Register_Related",
			"type": "response",
			"id": 2,
			"target": [4, 5],
			"parentNode": 1,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 195,
				"y": 195
			},
			"data": {
				"color": "#50abcc"
			},
			"transform": "translate(120, 170)"
		},
		"3": {
			"label": "Payroll Related",
			"title": "Payroll_Related",
			"type": "response",
			"id": 3,
			"target": [8, 12],
			"parentNode": 1,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 595,
				"y": 195
			},
			"data": {
				"color": "#7ed3ed"
			},
			"transform": "translate(520, 170)"
		},
		"4": {
			"label": "Update Mobile Number in SR",
			"title": "Update_Mobile_Number_in_SR",
			"type": "response",
			"id": 4,
			"target": [6],
			"parentNode": 2,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 95,
				"y": 345
			},
			"data": {
				"color": "#ad6886"
			},
			"transform": "translate(20, 320)"
		},
		"5": {
			"label": "How to update aadhar number in SR?",
			"title": "How_to_update_aadhar_number_in_SR?",
			"type": "response",
			"id": 5,
			"target": [7],
			"parentNode": 2,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 295,
				"y": 345
			},
			"data": {
				"color": "#adcded"
			},
			"transform": "translate(220, 320)"
		},
		"6": {
			"label": "IN Service register module update employe basic detail submobile.By using this screen DDo can update the mobile number",
			"title": "IN Service register module update employe basic detail submobile.By using this screen DDo can update the mobile number",
			"type": "text",
			"id": 6,
			"target": [],
			"parentNode": 4,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 95,
				"y": 495
			},
			"data": {
				"color": "#a95963"
			},
			"transform": "translate(20, 470)"
		},
		"7": {
			"label": "Download the mobile app by using the webportal line provided in the application detailed user name is provided in below line",
			"title": "Download the mobile app by using the webportal line provided in the application detailed user name is provided in below line",
			"type": "text",
			"id": 7,
			"target": [],
			"parentNode": 5,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 295,
				"y": 495
			},
			"data": {
				"color": "#a27ea8"
			},
			"transform": "translate(220, 470)"
		},
		"8": {
			"label": "How to generate time bond Increment",
			"title": "How_to_generate_time_bond_Increment",
			"type": "response",
			"id": 8,
			"target": [9],
			"parentNode": 3,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 495,
				"y": 345
			},
			"data": {
				"color": "#aae3f5"
			},
			"transform": "translate(420, 320)"
		},
		"9": {
			"label": "DDO has to insert the TB record",
			"title": "DDO has to insert the TB record",
			"type": "text",
			"id": 9,
			"target": [10],
			"parentNode": 8,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 495,
				"y": 495
			},
			"data": {
				"color": "#7aa3e5"
			},
			"transform": "translate(420, 470)"
		},
		"10": {
			"label": "the record will go for HOD appraisal",
			"title": "the record will go for HOD appraisal",
			"type": "text",
			"id": 10,
			"target": [11],
			"parentNode": 9,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 495,
				"y": 645
			},
			"data": {
				"color": "#a27ea8"
			},
			"transform": "translate(420, 620)"
		},
		"11": {
			"label": "After that DDO has to generate the *** using screen arrears - Generate arrears",
			"title": "After that DDO has to generate the *** using screen arrears - Generate arrears",
			"type": "text",
			"id": 11,
			"target": [],
			"parentNode": 10,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 495,
				"y": 795
			},
			"data": {
				"color": "#a8385d"
			},
			"transform": "translate(420, 770)"
		},
		"12": {
			"label": "Paybill not validate issues while pushing the bills?",
			"title": "Paybill_not_validate_issues_while_pushing_the_bills?",
			"type": "response",
			"id": 12,
			"target": [13],
			"parentNode": 3,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 695,
				"y": 345
			},
			"data": {
				"color": "#8796c0"
			},
			"transform": "translate(620, 320)"
		},
		"13": {
			"label": "payroll check the installment cant of lines(GPF,KGID).the cant second not cross 40 for principal $8 for interest.",
			"title": "payroll check the installment cant of lines(GPF,KGID).the cant second not cross 40 for principal $8 for interest.",
			"type": "text",
			"id": 13,
			"target": [],
			"parentNode": 12,
			"meta": {
				"forceDimensions": false
			},
			"dimension": {
				"width": 150,
				"height": 50
			},
			"position": {
				"x": 695,
				"y": 495
			},
			"data": {
				"color": "#a8385d"
			},
			"transform": "translate(620, 470)"
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
		"responses": {
			"utter_1": [{
				"text": "Please select ",
				"buttons": [{
					"title": "Service Register Related",
					"payload": "/Service_Register_Related",
					"id": 2
				}, {
					"title": "Payroll related",
					"payload": "/Payroll_Related",
					"id": 3
				}]
			}],
			"utter_2": [{
				"text": "",
				"buttons": [{
					"title": "Update Mobile Number in SR",
					"payload": "/Update_Mobile_Number_in_SR",
					"id": 4
				}, {
					"title": "How to update aadhar number in SR?",
					"payload": "/How_to_update_aadhar_number_in_SR?",
					"id": 5
				}]
			}],
			"utter_3": [{
				"text": "",
				"buttons": [{
					"title": "How to generate time bond Increment",
					"payload": "/How_to_generate_time_bond_Increment",
					"id": 8
				}, {
					"title": "Paybill not validate issues while pushing the bills?",
					"payload": "/Paybill_not_validate_issues_while_pushing_the_bills",
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
	},
	"botId": "60c0a02a7f527776c4aa80e1"
}