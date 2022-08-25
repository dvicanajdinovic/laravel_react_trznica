import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Shop() {
    const navigate = useNavigate();
    const { shopId } = useParams();
    const [shopInput, setShop] = useState({
        owner_id: '',
        name: '',
        description: '',
        active: '',
        approved: ''
    });
    const [selectedOwners, setSelectedOwners] = useState([]);
    const [shopPhoto, setShopPhoto] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [shopCheckbox, setShopCheckbox] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setShop({...shopInput, [e.target.name]: e.target.value});
    }
    const handleShopPhoto = (e) => {
        setShopPhoto({ photo:e.target.files[0] });
    }
    const handleCheckbox = (e) => {
        e.persist();
        setShopCheckbox({...shopCheckbox, [e.target.name]: e.target.checked});
    }

    useEffect(() => {
        axios.get(`/api/select-owner`).then(res => {
            if (res.data.status === 200) {
                setSelectedOwners(res.data.owners);
            }
        });
        axios.get(`/api/get-shop/${shopId}`).then(res => {
            if (res.data.status === 200) {
                setShop(res.data.shop);
                setShopCheckbox(res.data.shop);
                setShopPhoto(res.data.shop);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/shops');
            }
            setLoading(false);
        });
    }, []);

    const updateShop = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('owner_id', shopInput.owner_id);
        data.append('name', shopInput.name);
        data.append('description', shopInput.description);
        data.append('active', shopCheckbox.active ? '1' : '0');
        data.append('approved', shopCheckbox.approved ? '1' : '0');
        data.append('photo', shopPhoto.photo);

        axios.put(`/api/update-shop/${shopId}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/shops');
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
                    <h4>Uredi kategoriju <Link to="/admin/shops" className="btn btn-primary btn-sm float-end">Natrag</Link></h4>
                </div>
                <div className="card-body">
                    <form encType="multipart/form-data" onSubmit={ updateShop } id="update_shop">
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
                                    <label>Odaberi vlasnika</label>
                                    <select name="owner_id" onChange={handleInput} value={shopInput.owner_id} className="form-control">
                                    <option> Odaberi </option>
                                        {
                                            selectedOwners.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}> {item.name} </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Naziv</label>
                                    <input type="text" name="name" onChange={handleInput} value={shopInput.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Opis</label>
                                    <textarea name="description" onChange={handleInput} value={shopInput.description} className="form-control"></textarea>               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Aktivno</label>
                                    <input type="checkbox" name="active" onChange={handleCheckbox} defaultChecked={shopCheckbox.active === 1 ? true : false} className="w-50 h-50" />               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Odobreno</label>
                                    <input type="checkbox" name="approved" onChange={handleCheckbox} defaultChecked={shopCheckbox.approved === 1 ? true : false} className="w-50 h-50" />               
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade show active" id="docs-tab-pane" role="tabpanel" aria-labelledby="docs-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Fotografija</label>
                                    <input type="file" name="photo" onChange={handleShopPhoto}/> 
                                    <img src={ `http://localhost:8000/${shopInput.photo}` } width="50px" alt={ shopInput.name } />        
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

export default Shop;