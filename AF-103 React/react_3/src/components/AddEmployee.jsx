import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { v4 as uuidv4 } from 'uuid';

const AddEmployee = ({ onAdd }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    salary: '',
    isFired: false,
  });

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAdd = () => {
    onAdd({
      ...formData,
      id: uuidv4(),
      createDate: new Date().toISOString(),
    });
    setFormData({
      name: '',
      surname: '',
      age: '',
      salary: '',
      isFired: false,
    });
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Add Employee</button>
      <Modal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onAdd={handleAdd}
        onChange={handleChange}
        formData={formData}
      />
    </div>
  );
};

AddEmployee.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddEmployee;
