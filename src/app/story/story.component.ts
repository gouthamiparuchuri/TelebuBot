import { Component, OnInit } from '@angular/core';
import { BotService } from '../services/bot.service';
import { Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customDagreNodeOnly';
import * as shape from 'd3-shape';
import { Subscription } from 'rxjs';
import { sampleBot } from '../constant/sampleBbot';
import { HttpService } from '../services/http.service';
import { constantApis } from '../constant/constantapis';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  showIntent: boolean = false;
  node: any;
  type: string;
  public layoutSettings = {
    orientation: 'TB'
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor(private _bot: BotService, private _http: HttpService, private _toastr: ToastrService) { }
  nodes: any[];
  edges: any[];
  clusters =
    [
      // {
      //   id: 'third',
      //   label: 'Cluster node',
      //   childNodeIds: ['c1', 'c2']
      // }
    ]
  botData$: Subscription
  ngOnInit() {
    this.botData$ = this._bot.getBotData().subscribe(data => {
      this.nodes = [];
      this.edges = [];
      for (const key in data.stories['conversation path1']) {
        this.nodes.push(data.stories['conversation path1'][key])
      }
      this.nodes.forEach((node, i) => {
        node.target.forEach((target, j) => {
          let edge = {
            id: 'edge' + i + j,
            source: node.id,
            target: target,
          }
          this.edges.push({ ...edge })
        })
      })
    })
    this._bot.getBot()
  }


  showIntentData(node) {
    this.showIntent = true;
    this.node = node;
    this.type = node.type
  }
  saveBot(): void {
    this._bot.currentBotData = this._bot.botData;
    this._http.loginCall(constantApis.saveBot, 'post', this._bot.botData).subscribe(response => {  
    },error => {
      console.warn("error at getting bots", error)
      this._toastr.info("something went wrong")
    })
  }
  cancelBot(): void {
    if (confirm('Changes will be not saved.')) {
      console.log(this._bot.botData, this._bot.currentBotData)
      this._bot.botData = this._bot.currentBotData;
      this._bot.setBotData(this._bot.botData)
    }
  }
  newBot(): void {
    if (confirm('Creating a new BOT deletes existing BOT. Are you sure to create new one?')) {
      this._bot.botData = sampleBot
      this._bot.setBotData(this._bot.botData)
    }
  }
  ngOnDestroy(): void {
    this.botData$.unsubscribe()
  }

}
