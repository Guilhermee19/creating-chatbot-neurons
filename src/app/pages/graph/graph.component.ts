import { Component, OnInit } from '@angular/core';
import * as joint from 'jointjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  private graph!: joint.dia.Graph;

  ngOnInit(): void {
    this.graph = new joint.dia.Graph();

    const paper = new joint.dia.Paper({
      el: document.getElementById('paper')!,
      model: this.graph,
      width: 800,
      height: 600,
      gridSize: 10,
      drawGrid: true
    });

    this.createElements();
  }

  private createElements(): void {
    const rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: 'blue'
      },
      label: {
        text: 'Hello',
        fill: 'white'
      }
    });
    rect.addTo(this.graph);

    const circle = new joint.shapes.standard.Circle();
    circle.position(200, 30);
    circle.resize(200, 40);
    circle.attr({
      body: {
        fill: 'green'
      },
      label: {
        text: 'World',
        fill: 'white'
      }
    });
    circle.addTo(this.graph);

    const circle2 = new joint.shapes.standard.Circle();
    circle2.position(300, 120);
    circle2.resize(100, 40);
    circle2.attr({
      body: {
        fill: 'red'
      },
      label: {
        text: 'World2',
        fill: 'white'
      }
    });
    circle2.addTo(this.graph);

    // Link between rect and circle
    const link1 = new joint.shapes.standard.Link();
    link1.source(rect);
    link1.target(circle);
    link1.addTo(this.graph);

    // Link between circle and circle2
    const link2 = new joint.shapes.standard.Link();
    link2.addTo(this.graph);

    const polygon = new joint.shapes.standard.Polygon();
    polygon.position(100, 200);
    polygon.resize(100, 100);
    polygon.attr({
      body: {
        fill: 'yellow',
        refPoints: '0,10 10,0 20,10 10,20'
      },
      label: {
        text: 'Polygon',
        fill: 'black'
      }
    });
    polygon.addTo(this.graph);

    const polyline = new joint.shapes.standard.Polyline();
    polyline.position(300, 200);
    polyline.resize(100, 100);
    polyline.attr({
      body: {
        fill: 'none',
        stroke: 'blue',
        strokeWidth: 2,
        refPoints: '0,10 10,0 20,10 10,20'
      },
      label: {
        text: 'Polyline',
        fill: 'black'
      }
    });
    polyline.addTo(this.graph);
  }
}
