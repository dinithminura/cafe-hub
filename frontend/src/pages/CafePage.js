import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCafes, deleteCafe } from '../redux/actions/cafeActions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Input, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const CompanyLogoRenderer = ({ value }) => (
    <span style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center' }}>
        {value && (
            <img
                alt={`${value} logo`}
                src={`http://localhost:3000/uploads/logos/${value}`}
                style={{
                    display: 'block',
                    width: '20px',
                    height: 'auto',
                    maxHeight: '50%',
                    marginRight: '12px',
                    filter: 'brightness(1.1)',
                }}
            />
        )}
        {!value && <p>-</p>}
    </span>
);

const CafePage = () => {
    const dispatch = useDispatch();
    const cafes = useSelector((state) => state.cafes.cafes);
    const loading = useSelector((state) => state.cafes.loading);
    const [location, setLocation] = React.useState('');

    useEffect(() => {
        dispatch(fetchCafes(location));
    }, [dispatch, location]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this cafe?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                dispatch(deleteCafe(id))
                    .then(() => {
                        message.success('Cafe deleted successfully');                        
                    })
                    .catch(() => {
                        message.error('Error deleting cafe');
                    });
            },
        });
    };

    const columns = [
        { headerName: 'Logo', field: 'logo', cellRenderer: CompanyLogoRenderer, flex: 1, maxWidth: 80 },
        { headerName: 'Cafe Name', field: 'name', flex: 1 },
        { headerName: 'Description', field: 'description', flex: 1 },
        {
            headerName: 'Employees',
            field: 'employees',
            cellRenderer: (params) => <Link to={`/employees?cafe=${params.data.id}`}>View Employees</Link>,
            flex: 1
        },
        { headerName: 'Location', field: 'location', flex: 1 },
        {
            headerName: 'Action',
            field: 'action',
            cellRenderer: (params) => (
                <span>
                    <Button type="link" onClick={() => handleEditCafe(params.data.id)}>Edit</Button>
                    <Button type="link" onClick={() => handleDelete(params.data.id)} danger>Delete</Button>
                </span>
            ),
            flex: 1
        },
    ];

    const navigate = useNavigate();
    const handleAddCafe = () => {
        navigate('/cafes/add');
    };

    const handleEditCafe = (id) => {
        navigate(`/cafes/${id}`);
    };
    return (
        <div>
            <h2>All Cafés</h2>
            <Input
                placeholder="Filter by location"
                value={location}
                onChange={handleLocationChange}
                style={{ marginBottom: 16 }}
            />
            <Button type="primary" onClick={handleAddCafe} style={{ marginBottom: 16 }}>Add New Café</Button>
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                <AgGridReact
                    rowData={cafes}
                    columnDefs={columns}
                    rowSelection="single"
                    loadingOverlayComponent="Loading..."
                    noRowsOverlayComponent="No Rows"                    
                />
            </div>
        </div>
    );
};

export default CafePage;
