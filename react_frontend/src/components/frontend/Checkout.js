import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';

function Checkout() {

    const [cart, setCart] = useState([]);
    const [checkoutInput, setCheckoutInput] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        hn: '',
        postcode: '',
        city: '',
        country: '',
    });
    var total = 0;

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

    if (!localStorage.getItem('auth_token')) {
        navigate('/categories');
        swal('Molimo Vas da se prijavite kako biste pristupili svojoj košarici.', 'poruka', 'error');
    }

    useEffect(() => {

        document.title = 'Moja tržnica';

        axios.get(`/api/my-shopping-cart/`).then(res => {
            if (res.data.status === 200) {
                setCart(res.data.list);
                setLoading(false);
            } else if (res.data.status === 401) {
                swal('Molimo Vas da se prijavite kako biste pristupili svojoj košarici', res.data.message, 'error');
                navigate('/categories');
            }
        });
        setLoading(false);
    }, []);

    const handleInput = (e) => {
        e.persist();

        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    const placeOrder = (e) => {
        e.preventDefault();

        const data = {
            name: checkoutInput.name,
            email: checkoutInput.email,
            phone: checkoutInput.phone,
            street: checkoutInput.street,
            hn: checkoutInput.hn,
            postcode: checkoutInput.postcode,
            city: checkoutInput.city,
            country: checkoutInput.country,            
        }

        axios.post(`/api/place-order`, data).then(res => {
            if (res.data.status === 200) {
                swal('Zaprimili smo Vašu narudžbu.');
                setError([]);
                navigate('/order-placed');
            } else if (res.data.status === 422) {
                swal('Molimo Vas da ispunite sva polja.', '', 'error');
                setError(res.data.errors);
            }
        });
    }

    if (loading) {
        return <h4>Dohvaćanje podataka u tijeku...</h4>
    } 

    var displayData = '';
    if (cart.length > 0) {
        displayData = 
            <div>
                <div className='row'>
                    <div className='col-md-7'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Informacije</h4>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-3'>
                                        <label>Ime i prezime</label>
                                            <input type='text' name='name' onChange={ handleInput } value={ checkoutInput.name } className='form-control' />
                                            <small className='text-danger'>{ error.name }</small>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-3'>                                                <label>Email</label>
                                            <input type='text' name='email' onChange={ handleInput } value={ checkoutInput.email } className='form-control' />
                                            <small className='text-danger'>{ error.email }</small>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-3'>
                                            <label>Phone</label>
                                            <input type='text' name='phone' onChange={ handleInput } value={ checkoutInput.phone } className='form-control' />
                                            <small className='text-danger'>{ error.phone }</small>                                            </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-3'>
                                            <label>Ulica</label>
                                            <input type='text' name='street' onChange={ handleInput } value={ checkoutInput.street } className='form-control' />
                                            <small className='text-danger'>{ error.street }</small>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-3'>
                                            <label>Kućni broj</label>
                                            <input type='text' name='hn' onChange={ handleInput } value={ checkoutInput.hn } className='form-control' />
                                            <small className='text-danger'>{ error.hn }</small>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-3'>
                                            <label>Poštanski broj</label>
                                            <input type='text' name='postcode' onChange={ handleInput } value={ checkoutInput.postcode } className='form-control' />
                                            <small className='text-danger'>{ error.postcode }</small>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-3'>
                                            <label>Grad</label>
                                            <input type='text' name='city' onChange={ handleInput } value={ checkoutInput.city } className='form-control' />
                                            <small className='text-danger'>{ error.city }</small>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group mb-3'>
                                            <label>Država</label>
                                            <input type='text' name='country' onChange={ handleInput } value={ checkoutInput.country } className='form-control' />
                                            <small className='text-danger'>{ error.country }</small>
                                        </div>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='form-group text-end'>
                                            <button type='button' className='btn btn-primary' onClick={ placeOrder } >Potvrdi narudžbu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className='col-md-5'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th width='50%'>Naziv</th>
                                    <th>Cijena</th>
                                    <th>Količina</th>
                                    <th>Ukupno</th>
                                </tr>
                            </thead>
                            <tbody>
                                { cart.map( (item, idx) => {
                                    total += item.product.price * item.quantity;
                                    return (
                                        <tr key={ idx }>
                                            <td>{ item.product.name }</td>
                                            <td>{ item.product.price }</td>                                                
                                            <td>{ item.quantity }</td>
                                        <td>{ item.product.price * item.quantity }</td>
                                    </tr>
                                    )
                                })}
                                <tr>
                                    <td colSpan='2' className='text-end fw-bold'>Ukupno:</td>
                                    <td colSpan='2' className='text-end fw-bold'>{ total } kn</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>                    
                </div>
            </div>
    } else {
        displayData =
            <div className='card card-body py-5 text-center shadow-sm'>
                <h4>Vaša košarica je prazna.</h4>
            </div>
    }    

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Vaša narudžba</h6>
                </div>
            </div>

            <div className='py-4'>
                <div className='container'>
                    { displayData }
                </div>
            </div>
        </div>
    )
}

export default Checkout;