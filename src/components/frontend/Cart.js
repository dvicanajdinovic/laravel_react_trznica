import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';

function Cart() {
    const [cart, setCart] = useState([]);
    var total = 0;

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    if (!localStorage.getItem('auth_token')) {
        navigate('/categories');
        swal('Molimo Vas da se prijavite kako biste pristupili svojoj košarici.', '', 'error');
    }

    useEffect(() => {

        document.title = 'Moja tržnica';

        axios.get(`/api/my-shopping-cart/`).then(res => {
            if (res.data.status === 200) {
                setCart(res.data.list);
                setLoading(false);
            } else if (res.data.status === 401) {
                swal('Molimo Vas da se prijavite kako biste pristupili svojoj košarici', '', 'error');
                navigate('/categories');
            }
        });
        setLoading(false);
    }, []);

    const decreaseProductQuantity = (id) => {
        setCart(cart => 
            cart.map( (item) => 
                id === item.id ? {...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0)} : item
            )
        );
        updateQuantity(id, '-');
    }

    const increaseProductQuantity = (id) => {
        setCart(cart => 
            cart.map( (item) => 
                id === item.id ? {...item, quantity: item.quantity + 1} : item
            )
        );
        updateQuantity(id, '+');
    }

    function updateQuantity(id, s) {
        axios.put(`/api/update-product-quantity/${ id }/${ s }`).then(res => {
        });
    }

    const removeProduct = (e, id) => {
        e.preventDefault();

        const clicked = e.currentTarget;

        clicked.innerText = 'Otkazano...';

        axios.delete(`/api/remove-product-from-cart/${ id }`).then(res => {
            if (res.data.status === 200) {
                swal('Uklonili ste proizvod iz košarice.', res.data.message, 'success');
                clicked.closest('tr').remove();
            } else if (res.data.status === 404) {
                swal('Greška u sustavu.', res.data.message, 'error');
                clicked.innerText = 'Ukloni';
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
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Fotografija</th>
                                <th className='text-center'>Naziv</th>
                                <th className='text-center'>Cijena</th>
                                <th className='text-center'>Količina</th>
                                <th className='text-center'>Ukupna cijena</th>
                                <th>Ukloni</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cart.map( (item, idx) => {
                                total += item.product.price * item.quantity;
                                return (
                                    <tr key={ idx }>
                                        <td width='10%'>
                                            <img src={ `http://localhost:8000/${item.product.photo}` } alt={ item.product.name } width='50px' height='50px' />
                                        </td>
                                        <td>{ item.product.name }</td>
                                        <td width='15%' className='text-center'>{ item.product.price }</td>
                                        <td width='15%'>
                                            <div className='input-group'>
                                                <button type='button' onClick={ () => decreaseProductQuantity(item.id) } className='input-group-text'>-</button>
                                                <div className='form-control text-center'>{ item.quantity }</div>
                                                <button type='button' onClick={ () => increaseProductQuantity(item.id) } className='input-group-text'>+</button>
                                            </div>
                                        </td>
                                        <td width='15%' className='text-center'>{ item.product.price * item.quantity }</td>
                                        <td width='10%'>
                                            <button type='button' onClick={ (e) => removeProduct(e, item.id) } className='btn btn-danger btn-sm'>Ukloni</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='row'>
                    <div className='col-md-8'></div>       
                        <div className='col-md-4'>
                            <div className='card card-body mt-3'> 
                                <h4>Ukupno:
                                    <span className='float-end'>{ total }</span>
                                </h4>
                                <h4>Ukupno:
                                    <span className='float-end'>Kod za popust</span>
                                </h4>
                                <hr />
                                <Link to='/checkout' className='btn btn-primary'>Sljedeći korak</Link>
                            </div>
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
                    <h6>Moja tržnica</h6>
                </div>
            </div>

            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            { displayData }
                        </div>                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;