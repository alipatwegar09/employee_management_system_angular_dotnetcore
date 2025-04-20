import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IEmployee } from './Interfaces/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiurl = "https://localhost:7047";

  //private http: HttpClient = Inject(HttpClient);
  constructor(private http:HttpClient){}
  getAllEmployee(){
    return this.http.get<IEmployee[]>(this.apiurl + "/api/employee");
  }

  addEmployee(employee:IEmployee)
  {
    return this.http.post(this.apiurl+"/api/employee",employee)
  }

  getEmployee(employeeId:number){
    return this.http.get<IEmployee>(this.apiurl+"/api/employee/"+employeeId)
  }
  UpdateEmployee(id:number,employee:IEmployee){
    console.log(id, employee)
    return this.http.put<IEmployee>(this.apiurl+"/api/employee/"+id,employee)
  }
  deleteEmployee(employeeId:number){
    return this.http.delete<IEmployee>(this.apiurl+"/api/employee/"+employeeId)
  }
}
