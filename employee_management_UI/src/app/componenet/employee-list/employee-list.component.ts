import { Component, Inject, OnInit } from '@angular/core';
import { IEmployee } from '../../Interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: IEmployee[] = [];
  displayedColumns: string[] = ['id', 'Name', 'email', 'phone','age','salary'];
  // Using Inject to get the service instance
  //httpService: HttpService = Inject(HttpService);
  //@Inject(HttpService) httpService!: HttpService;
  constructor(private httpService:HttpService){ }
  ngOnInit(){
    this.httpService.getAllEmployee().subscribe((result) => {
        console.log(result);
        this.employeeList = result;
    });
  }
}
