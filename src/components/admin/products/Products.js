import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Products() {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {

        document.title = "Proizvodi";

        axios.get(`/api/get-products`).then(res => {
            if (res.status === 200) {
                setProducts(res.data.products);
                setLoading(false);
            }
        });
    }, []);

    var products_HTMLTABLE = "";
    if (loading) {
        return <h4>Molimo pričekajte...</h4>
    } else {
        var active = '';

        products_HTMLTABLE = products.map( (item) => {
            if (item.active === '0') {
                active = 'Ne';
            } else {
                active = 'Da';
            }
            return (
                <tr key={ item.id }>
                    <td>{ item.id }</td>
                    <td>{ item.category.name }</td>
                    <td>{ item.name }</td>
                    <td><img src={ `http://localhost:8000/${item.photo}` } width="50px" alt={ item.name } /></td>
                    <td>{ item.price }</td>
                    <td>{ active }</td>
                    <td> <Link to={`/admin/products/${ item.id }`} className="btn btn-success btn-sm"> Uredi </Link></td>
                </tr>
            )
        });
    }

    return (
            <div className="card mt-3 px-4">
                <div className="card-header">
                    <h4> Svi proizvodi
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Dodaj</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-stripped"> 
                            <thead>
                                <tr>
                                    <th>Broj</th>
                                    <th>Kategorija</th>
                                    <th>Ime</th>
                                    <th>Fotografija</th>
                                    <th>Cijena</th>
                                    <th>Aktivan</th>
                                    <th>Uredi</th>
                                </tr>
                            </thead>
                            <tbody>
                                { products_HTMLTABLE }
                            </tbody>
                        </table>
                        </div>
                </div>
            </div>
    )
}

export default Products;