import { Component, OnInit, Input } from '@angular/core';
import { Errors } from '../models';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css']
})
export class ListErrorsComponent implements OnInit {

  formatedErrors: Array<string> = [];
  

  @Input()

  set errors(errorList: Errors) {
   // console.log('errorList: '+ errorList)
        this.formatedErrors= [];
        if(errorList.errors) {
    
      for(let field in errorList.errors) {
        
        this.formatedErrors
    .push(`${field} ${errorList.errors[field]}`);
      }

     // console.log(this.formatedErrors);
     
    }
  }

  get errorList() {
  
    return this.formatedErrors;
;
  }

  constructor() { }

  ngOnInit() {
  }

}
