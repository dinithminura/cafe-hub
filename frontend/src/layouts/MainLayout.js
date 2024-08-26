import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Common/Sidebar'; // Import the Sidebar component

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="site-layout-header">
                <div className="logo-container">
                    <img src="/images/cafe_hub_logo.jpeg" alt="Cafe Hub" className="logo" />
                    <h1 className="app-name">Café Hub</h1>
                </div>
            </Header>
            <Layout style={{ flexDirection: 'row' }}>
                <Sidebar /> {/* Sidebar placed below Header */}
                <Layout style={{ flex: 1, padding: '0 24px', minHeight: 280 }}>
                    <Content style={{ padding: 24, margin: 0, minHeight: 360 }}>
                        {children} {/* Render child components here */}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        {/* Add footer content if needed */}
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
