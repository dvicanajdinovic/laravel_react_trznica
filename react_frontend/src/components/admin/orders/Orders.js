import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Orders() {

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        document.title = 'Moja tržnica';

        axios.get(`/api/get-all-orders`).then(res => {
            if (res.status === 200) {
                setOrders(res.data.orders);
                setLoading(false);
            }
        });
    }, []);

    var displayData = '';
    if (loading) {
        return <h4>Dohvaćanje podataka u tijeku...</h4>
    } else {
        var active = '';

        displayData = orders.map( (item) => {
            return (
                <tr key={ item.id }>
                    <td>{ item.id }</td>
                    <td>{ item.phone }</td>
                    <td>{ item.email }</td>
                    <td> <Link to={`/admin/orders/${ item.id }`} className='btn btn-success btn-sm'> Detalji </Link></td>
                </tr>
            )
        });
    }

    return (
            <div className='card mt-3 px-4'>
                <div className='card-header'>
                    <h4> Narudžbe </h4>
                </div>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table table-bordered table-stripped'> 
                            <thead>
                                <tr>
                                    <th>Broj narudžbe</th>
                                    <th>Telefonski broj</th>
                                    <th>Adresa e-pošte</th>
                                    <th>Uredi</th>
                                </tr>
                            </thead>
                            <tbody>
                                { displayData }
                            </tbody>
                        </table>
                        </div>
                </div>
            </div>
    )
}

export default Orders;