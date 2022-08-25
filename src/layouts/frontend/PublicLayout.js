import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

const PublicLayout = () => {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <Outlet />
        </div>
    );
}

export default PublicLayout;