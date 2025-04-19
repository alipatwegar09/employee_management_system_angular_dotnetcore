using crud_employee_system.Data;
using crud_employee_system.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace crud_employee_system.DAL
{
    public class EmployeeRepository
    {
        private readonly AppDbContext _appDbContext;
        public EmployeeRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task AddEmployee(Employee employee)
        {
            await _appDbContext.Set<Employee>().AddAsync(employee);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetEmployee()
        {
            return await _appDbContext.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _appDbContext.Employees.FindAsync(id);
        }

        public async Task updateEmployee(int id, Employee model)
        {
            var employee = await _appDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                throw new Exception("Employee not found");
            }
            employee.Name = model.Name;
            employee.salary = model.salary;
            employee.Phone = model.Phone;
            employee.Email = model.Email;
            employee.Age = model.Age;
            await _appDbContext.SaveChangesAsync();
        }

        public async Task deleteEmployee(int id)
        {
            var employee = await _appDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                throw new Exception("Employee not found");
            }
            _appDbContext.Employees.Remove(employee);
            await _appDbContext.SaveChangesAsync();
        }

    }
}
