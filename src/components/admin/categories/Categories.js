import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Categories() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        document.title = "Kategorije";

        axios.get(`/api/get-categories`).then(res => {
            if (res.status === 200) {
                setCategories(res.data.categories);
                setLoading(false);
            }
        });
    }, []);

    const deleteCategory = (e, categoryId) => {
        e.preventDefault();

        const clicked = e.currentTarget;
        clicked.message = "Brisanje";

        axios.delete(`/api/delete-category/${categoryId}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                clicked.closest("tr").remove();
            } else if (res.data.status === 404) {
                swal("Success", res.data.message, "error");
                clicked.message = "Izbriši";
            }
        });
    }

    var categories_HTMLTABLE = "";
    if (loading) {
        return <h4>Dohvaćanje podataka u tijeku...</h4>
    } else {
        categories_HTMLTABLE = categories.map( (item) => {
            return (
                <tr key={ item.id }>
                    <td>{ item.id }</td>
                    <td>{ item.name }</td>
                    <td>{ item.active }</td>
                    <td> <Link to={`/admin/categories/${ item.id }`} className="btn btn-success btn-sm"> Uredi </Link></td>
                    <td> <button type="button" onClick={ (e) => deleteCategory(e, item.id) } className="btn btn-danger btn-sm"> Izbriši </button> </td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4> Kategorije
                        <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Dodaj</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-stripped"> 
                        <thead>
                            <tr>
                                <th>Broj</th>
                                <th>Ime</th>
                                <th>Status</th>
                                <th>Uredi</th>
                                <th>Izbriši</th>
                            </tr>
                        </thead>
                        <tbody>
                            { categories_HTMLTABLE }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Categories;