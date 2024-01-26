import React, { useState } from 'react';
import { Input, Select, Button, List } from 'antd';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Student, Employee, Position } from './class';

const { Option } = Select;

const Human: React.FC = () => {
  const [listItems, setListItems] = useState<any[]>([]);

  type newHuman = {
    name: string,
    surname: string,
    age: string | number,
    type: string,
    groupName: string,
    GPA: string | number,
    hobbies: string | string[],
    salary: string | number,
    skills: string | string[],
    position: string
  }

  const initialValues: newHuman = {
    name: '',
    surname: '',
    age: '',
    type: '',
    groupName: '',
    GPA: '',
    hobbies: '',
    salary: '',
    skills: '',
    position: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    age: Yup.number().required('Age is required').positive().integer(),
    type: Yup.string().required('Please select a type'),
    groupName: Yup.string(),
    GPA: Yup.number(),
    hobbies: Yup.string(),
    salary: Yup.number(),
    skills: Yup.string(),
    position: Yup.string()
  });

  const handleTypeChange = (value: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    setFieldValue('type', value);
  };

  const handleSubmit = (values:any, { resetForm }: any) => {
    const { type, ...humnaArm } = values;
    let newItem;
    if (type === 'Student') {
      const { groupName, GPA, hobbies } = humnaArm;
      newItem = new Student(values.name, values.surname, parseInt(values.age), groupName, hobbies.split(','), parseFloat(GPA));
    } else if (type === 'Employee') {
      const { salary, skills, position } = humnaArm;
      newItem = new Employee(values.name, values.surname, parseInt(values.age), parseFloat(salary), skills.split(','), position as Position);
    }
    setListItems([...listItems, newItem]);
    resetForm();
  };

  return (
    <div>
      <h1>Human Task</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty, isValid, values, setFieldValue }) => (
          <FormikForm>
            <div style={{margin:'10px 0'}}>
              <Field name="name" as={Input} placeholder="Name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <Field name="surname" as={Input} placeholder="Surname" />
              <ErrorMessage name="surname" component="div" />
            </div>
            <div  style={{margin:'10px 0'}}>
              <Field name="age" as={Input} placeholder="Age" type="number" />
              <ErrorMessage name="age" component="div" />
            </div>
            <div>
              <Field
                style={{ width: '150px' }}
                name="type"
                as={Select}
                placeholder="Select a type"
                onChange={(value: any) => handleTypeChange(value, setFieldValue)}
              >
                 <Option style={{display:'none'}} value="">Select</Option>
                <Option value="Student">Student</Option>
                <Option value="Employee">Employee</Option>
              </Field>
              <ErrorMessage name="type" component="div" />
            </div>

            {values.type === 'Student' && (
              <div>
                <Field  style={{margin:'10px 0'}} name="groupName" as={Input} placeholder="Group Name" />
                <ErrorMessage name="groupName" component="div" />
                <Field   style={{margin:'10px 0'}}name="GPA" as={Input} placeholder="GPA" />
                <ErrorMessage name="GPA" component="div" />
                <Field  style={{margin:'10px 0'}} name="hobbies" as={Input} placeholder="Hobbies" />
                <ErrorMessage name="hobbies" component="div" />
              </div>
            )}
            {values.type === 'Employee' && (
              <div>
                <Field  style={{margin:'10px 0'}} name="salary" as={Input} placeholder="Salary" />
                <ErrorMessage name="salary" component="div" />
                <Field  name="skills" as={Input} placeholder="Skills" />
                <ErrorMessage name="skills" component="div" />
                <Field style={{ width: '150px',margin:'10px 0' }} name="position" as={Select} placeholder="Select position">
                  {Object.values(Position).map((pos, i) => (
                    <Option key={i} value={pos}>
                      {pos}
                    </Option>
                  ))}
                </Field>
                <ErrorMessage name="position" component="div" />
              </div>
            )}

            <Button  style={{margin:'10px 0'}} type="primary" htmlType="submit" disabled={!dirty || !isValid}>
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>

      <List
        
        bordered
        dataSource={listItems}
        renderItem={(item, index) => (
          <List.Item key={index}>
            {item.getInfo()}
            {item instanceof Student && (
              <>
                <div>
                  Group Name: {item.groupName}<br />
                  GPA: {item.GPA}<br />
                  Hobbies: {item.hobbies.join(', ')}
                </div>
                <hr />
              </>
            )}
            {item instanceof Employee && (
              <>
                <div>
                  Salary: {item.salary}<br />
                  Skills: {item.skills.join(', ')}<br />
                  Position: {item.position}
                </div>
                <hr />
              </>
            )}
          </List.Item>
        )}
      />

    </div>
  );
};

export default Human;
