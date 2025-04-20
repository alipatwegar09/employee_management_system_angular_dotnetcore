import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../Interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
formBuilder=inject(FormBuilder)
httpService=inject(HttpService)
router=inject(Router)
route=inject(ActivatedRoute)
isEdit=false;
employeeId!:number;

employeeform=this.formBuilder.group({
  name:['',[Validators.required]],
  email:['',[Validators.required,Validators.email]],
  phone:['',[]],
  age:[0,[Validators.required]],
  salary:[0,[Validators.required]]
})
ngOnInit(){
  this.employeeId=this.route.snapshot.params['id']
  if(this.employeeId){
    this.isEdit=true;
    this.httpService.getEmployee(this.employeeId).subscribe((result)=>{
      console.log(result)
      this.employeeform.patchValue(result)
      //this.employeeform.controls.email.disable();
     // this.employeeform.controls['email'].disable({ emitEvent: false });

    })
  }
  }
formSubmit(){
  console.log(this.employeeform.value)
  const employee:IEmployee={
    name:this.employeeform.value.name!,
    email:this.employeeform.value.email!,
    phone:this.employeeform.value.phone!,
    age:this.employeeform.value.age!,
    salary:this.employeeform.value.salary!,
  }
  if(this.isEdit){
    this.httpService.UpdateEmployee(this.employeeId,employee).subscribe(()=>{
      console.log('success')
      this.router.navigate(['/'])
    })
  }
  else{
    this.httpService.addEmployee(employee).subscribe(()=>{
      console.log('success')
      this.router.navigate(['/'])
    })
  }
  
}
}
