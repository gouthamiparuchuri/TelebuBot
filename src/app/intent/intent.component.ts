import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BotService } from '../services/bot.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.css']
})
export class IntentComponent implements OnInit {
  @Input() storyNode: any;
  @Input() type: string;
  node: any;
  nodeTitle: any;
  nodeType: string;
  nlu: any;
  nluIndex: number;
  templateText: string;
  templateButtons: any;
  nextResponse: any;
  nextIntent: string;
  nextText: string;
  deletedNodes: number[];
  isEndNode: boolean;
  nextNodeChange: boolean;
  @Output() closeEvent = new EventEmitter();

  constructor(private _bot: BotService, private _toastr: ToastrService) { }

  ngOnChanges(): void {
    this.node = { ...this.storyNode }
    this.nextNodeChange = false;
    this.deletedNodes = []
    this.nodeTitle = this.node.label
    let target = this.node.target
    if (target.length > 0) {
      this.nodeType = this._bot.botData.stories["conversation path1"][target[0]].type
      this.isEndNode = false;
    } else {
      this.nodeType = ''
      this.isEndNode = true
    }
    this.nextResponse = {}
    this.nextText = ''
    this.nextIntent = ''
    if (this.type != 'text') {
      this._bot.botData.nlu.forEach((nlu, index) => {
        if (Object.keys(nlu)[0] == this.node.title) {
          this.nluIndex = index;
          if (this.type == 'intent') {
            this.nlu = Object.values(nlu)[0]
            this.nlu = [...this.nlu]
          }
        }
      })
    }
    if (this.nodeType == 'response')
      this.nextResponse = { ...this._bot.botData.domain.templates['utter_' + this.node.id][0] }
    else if (this.nodeType == 'intent')
      this.nextIntent = this._bot.botData.stories["conversation path1"][target[0]].label
    else if (this.nodeType == 'text')
      this.nextText = this._bot.botData.stories["conversation path1"][target[0]].label
  }
  ngOnInit(): void {

  }
  newNlu(): void {
    this.nlu.push('')
  }
  newButton(): void {
    this.nextResponse.buttons.push({
      "title": "",
      "payload": "",
      "id": 0
    })
    this.nextNodeChange = true;
  }
  changeNodeType(type: string): void {
    if (this.node.target.length == 0) {
      this.nodeType = type
      if (type == 'response') {
        this.nextResponse = {
          "text": "",
          "buttons": [{
            "title": "",
            "payload": "",
            "id": 0
          }]
        }
      }
      this.nextNodeChange = true;
    } else {
      if (confirm('You are about to change next node type existing flow changes, Are you sure to change?')) {
        this.nodeType = type
        this.nextIntent = ''
        this.nextText = ''
        this.nextResponse = {}
        this.isEndNode = true
        this.deletedNodes = [...this.deletedNodes, ...this.node.target]
        this.node.target = []
        if (type == 'response') {
          this.nextResponse = {
            "text": "",
            "buttons": [{
              "title": "",
              "payload": "",
              "id": 0
            }]
          }
        }
        this.nextNodeChange = true;
      }
    }
  }
  deleteNodes(nodesIds: number[]): void {
    let subNodes = []
    nodesIds.forEach(nodeId => {
      let node = this._bot.botData.stories["conversation path1"][nodeId]
      if (node.type != 'text') {
        this._bot.botData.nlu.forEach((nlu, index) => {
          if (Object.keys(nlu)[0] == node.title)
            this._bot.botData.nlu.splice(index, 1);
        })
        this._bot.botData.domain.intents.splice(this._bot.botData.domain.intents.indexOf(node.title), 1);
      }
      if (node.type != 'intent') {
        delete this._bot.botData.domain.templates['utter_' + node.id]
        this._bot.botData.domain.actions.splice(this._bot.botData.domain.actions.indexOf('utter_' + node.id), 1);
      }
      if (typeof this._bot.botData.stories["conversation path1"][node.parentNode] != 'undefined')
        this._bot.botData.stories["conversation path1"][node.parentNode].target.splice(this._bot.botData.stories["conversation path1"][node.parentNode].target.indexOf(nodeId), 1);
      delete this._bot.botData.stories["conversation path1"][nodeId]
      subNodes.push(...node.target)
    })
    if (subNodes.length > 0)
      this.deleteNodes(subNodes)
  }
  deleteButton(index: number) {
    if (confirm('Are you sure to delete?')) {
      let nodeId = this.nextResponse.buttons[index].id
      if (nodeId != 0)
        this.deletedNodes.push(nodeId)
      this.nextResponse.buttons.splice(index, 1)
    }
  }
  deleteNode(): void {
    if (confirm('Are you sure to delete this node?')) {
      this.nodeType = ''
      this.deletedNodes = [...this.deletedNodes, ...this.node.target]
      this.node.target = []
      this.nextIntent = ''
      this.nextText = ''
      this.nextResponse = {}
    }
  }
  deleteNlu(index: number): void {
    if (confirm('Are you sure to delete?'))
      this.nlu.splice(index, 1)
  }

  closeIntent(): void {
    this.closeEvent.emit()
  }

  saveData(): void {
    this.nodeTitle = this.nodeTitle.trim()
    if (this.nodeTitle != '') {
      let label = this.nodeTitle.replace(/ /g, '_')
      let isValid: boolean = true;
      if (this.node.type != 'text') {
        this._bot.botData.nlu.splice(this.nluIndex, 1)
        let nlu = this.node.type == 'intent' ? this.nlu : [this.nodeTitle]
        this._bot.botData.nlu.push({ [label]: nlu })
        this._bot.botData.domain.intents.splice(this._bot.botData.domain.intents.indexOf(this.node.title), 1);
        this._bot.botData.domain.intents.push(label)
      }
      if (this.node.type == 'response') {
        this._bot.botData.domain.templates['utter_' + this.node.parentNode][0].buttons.forEach((button, index) => {
          if (button.id == this.node.id)
            this._bot.botData.domain.templates['utter_' + this.node.parentNode][0].buttons[index].title = this.nodeTitle
        })
      }
      if (this.node.type == 'text')
        this._bot.botData.domain.templates['utter_' + this.node.parentNode].text = this.nodeTitle
      this._bot.botData.stories["conversation path1"][this.node.id].title = label
      this._bot.botData.stories["conversation path1"][this.node.id].label = this.nodeTitle
      if (this.nextNodeChange) {
        if (this.nodeType == 'intent') {
          this.nextIntent = this.nextIntent.trim()
          if (this.nextIntent != '') {
            let title = this.nextIntent.replace(/ /g, '_')
            let id = +Object.keys(this._bot.botData.stories["conversation path1"]).pop() + 1
            this._bot.botData.stories["conversation path1"][id] = {
              "label": this.nextIntent,
              "title": title,
              "type": "intent",
              "id": id,
              "target": [],
              "parentNode": this.node.id
            }
            this._bot.botData.nlu.push({ [title]: [this.nextIntent] })
            this._bot.botData.domain.intents.push(title)
            this._bot.botData.stories["conversation path1"][this.node.id].target.push(id)
          } else {
            isValid = false
            this._toastr.info('Next node user input cannot be empty, Please add or Delete the node')
          }
        } else if (this.nodeType == 'response') {
          isValid = true
          this.nextResponse.buttons.forEach(button => {
            button.title = button.title.trim()
            if (button.title == '') {
              this._toastr.info('Next node response button cannot be empty, Please add or Delete the button or node')
              isValid = false;
            }
          });
          if (isValid) {
            let isNew = true
            this.nextResponse.buttons.forEach((button, index) => {
              if(button.id == 0){
                button.title = button.title.trim()
                let title = button.title.replace(/ /g, '_')
                let id = +Object.keys(this._bot.botData.stories["conversation path1"]).pop() + 1
                this._bot.botData.stories["conversation path1"][id] = {
                  "label": button.title,
                  "title": title,
                  "type": "response",
                  "id": id,
                  "target": [],
                  "parentNode": this.node.id
                }
                this.nextResponse.buttons[index].id = id
                this._bot.botData.nlu.push({ [title]: [button.title] })
                this._bot.botData.domain.intents.push(title)
                this._bot.botData.stories["conversation path1"][this.node.id].target.push(id)
              }else{
                isNew = false 
              }
            });
            if(isNew)
              this._bot.botData.domain.actions.push("utter_" + this.node.id)
            this._bot.botData.domain.templates["utter_" + this.node.id] = [this.nextResponse]
          }
        } else if (this.nodeType == 'text') {
          this.nextText = this.nextText.trim()
          if (this.nextText != '') {
            let id = +Object.keys(this._bot.botData.stories["conversation path1"]).pop() + 1
            this._bot.botData.stories["conversation path1"][id] = {
              "label": this.nextText,
              "title": this.nextText.replace(/ /g, '_'),
              "type": "text",
              "id": id,
              "target": [],
              "parentNode": this.node.id
            }
            this._bot.botData.domain.actions.push("utter_" + this.node.id)
            this._bot.botData.stories["conversation path1"][this.node.id].target.push(id)
            this._bot.botData.domain.templates["utter_" + this.node.id] = [{
              "text": this.nextText
            }]
          } else {
            isValid = false
            this._toastr.info('Next node Text cannot be empty, Please add or Delete the node')
          }
        }
      }
      if (isValid) {
        this.deleteNodes(this.deletedNodes)
        this._bot.setBotData(this._bot.botData)
        this.closeEvent.emit()
      }
    } else {
      this._toastr.info('Title cannot be empty, Please add something.')
    }
  }
  trackByFn(index, item) {
    return index; // or item.id
  }

}
