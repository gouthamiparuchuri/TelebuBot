import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BotService } from '../services/bot.service';

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.css']
})
export class IntentComponent implements OnInit {
  @Input() node: any;
  @Input() type: string;
  nlu: any;
  nluIndex: number;
  templateText: string;
  templateButtons: any;
  targets: any;
  @Output() closeEvent = new EventEmitter();

  constructor(private _bot: BotService) { }

  ngOnChanges(): void {
    console.log(this.type, this.node)
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

  closeIntent(): void {
    this.closeEvent.emit()
  }

  saveNluData(): void {
    this._bot.botData.nlu[this.nluIndex][this.node.title] = this.nlu
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
