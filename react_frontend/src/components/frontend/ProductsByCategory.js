import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';

function ProductsByCategory() {

    const { categoryKeyname } = useParams();

    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        document.title = "Kategorije";

        axios.get(`/api/display-products-by-category/${categoryKeyname}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setProducts(res.data.products);
                setLoading(false);
            } else if (res.data.status === 400) {
                //No products in this category.
                setLoading(false);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/categories');
            }
        });
    }, []);

    var displayData = '';
    if (loading) {
        return <h4>Dohvaćanje podataka u tijeku...</h4>
    } else {
        if (products.length > 0) {
            displayData = products.map( (item, idx) => {
                return (
                    <div className='col-md-3' key={ idx }>
                        <div className='card'>
                            <Link to={`/categories/${ item.category.keyname }/${ item.keyname }`}>
                                <img src={`http://localhost:8000/${ item.photo }`} className='w-100' alt={ item.name }/>
                            </Link>
                            <div className='card-body'>
                                <Link to={`/categories/${ item.category.keyname }/${ item.keyname }`}>
                                    <h5>{ item.name }</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            });
        } else {
            displayData = 
            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card card-body py-5 text-center shadow-sm'>
                                <h6>U ovoj kategoriji trenutno ne postoji ni jedan proizvod.</h6>
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>
        }
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>{ category.name }</h6>
                </div>
            </div>

            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        { displayData }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsByCategory;