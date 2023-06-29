import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import catData from '../services/cats.json';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit{
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  addForm !: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.addForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      age: new FormControl(null, [Validators.required, Validators.min(1)]),
      breed: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      weight: new FormControl(null, [Validators.required, Validators.min(1)]),
      owner: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  onCancel(): void {
    this.closeModal.emit(true);
  }

  onOk(): void {
    console.log(this.addForm);
    catData.push(this.addForm.value);
    this.addForm.reset();
    this.closeModal.emit(true);
    console.log("ok");
  }
}
