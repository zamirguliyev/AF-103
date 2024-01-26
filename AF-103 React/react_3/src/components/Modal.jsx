import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, onAdd, onChange, formData }) => {
  if (!isOpen) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    onAdd();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={onChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={onChange}
            />
          </label>
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={onChange}
            />
          </label>
          <label>
            Is Fired:
            <input
              type="checkbox"
              name="isFired"
              checked={formData.isFired}
              onChange={onChange}
            />
          </label>
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default Modal;
