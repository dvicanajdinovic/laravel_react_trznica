import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Category() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [categoryInput, setCategory] = useState({
        name: '',
        description: '',
        active: '',
    });
    const [categoryPhoto, setCategoryPhoto] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [categoryCheckbox, setCategoryCheckbox] = useState([]);

    useEffect(() => {
        axios.get(`/api/get-category/${categoryId}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setCategoryCheckbox(res.data.category);
                setCategoryPhoto(res.data.category);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/categories');
            }
        });
        setLoading(false);
    }, []);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value})
    }

    const handleCategoryPhoto = (e) => {
        setCategoryPhoto({ photo:e.target.files[0] });
    }

    const handleCheckbox = (e) => {
        e.persist();
        setCategoryCheckbox({...categoryCheckbox, [e.target.name]: e.target.checked});
    }

    const updateCategory = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', categoryInput.name);
        data.append('description', categoryInput.description);
        data.append('active', categoryCheckbox.active ? '1' : '0');
        data.append('photo', categoryPhoto.photo);

        axios.put(`/api/update-category/${categoryId}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/categories');
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
                    <h4>Uredi kategoriju <Link to="/admin/categories" className="btn btn-primary btn-sm float-end">Natrag</Link></h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory}>
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
                                    <input type="checkbox" name="active" onChange={handleCheckbox} defaultChecked={categoryCheckbox.active === 1 ? true : false} />               
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade show active" id="docs-tab-pane" role="tabpanel" aria-labelledby="docs-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Fotografija</label>
                                    <input type="file" name="photo" onChange={handleCategoryPhoto}/> 
                                    <img src={ `http://localhost:8000/${categoryInput.photo}` } width="50px" alt={ categoryInput.name } />        
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Spremi promjene</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Category;