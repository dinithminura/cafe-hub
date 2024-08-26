import React, { useEffect } from 'react';
import { Form, Input, Button, message, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCafeById, addCafe, editCafe } from '../../redux/actions/cafeActions';

const { TextArea } = Input;

const CafeForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const cafe = useSelector((state) => state.cafes?.cafe || {});
    const loading = useSelector((state) => state.cafes?.loading || false);

    useEffect(() => {
        if (id) {
            dispatch(fetchCafeById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (cafe && id) {
            form.setFieldsValue({
                name: cafe.name,
                description: cafe.description,
                location: cafe.location,
                logo: cafe.logo ? [cafe.logo] : [],
            });
        }
    }, [cafe, form, id]);

    const handleSubmit = (values) => {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        const action = id ? editCafe(id, formData) : addCafe(formData);

        dispatch(action)
            .then(() => {
                message.success('Cafe saved successfully');
                navigate('/cafes');
            })
            .catch(() => {
                message.error('Error saving cafe');
            });
    };

    return (
        <div>
            <h2>{id ? 'Edit Café' : 'Add New Café'}</h2>
            <Form
                form={form}
                layout="vertical"
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
                    label="Description"
                    name="description"
                    rules={[
                        { required: true, message: 'Please input the description!' },
                        { max: 256, message: 'Description must be at most 256 characters' },
                    ]}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: 'Please input the location!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" loading={loading}>{id ? 'Update' : 'Create'}</Button>
                        <Button onClick={() => navigate('/cafes')}>Cancel</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CafeForm;
