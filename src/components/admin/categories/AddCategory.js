import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const navigate = useNavigate();

    const [categoryInput, setCategory] = useState({
        name: '',
        description: '',
        active: '',
        errors: [],
    });
    const [categoryPhoto, setCategoryPhoto] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value})
    }

    const handleCategoryPhoto = (e) => {
        e.persist();
        setCategoryPhoto({ photo:e.target.files[0] })
    }

    const addCategory = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', categoryInput.name);
        data.append('description', categoryInput.description);
        data.append('active', categoryInput.active);
        data.append('photo', categoryPhoto.photo);

        axios.post(`/api/add-category`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setCategory({...categoryInput, 
                    name: '',
                    description: '',
                    active: '',
                });
                navigate('/categories');
            } else if (res.data.status === 400) {
                setCategory({...categoryInput, errors:res.data.errors});
            }
        });
    }

    return (
        <div className='container-fluid px-4'>
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Dodaj kategoriju</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={addCategory} id="add_category">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Osnovni podatci</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Datoteke i ostalo</button>
                        </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Naziv</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Opis</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>               
                                </div>
                                <div className="form-group mb-3">
                                    <label>Aktivno</label>
                                    <input type="checkbox" name="active" onChange={handleInput} value={categoryInput.active}/>               
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade show active" id="docs-tab-pane" role="tabpanel" aria-labelledby="docs-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Fotografija</label>
                                    <input type="file" name="photo" onChange={handleCategoryPhoto}/>               
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

export default AddCategory;