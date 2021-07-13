import { Component, OnInit } from '@angular/core';
import { BotService } from '../services/bot.service';
import { Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customDagreNodeOnly';
import * as shape from 'd3-shape';
import { Subscription } from 'rxjs';
import { sampleBot } from '../constant/sampleBot';
import { HttpService } from '../services/http.service';
import { constantApis } from '../constant/constantapis';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private _route: ActivatedRoute, private _bot: BotService, private _http: HttpService, private _toastr: ToastrService) { }
  nodes: any[] = [];
  edges: any[] = [];
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
    this._bot.botId = this._route.snapshot.paramMap.get('id');
    this.botData$ = this._bot.getBotData().subscribe(data => {
      this.nodes = [];
      this.edges = [];
      for (const key in data.story) {
        this.nodes.push(data.story[key])
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
      this.nodes = [...this.nodes]
      this.edges = [...this.edges]
    })
    this._bot.getBot()
  }


  showIntentData(node) {
    this.showIntent = true;
    this.node = node;
    this.type = node.type
  }
  createStory(endNode: number, story): void {
    let node = this._bot.botData.story[endNode]
    if(node.target.length > 1){
      this._bot.botData.stories['conversation path' + story].unshift({title: 'utter_' + node.id, type: 'response'})    
    }
    let type;
    let title = node.title
    if(node.type == 'text' || node.type == 'connect'){
      type = 'response'
      title = 'utter_' + node.parentNode
    }else if(node.type == 'response')
      type = 'intent'
    else if(node.type == 'intent')
      type = node.type
    if(type == 'intent' && node.id != 1){
      title = title + '{"group":"' + node.label + '"}'
    }
    this._bot.botData.stories['conversation path' + story].unshift({title: title, type: type})    
    if(node.parentNode != 0)
      this.createStory(node.parentNode, story)
     }
  saveBot(): void {
    if (confirm('Do you want to save BOT?')) {
      this._bot.botData.stories = {}
      this._bot.botData.botId = this._bot.botData._id
      let story = 1
      for (const nodeId in this._bot.botData.story) {
        if(this._bot.botData.story[nodeId].target.length == 0){
          this._bot.botData.stories['conversation path' + story] = []
          this.createStory(+nodeId, story)
          story ++;
        }
      }
      // console.log(JSON.stringify(this._bot.botData))
      this._http.loginCall(constantApis.saveBot, 'post', this._bot.botData).subscribe(response => {  
        this._toastr.info('BOT changes saved successfully')
      },error => {
        console.warn("error at getting bots", error)
        this._toastr.info("something went wrong")
      })
    }
  }
  cancelBot(): void {
    if (confirm('Changes will be not saved.')) {
      this._bot.getBot()
    }
  }
  newBot(): void {
    if (confirm('Creating a new BOT deletes existing BOT. Are you sure to create new one?')) {
      this._bot.botData = sampleBot
      this._bot.botData._id = this._bot.botId
      this._bot.setBotData(this._bot.botData)
    }
  }
  ngOnDestroy(): void {
    this.botData$.unsubscribe()
  }

}
