import { Directive, OnInit, ViewContainerRef, TemplateRef, Input } from "@angular/core";
import { UserService } from './services';

@Directive(
    {
        selector: '[showAuthed]'
    }
)

export class ShowAuthedDirective implements OnInit {
    constructor(private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private userService: UserService) {}

    
    condition: boolean;

    @Input() set showAuthed(condition: boolean) {
        this.condition = condition
    }

    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            (isAuthenticated) => {
               // console.log('isAuthenticated: ' + isAuthenticated)
                if(isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            }
        )
    }
}