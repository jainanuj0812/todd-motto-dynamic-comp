import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({ 
  selector: 'dynamic-form',
  template: `
    <form
      class="dynamic-form"
      [formGroup]="form" (ngSubmit)="formSubmitted.emit(form.value)">
      <ng-container
        *ngFor="let field of config;"
        dynamicField
        [config]="field"
        [group]="form">
      </ng-container>
    </form>
  `,
  styleUrls: [
    './dynamic-form.component.scss'
  ]
 })

 export class DynamicFormComponent implements OnInit {
  @Input() config: any[] = [];
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.form = this.createGroup();
  }

  createGroup() {
    let group = this.fb.group({});
    this.config.forEach(control => {
      group.addControl(control.name, this.fb.control());
    });
    return group; 
  }
}

