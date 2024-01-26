import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Employee from './Employee';
import EditEmployee from './EditEmployee';

const EmployeeTable = ({ employees, onFire, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [totalSalary, setTotalSalary] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedEmployee(null);
    setEditModalOpen(false);
  };

  const handleSaveEdit = (updatedEmployee) => {
    onEdit(updatedEmployee);
    handleCloseEditModal();
  };

  useEffect(() => {
    const sumSalary = employees.reduce((sum, employee) => sum + Number(employee.salary), 0);
    setTotalSalary(sumSalary);
  }, [employees]);

  const handleSort = (field) => {
    setSortBy(field);
  };

  const filteredAndSortedEmployees = employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'isFired') {
        return a[sortBy] - b[sortBy];
      } else if (sortBy === 'salary' || sortBy === 'age') {
        return a[sortBy] - b[sortBy];
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => handleSort('isFired')}>Sort by Fired</button>
      <button onClick={() => handleSort('salary')}>Sort by Salary</button>
      <button onClick={() => handleSort('age')}>Sort by Age</button>
      <p>Total Salary: {totalSalary}</p>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('surname')}>Surname</th>
            <th onClick={() => handleSort('age')}>Age</th>
            <th onClick={() => handleSort('salary')}>Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedEmployees.map((employee) => (
            <Employee
              key={employee.id}
              employee={employee}
              onFire={onFire}
              onEdit={handleOpenEditModal}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      {editModalOpen && (
        <EditEmployee
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          employee={selectedEmployee}
          onSave={(updatedEmployee) => handleSaveEdit(updatedEmployee)}
        />
      )}
    </div>
  );
};

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
  onFire: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeTable;
