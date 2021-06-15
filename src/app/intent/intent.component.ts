import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BotService } from '../services/bot.service';
import { domain } from 'process';

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
  targets: any;
  @Output() closeEvent = new EventEmitter();

  constructor(private _bot: BotService) { }

  ngOnChanges(): void {
    console.log(this.type, this.node)
    this.nodeTitle = this.node.title
    if(this.node.target.length > 0)
      this.nodeType = this._bot.botData.stories["conversation path1"][this.node.target[0] - 1].type
    this.targets = []
    if(this.type == 'intent'){
      this._bot.botData.nlu.forEach((nlu, index) => {
        if(Object.keys(nlu)[0] == this.node.title){
          this.nluIndex = index;
          this.nlu = Object.values(nlu)[0]
          this.nlu = [...this.nlu]
        }
      })
    }else {
      this.templateText = this._bot.botData.domain.templates['utter_' + this.node.title][0].text
      this.templateButtons = this._bot.botData.domain.templates['utter_' + this.node.title][0].buttons
    }
    if(this.node.target.length > 0){
      this.node.target.forEach(target => {
        let node = this._bot.botData.stories["conversation path1"][target - 1]
        this.targets.push(node)
      })
    }
  }
  ngOnInit(): void {
    
  }
  newNlu(): void {
    this.nlu.push('')
  }

  deleteNlu(index: number): void{
    if(confirm('Are you sure to delete')){
      this.nlu.splice(index, 1)
    }
  }

  closeIntent(): void {
    this.closeEvent.emit()
  }

  saveData(): void {
    this.nodeTitle = this.nodeTitle.trim()
    this._bot.botData.domain.intents.splice(this._bot.botData.domain.intents.indexOf(this.node.title), 1);
    this._bot.botData.domain.intents.push(this.nodeTitle)
    this._bot.botData.stories["conversation path1"][this.node.id - 1].title = this.nodeTitle
    this._bot.botData.stories["conversation path1"][this.node.id - 1].label = this.nodeTitle
    this._bot.botData.nlu.splice(this.nluIndex, 1)
    this._bot.botData.nlu.push({[this.nodeTitle]: this.nlu})
    console.log(this._bot.botData, "lll")
    this.closeEvent.emit()
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
