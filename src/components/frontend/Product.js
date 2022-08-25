import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';

function Product() {

    const { productKeyname } = useParams();

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        document.title = "Moja tržnica";

        axios.get(`/api/display-product/${productKeyname}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
                console.log(product.name);
                setLoading(false);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/categories');
            }
        });
    }, []);

    const decreaseProductQuantity = () => {
        if (quantity > 1) {
            setQuantity(counter => counter - 1);
        }
    }

    const increaseProductQuantity = () => {
        if (quantity < 10) {
            setQuantity(counter => counter + 1);
        }
    }

    const addToCart = (e) => {
        e.preventDefault();

        const data= {
            product_id: product.id,
            quantity: quantity,
        }

        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                swal("Proizvod je dodan u košaricu!", res.data.message, "success");
            } else if (res.data.status === 409) {
                swal("Nažalost trenutno ne možemo isporučiti proizvod u traženoj količini.", res.data.message, "warning");
            } else if (res.data.status === 401) {
                swal("Molimo Vas da se prijavite kako bi dodali proizvod u košaricu.", res.data.message, "error");
            }
        });
    }

    if (loading) {
        return <h4>Dohvaćanje podataka u tijeku...</h4>
    } else {
        var productAvailable = '';
        if (product.quantity > 0) {
            productAvailable =
                <div>
                    <label className='btn-sm btn-success px-4 mt-2'> Dostupno </label>

                    <div className='row'>
                        <div className='col-md-3 mt-3'>
                            <div className='input-group'>
                                <button type="button" onClick={decreaseProductQuantity} className="input-group-text">-</button>
                                <div className="form-control text-center">{ quantity }</div>
                                <button type="button" onClick={increaseProductQuantity} className="input-group-text">+</button>
                            </div>
                        </div>
                        <div className='col-md-3 mt-3'>
                            <button type="button" onClick={addToCart} className="btn btn-primary w-100">Dodaj u košaricu</button>
                        </div>
                    </div>
                </div>
        } else {
            productAvailable =
                <div>
                    <label className='btn-sm btn-danger px-4 mt-2'> *Proizvod je trenutno nedostupan. </label>
                </div>           
        }
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>{product.category.name} / { product.name }</h6>
                </div>
            </div>

            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-md-4 border-end">
                            <img src={ `http://localhost:8000/${product.photo}` } alt={ product.name } className="w-100" />
                        </div>
                        <div className='col-md-8'>
                            <h4>
                                { product.name }
                                <span className='float-end badge btn-sm btn-danger badge-pil'>{ product.shop.name }</span>
                            </h4>

                            <p>{ product.description }</p>
                            <h4>
                                { product.price }kn
                            </h4>

                            <div>
                                { productAvailable }
                            </div>

                            <button type="button" className="btn btn-danger mt-3">Dodaj na wishlistu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;