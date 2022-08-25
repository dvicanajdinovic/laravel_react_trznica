import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function AddShop() {

    const [selectedOwners, setSelectedOwners] = useState([]);
    const [shopInput, setShop] = useState({
        owner_id: '',
        name: '',
        description: '',
        active: '',
        approved: ''

    });
    const [shopPhoto, setShopPhoto] = useState([]);
    const [error, setError] = useState([]);
    const handleInput = (e) => {
        e.persist();
        setShop({...shopInput, [e.target.name]: e.target.value})
    }
    const handleShopPhoto = (e) => {
        e.persist();
        setShopPhoto({ photo:e.target.files[0] })
    }

    useEffect(() => {
        axios.get(`/api/select-owner`).then(res => {
            if (res.data.status === 200) {
                setSelectedOwners(res.data.owners);
            }
        });
    }, []);
    
    const addShop = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('owner_id', shopInput.owner_id);
        data.append('name', shopInput.name);
        data.append('description', shopInput.description);
        data.append('active', shopInput.active);
        data.append('approved', shopInput.approved);
        data.append('photo', shopPhoto.photo);
    
        axios.post(`/api/add-shop`, data).then(res => {
            if (res.data.status === 200) {
                swal("Uspješno ste registrirali novi obrt.", "", "success");
                setShop({...shopInput, 
                    owner_id: '',
                    name: '',
                    description: '',
                    active: '',
                    approved: '',
                });
                
                setError([]);
            } else if (res.data.status === 422) {
                swal("Error has happened.", res.data.message, "success");
                setError(res.data.errors);
            }
        });
    }

    return (
        <div className='container-fluid px-4'>
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Registriraj novu trgovinu</h4>
                </div>
                <div className="card-body">
                    <form encType="multipart/form-data" onSubmit={addShop} id="add_product">
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
                                    <input type="checkbox" name="active" onChange={handleInput} value={shopInput.active}/>               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Odobreno</label>
                                    <input type="checkbox" name="approved" onChange={handleInput} value={shopInput.approved}/>               
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade show active" id="docs-tab-pane" role="tabpanel" aria-labelledby="docs-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Fotografija</label>
                                    <input type="file" name="photo" onChange={handleShopPhoto}/>               
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary px-4 float-end">Spremi</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddShop;