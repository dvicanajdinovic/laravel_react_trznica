import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Product() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [productInput, setProduct] = useState({
        category_id: '',
        shop_id: '',
        name: '',
        description: '',
        quantity: '',
        price: '',
        active: '',
        approved: ''
    });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedShops, setSelectedShops] = useState([]);
    const [productPhoto, setProductPhoto] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [productCheckbox, setProductCheckbox] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value});
    }
    const handleProductPhoto = (e) => {
        setProductPhoto({ photo:e.target.files[0] });
    }
    const handleCheckbox = (e) => {
        e.persist();
        setProductCheckbox({...productCheckbox, [e.target.name]: e.target.checked});
    }

    useEffect(() => {
        axios.get(`/api/select-category`).then(res => {
            if (res.data.status === 200) {
                setSelectedCategories(res.data.categories);
            }
        });
        axios.get(`/api/select-shop`).then(res => {
            if (res.data.status === 200) {
                setSelectedShops(res.data.shops);
            }
        });
        axios.get(`/api/get-product/${productId}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
                setProductCheckbox(res.data.product);
                setProductPhoto(res.data.product);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/products');
            }
            setLoading(false);
        });
    }, []);

    const updateProduct = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('category_id', productInput.category_id);
        data.append('name', productInput.name);
        data.append('description', productInput.description);
        data.append('price', productInput.price);
        data.append('quantity', productInput.quantity);
        data.append('active', productCheckbox.active ? '1' : '0');
        data.append('approved', productCheckbox.approved ? '1' : '0');
        data.append('photo', productPhoto.photo);

        axios.post(`/api/update-product/${productId}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/products');
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
                    <h4>Uredi kategoriju <Link to="/admin/products" className="btn btn-primary btn-sm float-end">Natrag</Link></h4>
                </div>
                <div className="card-body">
                    <form encType="multipart/form-data" onSubmit={ updateProduct } id="update_product">
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
                                    <label>Odaberi kategoriju</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                    <option> Odaberi </option>
                                        {
                                            selectedCategories.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}> {item.name} </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Odaberi trgovinu / proizvođača</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.shop_id} className="form-control">
                                    <option> Odaberi </option>
                                        {
                                            selectedShops.map((shopItem) => {
                                                return (
                                                    <option value={shopItem.id} key={shopItem.id}> {shopItem.name} </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Naziv</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Opis</label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Količina</label>
                                    <input type="text" name="quantity" onChange={handleInput} value={productInput.quantity}/>               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Price</label>
                                    <input type="text" name="price" onChange={handleInput} value={productInput.price}/>               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Aktivno</label>
                                    <input type="checkbox" name="active" onChange={handleCheckbox} defaultChecked={productCheckbox.active === 1 ? true : false} className="w-50 h-50" />               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Odobreno</label>
                                    <input type="checkbox" name="approved" onChange={handleCheckbox} defaultChecked={productCheckbox.approved === 1 ? true : false} className="w-50 h-50" />               
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade show active" id="docs-tab-pane" role="tabpanel" aria-labelledby="docs-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Fotografija</label>
                                    <input type="file" name="photo" onChange={handleProductPhoto}/> 
                                    <img src={ `http://localhost:8000/${productInput.photo}` } width="50px" alt={ productInput.name } />        
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary px-4 float-end">Spremi</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Product;