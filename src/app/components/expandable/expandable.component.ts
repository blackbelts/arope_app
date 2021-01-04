import { Component, OnInit, ViewChild, AfterViewInit, Input,  ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "150px";

  constructor(public renderer: Renderer2) {}

  ngOnInit() {

  }
  ngAfterViewInit(){
    this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);

  }

}
