import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import CafesPage from '../pages/CafePage';
import EmployeesPage from '../pages/EmployeePage';
import CafeForm from '../components/Cafe/CafeForm';
import EmployeeForm from '../components/Employee/EmployeeForm';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainLayout><CafesPage /></MainLayout>}
        />
        <Route
          path="/cafes"
          element={<MainLayout><CafesPage /></MainLayout>}
        />
        <Route
          path="/employees"
          element={<MainLayout><EmployeesPage /></MainLayout>}
        />
        <Route path="/cafes/:id" element={<MainLayout><CafeForm /></MainLayout>} />
        <Route path="/cafes/add" element={<MainLayout><CafeForm /></MainLayout>} />        
        <Route path="/employees/:id" element={<MainLayout><EmployeeForm /></MainLayout>} />
        <Route path="/employees/add" element={<MainLayout><EmployeeForm /></MainLayout>} />        
      </Routes>
    </Router>
  );
};

export default AppRouter;
