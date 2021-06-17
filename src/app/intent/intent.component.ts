import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BotService } from '../services/bot.service';
import { domain } from 'process';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.css']
})
export class IntentComponent implements OnInit {
  @Input() node: any;
  @Input() type: string;
  nodeTitle: any;
  nodeType: string;
  nlu: any;
  nluIndex: number;
  templateText: string;
  templateButtons: any;
  responses: any;
  nextIntent: string;
  nextText: string;
  totalNodes: number;
  deletedResponses: number[];
  isEndNode: boolean;
  @Output() closeEvent = new EventEmitter();

  constructor(private _bot: BotService, private _toastr: ToastrService) { }

  ngOnChanges(): void {
    console.log(this.type, this.node)
    this.nodeTitle = this.node.label
    if(this.node.target.length > 0){
      this.nodeType = this._bot.botData.stories["conversation path1"][this.node.target[0] - 1].type
      this.isEndNode = false;
    }else{
      this.nodeType = ''
      this.isEndNode = true
    }
    this.responses = []
    this.nextText = ''
    this.nextIntent = ''
    if (this.type == 'intent') {
      this._bot.botData.nlu.forEach((nlu, index) => {
        if (Object.keys(nlu)[0] == this.node.title) {
          this.nluIndex = index;
          this.nlu = Object.values(nlu)[0]
          this.nlu = [...this.nlu]
        }
      })
    } 
    // else {
      // this.templateText = this._bot.botData.domain.templates['utter_' + this.node.title][0].text
      // this.templateButtons = this._bot.botData.domain.templates['utter_' + this.node.title][0].buttons
    // }
    this.node.target.forEach(target => {
      if(this.nodeType == 'response'){
        this.deletedResponses = []
        let node = this._bot.botData.stories["conversation path1"][target - 1]
        this.responses.push(node)
      }else if(this.nodeType == 'intent')
        this.nextIntent = this._bot.botData.stories["conversation path1"][target - 1].label
      else if(this.nodeType == 'text')
        this.nextText = this._bot.botData.stories["conversation path1"][target - 1].label
    })
  }
  ngOnInit(): void {

  }
  newNlu(): void {
    this.nlu.push('')
  }
  newResponse(): void {
    this.responses.push({
      "label": "",
      "title": "",
      "type": "response",
      "id": null,
      "target": []
    })
  }
  deleteResponse(index: number){
    if (confirm('Are you sure to delete?')) {
      this.deletedResponses.push(this.responses[index].id)
      this.responses.splice(index, 1)
    }
  }

  deleteNlu(index: number): void {
    if (confirm('Are you sure to delete?')) {
      this.nlu.splice(index, 1)
    }
  }

  closeIntent(): void {
    this.closeEvent.emit()
  }

  saveData(): void {
    this.nodeTitle = this.nodeTitle.trim()
    let newType =  (!this.isEndNode && this.nodeType != this._bot.botData.stories["conversation path1"][this.node.target[0] - 1].type)
    if(this.nodeTitle != ''){
      this._bot.botData.domain.intents.splice(this._bot.botData.domain.intents.indexOf(this.node.title), 1);
      this._bot.botData.domain.intents.push(this.nodeTitle)
      this._bot.botData.stories["conversation path1"][this.node.id - 1].title = this.nodeTitle
      this._bot.botData.stories["conversation path1"][this.node.id - 1].label = this.nodeTitle
      this._bot.botData.nlu.splice(this.nluIndex, 1)
      this._bot.botData.nlu.push({ [this.nodeTitle]: this.nlu })
      if(newType){
        if(this.nodeType == 'intent'){
          
        }else{

        }
      }
      if(this.nodeType == 'intent'){
        this.nextIntent = this.nextIntent.trim()
        if(this.nextIntent != ''){
          let title = this.nextIntent.replace(/ /g, '_')
          let id = this._bot.botData.stories["conversation path1"][this._bot.botData.stories["conversation path1"].length - 1].id + 1
          this._bot.botData.stories["conversation path1"].push({
            "label": this.nextIntent,
            "title": title,
            "type": "intent",
            "id": id,
            "target": []
          })
          this._bot.botData.nlu.push({[title] : [this.nextIntent]})
          this._bot.botData.domain.intents.push(title)
          this._bot.botData.stories["conversation path1"][this.node.id - 1].target.push(id)
        }else
          this._toastr.info('Next node user input cannot be empty, Please add')
      }else if(this.nodeType == 'response'){
        let title = this.nextIntent.replace(/ /g, '_')
        // before saving check for responses empty ids and add incr with last noe id

      }else if(this.nodeType == 'text'){
        let title = this.nextIntent.replace(/ /g, '_')

      }
      //if any middle node deleted remove nodes next to it maintain deleted node ids for responses
      // deleted node id consider it and after that precedind nodes id do change else remove node id based conditions
      console.log(this._bot.botData, "lll")

      this._bot.setBotData(this._bot.botData)
      this.closeEvent.emit()
    }else{
      this._toastr.info('Title cannot be empty, Please add something.')
    }
  }
  newButton(): void {
    this.templateButtons.push('')
  }
  saveButtonData(): void {
    this._bot.botData.domain.templates['utter_' + this.node.title][0].text = this.templateText
    this._bot.botData.domain.templates['utter_' + this.node.title][0].buttons = this.templateButtons
    this.closeEvent.emit()
  }
  trackByFn(index, item) {
    return index; // or item.id
  }

}
