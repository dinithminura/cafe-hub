import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Select, message, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeById, addEmployee, editEmployee } from '../../redux/actions/employeeActions';
import { fetchCafes } from '../../redux/actions/cafeActions';

const { Option } = Select;

const EmployeeForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const employee = useSelector((state) => state.employees?.employee || {});
  const cafes = useSelector((state) => state.cafes?.cafes || []);
  const loading = useSelector((state) => state.employees?.loading || false);

  const [initialValues, setInitialValues] = useState({
    name: '',
    email_address: '',
    phone_number: '',
    gender: '',
    cafe_id: null,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id));
    }
    dispatch(fetchCafes());
  }, [id, dispatch]);

  useEffect(() => {
    if (employee) {
      setInitialValues(employee);
      form.setFieldsValue(employee);
    }
  }, [employee, form]);

  const handleSubmit = (values) => {
    const action = id ? editEmployee(id, values) : addEmployee(values);

    dispatch(action)
      .then(() => {
        message.success('Employee saved successfully');
        navigate('/employees');
      })
      .catch(() => {
        message.error('Error saving employee');
      });
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div>
      <h2>{id ? 'Edit Employee' : 'Add New Employee'}</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input the name!' },
            { min: 6, message: 'Name must be at least 6 characters' },
            { max: 10, message: 'Name must be at most 10 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email_address"
          rules={[
            { required: true, message: 'Please input the email address!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone_number"
          rules={[
            { required: true, message: 'Please input the phone number!' },
            { pattern: /^[89]\d{7}$/, message: 'Please enter a valid Singapore phone number (starts with 8 or 9, and has 8 digits)' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select the gender!' }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Assigned Café"
          name="cafe_id"
        >
          <Select placeholder="Select a café" allowClear>
            {cafes.map((cafe) => (
              <Option key={cafe.id} value={cafe.id}>{cafe.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>{id ? 'Update' : 'Create'}</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmployeeForm;
