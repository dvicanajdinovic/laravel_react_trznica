import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Navbar() {
    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => { 
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Odjava...", res.data.message, "Success!");
                navigate('/home');                
            }
        });
    }


    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link> 
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link> 
                </li>
            </ul>
        );
    } else {
        AuthButtons = (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <button type="button" onClick={logoutSubmit} className="nav-link btn btn-primary btn-sm text-white">Logout</button> 
                </li>
            </ul>
        );
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light shadow sticky-top">
                <div className="container">

                    <Link className="navbar-brand" to="#">Navbar</Link> 

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Naslovna</Link> 
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/about-us">O nama</Link> 
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/contacts">Kontakti</Link> 
                            </li>
                            { AuthButtons }
                        </ul>
                    </div>
                </div>
            </nav>    
        </div>
    )
}

export default Navbar;