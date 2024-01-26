import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditEmployee = ({ isOpen, onClose, employee, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    salary: '',
    isFired: false,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        surname: employee.surname,
        age: employee.age,
        salary: employee.salary,
        isFired: employee.isFired,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave({
      ...employee,
      ...formData,
    });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </label>
          <label>
            Is Fired:
            <input
              type="checkbox"
              name="isFired"
              checked={formData.isFired}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

EditEmployee.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  employee: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default EditEmployee;
