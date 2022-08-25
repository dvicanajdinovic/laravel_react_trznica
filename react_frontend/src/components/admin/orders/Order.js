import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Order() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [orderInput, setOrder] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        hn: '',
        postcode: '',
        city: '',
        country: '',
        status_id: '',
    });
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setOrder({...orderInput, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        axios.get(`/api/select-status`).then(res => {
            if (res.data.status === 200) {
                setSelectedStatuses(res.data.statuses);
            }
        });
        axios.get(`/api/get-order/${orderId}`).then(res => {
            if (res.data.status === 200) {
                setOrder(res.data.order);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/orders');
            }
            setLoading(false);
        });
    }, []);

    const updateOrder = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('status_id', orderInput.status_id);
        data.append('name', orderInput.name);
        data.append('email', orderInput.email);
        data.append('phone', orderInput.phone);
        data.append('street', orderInput.street);
        data.append('hn', orderInput.hn);
        data.append('postcode', orderInput.postcode);
        data.append('city', orderInput.city);
        data.append('country', orderInput.country);

        axios.put(`/api/update-order/${orderId}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/orders');
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
        });
    }

    if (loading) {
        return <h4>Dohvaćanje podataka u tijeku...</h4>
    }

    return (
        <div className='container-fluid px-4'>
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Uredi podatke <Link to="/admin/orders" className="btn btn-primary btn-sm float-end">Natrag</Link></h4>
                </div>
                <div className="card-body">
                    <form encType="multipart/form-data" onSubmit={ updateOrder } id="update_order">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Osnovni podatci</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#docs-tab-pane" type="button" role="tab" aria-controls="docs-tab-pane" aria-selected="false">Datoteke i ostalo</button>
                        </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Odaberi status</label>
                                    <select name="owner_id" onChange={handleInput} value={orderInput.status_id} className="form-control">
                                    <option> Odaberi </option>
                                        {
                                            selectedStatuses.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}> {item.name} </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Ime i prezime</label>
                                    <input type="text" name="name" onChange={handleInput} value={orderInput.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="text" name="name" onChange={handleInput} value={orderInput.email} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Telefon</label>
                                    <input type="text" name="name" onChange={handleInput} value={orderInput.phone} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Ulica</label>
                                    <input type="text" name="name" onChange={handleInput} value={orderInput.street} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Kućni broj</label>
                                    <input type="text" name="name" onChange={handleInput} value={orderInput.hn} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Poštanski broj</label>
                                    <input type="text" name="name" onChange={handleInput} value={orderInput.postcode} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Grad</label>
                                    <input type="text" name="name" onChange={handleInput} value={orderInput.city} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Država</label>
                                    <input type="text" name="name" onChange={handleInput} value={orderInput.country} className="form-control" />
                                </div>
                                
                            </div>
                            <div className="tab-pane card-body border fade show active" id="docs-tab-pane" role="tabpanel" aria-labelledby="docs-tab" tabIndex="0">
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary px-4 float-end">Spremi</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Order;