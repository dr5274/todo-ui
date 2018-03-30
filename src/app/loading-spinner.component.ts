import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading-spinner',
    template: '<img *ngIf="loading" src="../assets/images/loading{{image}}.gif" />'
})
export class LoadingSpinnerComponent {
    @Input() image: number;
    @Input() loading: boolean;

    constructor() {
        this.image = 2; // set default
    }
}
