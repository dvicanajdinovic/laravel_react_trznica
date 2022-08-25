import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Statistika</div>
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Statistika
                    </Link>
                  
                    <Link className="nav-link" to="/admin/account">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Moj profil
                    </Link>

                    <div className="sb-sidenav-menu-heading">Proizvodi</div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Informacije
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-product">Novi proizvod</Link>
                            <Link className="nav-link" to="/admin/products">Lista</Link>
                        </nav>
                    </div>


                    <div className="sb-sidenav-menu-heading">Kategorije</div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Informacije
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-category">Nova kategorija</Link>
                            <Link className="nav-link" to="/admin/categories">Sve kategorije</Link>
                        </nav>
                    </div>


                    <div className="sb-sidenav-menu-heading">Trgovine</div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Informacije
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-shop">Nova trgovina</Link>
                            <Link className="nav-link" to="/admin/shops">Sve trgovine</Link>
                        </nav>
                    </div>


                    <div className="sb-sidenav-menu-heading">Narudžbe</div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Informacije
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/orders">Lista narudžbi</Link>
                        </nav>
                    </div>

                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                Authentication
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="#">Login</Link>
                                    <Link className="nav-link" to="#">Register</Link>
                                    <Link className="nav-link" to="#">Forgot Password</Link>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Error
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="#">401 Page</Link>
                                    <Link className="nav-link" to="#">404 Page</Link>
                                    <Link className="nav-link" to="#">500 Page</Link>
                                </nav>
                            </div>
                        </nav>
                    </div>
                    <div className="sb-sidenav-menu-heading">Upute za korištenje</div>
                
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Moja tržnica</div>
                2022
            </div>
        </nav>
    );
}

export default Sidebar;