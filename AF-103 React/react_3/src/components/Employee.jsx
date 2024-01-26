import React from 'react';
import PropTypes from 'prop-types';

const Employee = ({ employee, onFire, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(employee);
  };

  return (
    <tr style={{ color: employee.isFired ? 'red' : 'black' }}>
    <td>{employee.name}</td>
    <td>{employee.surname}</td>
    <td>{employee.age}</td>
    <td>{employee.salary}</td>
    <td>{employee.isFired ? 'Fired' : 'Active'}</td>
    <td>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => onFire(employee.id)}>Fire</button>
      <button onClick={() => onDelete(employee.id)}>Delete</button>
    </td>
  </tr>
  );
};

Employee.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    salary: PropTypes.number.isRequired,
    isFired: PropTypes.bool.isRequired,
  }).isRequired,
  onFire: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Employee;
