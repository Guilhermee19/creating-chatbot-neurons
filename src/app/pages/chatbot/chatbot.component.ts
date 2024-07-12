import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import JointPlusService from '../../services/joint-plus.service';
import { EventBusService } from '../../services/event-bus.service';
import { SharedEvents } from 'src/assets/joint-plus/controller';
import { importGraphFromJSON, loadStencilShapes, zoomToFit } from 'src/assets/joint-plus/actions';
import { exampleGraphJSON } from '../../constant/utils';
import { STENCIL_WIDTH } from '../../constant/theme';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  host: { class: 'joint-scope' },
  encapsulation: ViewEncapsulation.None
})
export class ChatbotComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('paper') paper!: ElementRef;
  @ViewChild('stencil') stencil!: ElementRef;
  @ViewChild('toolbar') toolbar!: ElementRef;


    public joint!: JointPlusService;
    public stencilOpened = true;
    public jsonEditorOpened = true;
    public fileJSON!: object;

    private subscriptions = new Subscription();

    constructor(private element: ElementRef,
                private eventBusService: EventBusService,
                private cdr: ChangeDetectorRef,
                private renderer: Renderer2) {
    }

    ngOnInit(): void {
        // const { subscriptions, eventBusService } = this;
        // subscriptions.add(
        //     eventBusService.subscribe(SharedEvents.GRAPH_CHANGED, (json: object) => this.onJointGraphChange(json))
        // );
        // subscriptions.add(
        //     eventBusService.subscribe(SharedEvents.JSON_EDITOR_CHANGED, (json: object) => this.onJsonEditorChange(json))
        // );
    }

    ngAfterViewInit(): void {
        // const { element, paper, stencil, toolbar, eventBusService, cdr } = this;
        // this.joint = new JointPlusService(
        //     element.nativeElement,
        //     paper.nativeElement,
        //     stencil.nativeElement,
        //     toolbar.nativeElement,
        //     eventBusService,
        // );
        // this.setStencilContainerSize();
        // this.onStart();
        // cdr.detectChanges();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.joint.destroy();
    }

    public openFile(json: object): void {
        const { joint } = this;
        this.fileJSON = json;
        importGraphFromJSON(joint, json);
        zoomToFit(joint);
    }

    public toggleJsonEditor(): void {
        this.jsonEditorOpened = !this.jsonEditorOpened;
    }

    public toggleStencil(): void {
        this.stencilOpened = !this.stencilOpened;
        this.onStencilToggle();
    }

    private onStart(): void {
        const { joint } = this;
        loadStencilShapes(joint);
        this.openFile(exampleGraphJSON);
    }

    private onJsonEditorChange(json: object): void {
        const { joint } = this;
        if (joint) { importGraphFromJSON(joint, json); }
    }

    private onJointGraphChange(json: object): void {
        this.fileJSON = json;
    }

    private setStencilContainerSize(): void {
        const { renderer, stencil } = this;
        renderer.setStyle(stencil.nativeElement, 'width', `${STENCIL_WIDTH}px`);
        this.onStencilToggle();
    }

    private onStencilToggle(): void {
        const { joint, stencilOpened } = this;
        const { scroller, stencil } = joint;
        if (stencilOpened) {
            stencil.unfreeze();
            scroller.el.scrollLeft += STENCIL_WIDTH;
        } else {
            stencil.freeze();
            scroller.el.scrollLeft -= STENCIL_WIDTH;
        }
    }
}
