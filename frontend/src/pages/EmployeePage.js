import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../redux/actions/employeeActions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const EmployeePage = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.employees);
    const loading = useSelector((state) => state.employees.loading);
    const cafe = new URLSearchParams(window.location.search).get('cafe');

    useEffect(() => {
        const cafeId = cafe ? cafe : ''
        dispatch(fetchEmployees(cafeId));
    }, [dispatch, cafe]);
    
    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this employee?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                dispatch(deleteEmployee(id))
                    .then(() => {
                        message.success('Employee deleted successfully');                        
                    })
                    .catch(() => {
                        message.error('Error deleting employee');
                    });
            },
        });
    };

    const columns = [
        { headerName: 'Employee ID', field: 'id', flex: 1, maxWidth: 120 },
        { headerName: 'Name', field: 'name', flex: 1 },
        { headerName: 'Email Address', field: 'email_address', flex: 1, minWidth: 200 },
        { headerName: 'Phone Number', field: 'phone_number', flex: 1 },
        {
            headerName: 'Days Worked',
            field: 'days_worked',
            valueGetter: (params) => {
                if (params.data.start_date) {
                    const startDate = new Date(params.data.start_date);
                    const today = new Date();
                    return Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
                }
                return '-';
            },
            flex: 1,
            maxWidth: 130
        },
        { headerName: 'Café Name', valueGetter: (params) => params.data.Cafe && params.data.Cafe.name ? params.data.Cafe.name : '-', flex: 1 },
        {
            headerName: 'Action',
            field: 'action',
            cellRenderer: (params) => (
                <span>
                    <Button type="link" onClick={() => handleEditEmployee(params.data.id)}>Edit</Button>
                    <Button type="link" onClick={() => handleDelete(params.data.id)} danger>Delete</Button>
                </span>
            ),
            flex: 1
        },
    ];

    const navigate = useNavigate();
    const handleAddEmployee = () => {
        navigate('/employees/add');
    };

    const handleEditEmployee = (id) => {
        navigate(`/employees/${id}`);
    };

    return (
        <div>
            <h2>All Employees</h2>
            <Button onClick={handleAddEmployee} type="primary" style={{ marginBottom: 16 }}>Add New Employee</Button>
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                <AgGridReact
                    rowData={employees}
                    columnDefs={columns}
                    rowSelection="single"
                    loadingOverlayComponent="Loading..."
                    noRowsOverlayComponent="No Rows"
                    domLayout='autoHeight'
                />
            </div>
        </div>
    );
};

export default EmployeePage;
