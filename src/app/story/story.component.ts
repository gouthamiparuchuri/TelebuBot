import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgxFlowChatOptions, NgxFlowChatData } from 'ngx-flowchart'
import { BotService } from '../services/bot.service';
import { Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customDagreNodeOnly';
import * as shape from 'd3-shape';
import { Subscription, Subject } from 'rxjs';

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
  // intentData: any[] = ['hello', 'hi', 'ok', 'bye'];  

  constructor(private _bot: BotService, private _cd: ChangeDetectorRef) { }
  flowData: NgxFlowChatData[] = [
    {
      id: "1",
      name: "Group1",
      groupData: [{
        id: "2",
        name: "Flow1",
      },
      {
        id: "2",
        name: "Flow1",
      }]
    },
    {
      id: "3",
      name: "Flow2",
    },
    {
      id: "4",
      name: "Group2",
      groupData: [{
        id: "5",
        name: "Flow3",
      },
      {
        id: "6",
        name: "Flow4",
      }]
    },
  ];

  flowOptions: NgxFlowChatOptions = {
    groupBackground: 'linear-gradient(to bottom,#b9b9b9 0,#fefefe 50%)',
    groupShadow: '0 0.3rem 0.5rem 0 rgba(44,51,73,.5)',
    groupBorderRadius: '3px',
    groupTextColor: '#000',
    background: '#0e3e7d',
    shadow: '0 2px 4px 0 #333',
    borderRadius: '5px',
    textColor: '#fff',
    width: '200px'
  };

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
    this.nodes = [];
    this.edges = [];
    this.botData$ = this._bot.getBotData().subscribe(data => {
      console.log(data, "hhhhh")
      this.nodes = [...data.stories['conversation path1']]
      this.nodes.forEach((node, i) => {
        node.target.forEach((target, j) => {
          let edge = {
            id: 'edge' + i + j,
            source: node.id,
            target: target,
          }
          this.edges.push({...edge})
        })

      })

      console.log(this.nodes, this.edges)
      // this.nodes = [...this.nodes]
      // this.edges = [...this.edges]
    })
    this._bot.getBot()
    
    // this._bot.botData.stories[this.story].forEach((data, index) => {
    //   let node = {
    //     id: data.title,
    //     type: data.type,
    //     label: data.title
    //   }
    //   this.nodes.push(node)
    //   if(this._bot.botData.stories[this.story].length > index + 1){
    //     let edge = {
    //       id: data.title,
    //       source: data.title,
    //       target: this._bot.botData.stories[this.story][index + 1].title,
    //     }
    //     this.edges.push(edge)
    //   }
    // });    
  }


  showIntentData(node) {
    this.showIntent = true;
    this.node = node;
    this.type = node.type
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.botData$.unsubscribe()
  }

}
