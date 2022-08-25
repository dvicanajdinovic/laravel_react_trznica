import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function Categories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        document.title = "Moja tržnica";

        axios.get(`/api/get-categories`).then(res => {
            if (res.status === 200) {
                setCategories(res.data.categories);
                setLoading(false);
            }
        });
    }, []);

    var displayData = '';
    if (loading) {
        return <h4>Pričekajte...</h4>
    } else {
        displayData = categories.map( (item, idx) => {
            return (
                <div className='col-md-4 mb-3' key={ idx }>
                    <div className='card'>
                        <div className='card'>
                            <Link to="">
                                <img src={`http://localhost:8000/${ item.photo }`} className='w-100' alt={ item.name }/>
                            </Link>
                            <div className='card-body'>
                                <Link to={`/categories/${ item.keyname }`}>
                                    <h5>{ item.name }</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Kategorije</h6>
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

export default Categories;