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
  nodeLabel: any;
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
  botData: any;

  constructor(private _bot: BotService, private _toastr: ToastrService) { }

  ngOnChanges(): void {
    this.botData = {...this._bot.botData}
    this.node = { ...this.storyNode }
    this.nextNodeChange = false;
    this.deletedNodes = []
    this.nodeLabel = this.node.label
    let target = this.node.target
    if (target.length > 0) {
      this.nodeType = this.botData.story[target[0]].type
      this.isEndNode = false;
    } else {
      this.nodeType = ''
      this.isEndNode = true
    }
    this.nextResponse = {}
    this.nextText = ''
    this.nextIntent = ''
    if (this.type != 'text') {
      this.botData.nlu.forEach((nlu, index) => {
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
      this.nextResponse = { ...this.botData.domain.responses['utter_' + this.node.id][0] }
    else if (this.nodeType == 'intent')
      this.nextIntent = this.botData.story[target[0]].label
    else if (this.nodeType == 'text')
      this.nextText = this.botData.story[target[0]].label
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
      let node = this.botData.story[nodeId]
      if (node.type != 'text') {
        this.botData.nlu.forEach((nlu, index) => {
          if (Object.keys(nlu)[0] == node.title)
            this.botData.nlu.splice(index, 1);
        })
        this.botData.domain.intents.splice(this.botData.domain.intents.indexOf(node.title), 1);
      }
      if (node.type != 'intent') {
        delete this.botData.domain.responses['utter_' + node.id]
        this.botData.domain.actions.splice(this.botData.domain.actions.indexOf('utter_' + node.id), 1);
      }
      if (typeof this.botData.story[node.parentNode] != 'undefined')
        this.botData.story[node.parentNode].target.splice(this.botData.story[node.parentNode].target.indexOf(nodeId), 1);
      delete this.botData.story[nodeId]
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
    this.nodeLabel = this.nodeLabel.trim()
    if (this.nodeLabel != '') {
      let title = this.nodeLabel.replace(/ /g, '_')
      let isValid: boolean = true;
      if (this.node.type != 'text') {
        this.botData.nlu.splice(this.nluIndex, 1)
        let nlu = this.node.type == 'intent' ? this.nlu : [this.nodeLabel]
        this.botData.nlu.push({ [title]: nlu })
        this.botData.domain.intents.splice(this.botData.domain.intents.indexOf(this.node.title), 1);
        this.botData.domain.intents.push(title)
      }
      if (this.node.type == 'response') {
        this.botData.domain.responses['utter_' + this.node.parentNode][0].buttons.forEach((button, index) => {
          if (button.id == this.node.id){
            this.botData.domain.responses['utter_' + this.node.parentNode][0].buttons[index].title = this.nodeLabel
            this.botData.domain.responses['utter_' + this.node.parentNode][0].buttons[index].payload = '/' + title + '{\"group\":\"' + this.nodeLabel + '\"}'
          }
        })
      }
      if (this.node.type == 'text')
        this.botData.domain.responses['utter_' + this.node.parentNode].text = this.nodeLabel
      this.botData.story[this.node.id].title = title
      this.botData.story[this.node.id].label = this.nodeLabel
      if (this.nextNodeChange) {
        if (this.nodeType == 'intent') {
          this.nextIntent = this.nextIntent.trim()
          if (this.nextIntent != '') {
            let title = this.nextIntent.replace(/ /g, '_')
            let id = +Object.keys(this.botData.story).pop() + 1
            this.botData.story[id] = {
              "label": this.nextIntent,
              "title": title,
              "type": "intent",
              "id": id,
              "target": [],
              "parentNode": this.node.id
            }
            this.botData.nlu.push({ [title]: [this.nextIntent] })
            this.botData.domain.intents.push(title)
            this.botData.story[this.node.id].target.push(id)
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
                let id = +Object.keys(this.botData.story).pop() + 1
                this.botData.story[id] = {
                  "label": button.title,
                  "title": title,
                  "type": "response",
                  "id": id,
                  "target": [],
                  "parentNode": this.node.id
                }
                this.nextResponse.buttons[index].payload = '/' + title + '{\"group\":\"' + button.title + '\"}'
                this.nextResponse.buttons[index].id = id
                this.botData.nlu.push({ [title]: [button.title] })
                this.botData.domain.intents.push(title)
                this.botData.story[this.node.id].target.push(id)
              }else{
                isNew = false 
              }
            });
            if(isNew)
              this.botData.domain.actions.push("utter_" + this.node.id)            
          }
        } else if (this.nodeType == 'text') {
          this.nextText = this.nextText.trim()
          if (this.nextText != '') {
            let id = +Object.keys(this.botData.story).pop() + 1
            this.botData.story[id] = {
              "label": this.nextText,
              "title": this.nextText.replace(/ /g, '_'),
              "type": "text",
              "id": id,
              "target": [],
              "parentNode": this.node.id
            }
            this.botData.domain.actions.push("utter_" + this.node.id)
            this.botData.story[this.node.id].target.push(id)
            this.botData.domain.responses["utter_" + this.node.id] = [{
              "text": this.nextText
            }]
          } else {
            isValid = false
            this._toastr.info('Next node Text cannot be empty, Please add or Delete the node')
          }
        }
      }
      if(this.nodeType == 'response')
        this.botData.domain.responses["utter_" + this.node.id] = [this.nextResponse]
      if (isValid) {
        this.deleteNodes(this.deletedNodes)
        this._bot.botData = {...this.botData}
        this._bot.setBotData(this.botData)
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
