using crud_employee_system.DAL;
using crud_employee_system.Models;
using Microsoft.AspNetCore.Mvc;

namespace crud_employee_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;


        public EmployeeController(EmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee([FromBody] Employee model)
        {
            await _employeeRepository.AddEmployee(model);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> GetEmployees()
        {
            var employeeList = await _employeeRepository.GetEmployee();
            return Ok(employeeList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployeesById([FromRoute] int id)
        {
            var employee = await _employeeRepository.GetEmployeeById(id);
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateEmployee([FromRoute] int id, [FromBody] Employee model)
        {
            await _employeeRepository.updateEmployee(id, model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteEmployee([FromRoute] int id)
        {
            await _employeeRepository.deleteEmployee(id);
            return Ok();
        }
    }
}
