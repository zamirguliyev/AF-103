import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import AddEmployee from './components/AddEmployee';

const App = () => {
  const [employees, setEmployees] = useState([]);

  const handleFire = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, isFired: true }
          : employee
      )
    );
  };

  const handleEdit = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const handleDelete = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== employeeId)
    );
  };

  const handleAdd = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  return (
    <>
      <h1 style={{textAlign:"center"}}>Zamir App</h1>
      <AddEmployee onAdd={handleAdd} />
      <EmployeeTable
        employees={employees}
        onFire={handleFire}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default App;
