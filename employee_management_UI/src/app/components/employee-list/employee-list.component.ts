import { Component, Inject, OnInit } from '@angular/core';
import { IEmployee } from '../../Interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import e from 'express';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: IEmployee[] = [];
  displayedColumns: string[] = ['id', 'Name', 'email', 'phone','age','salary','action'];
  // Using Inject to get the service instance
  //httpService: HttpService = Inject(HttpService);
  //@Inject(HttpService) httpService!: HttpService;
  constructor(private httpService:HttpService,private router:Router){ }
  ngOnInit(){
    this.httpService.getAllEmployee().subscribe((result) => {
        console.log(result);
        this.employeeList = result;
    });
  }
  EditEmployee(employeeId:number){
    console.log(employeeId);
    this.router.navigateByUrl('employee/'+employeeId)
  }
  DeleteEmployee(employeeId:number){
    this.httpService.deleteEmployee(employeeId).subscribe(()=>{
      console.log("deletetd")
      this.employeeList=this.employeeList.filter((x)=>x.id!=employeeId);
    })
  }
}
