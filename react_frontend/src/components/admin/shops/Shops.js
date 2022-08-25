import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Shops() {

    const [loading, setLoading] = useState(true);
    const [shops, setShops] = useState([]);

    useEffect(() => {

        document.title = "Moja tržnica";

        axios.get(`/api/get-shops`).then(res => {
            if (res.status === 200) {
                setShops(res.data.shops);
                setLoading(false);
            }
        });
    }, []);

    var shops_HTMLTABLE = "";
    if (loading) {
        return <h4>Molimo pričekajte...</h4>
    } else {
        var active = '';

        shops_HTMLTABLE = shops.map( (item) => {
            if (item.active === '0') {
                active = 'Ne';
            } else {
                active = 'Da';
            }
            return (
                <tr key={ item.id }>
                    <td>{ item.id }</td>
                    <td>{ item.name }</td>
                    <td><img src={ `http://localhost:8000/${item.photo}` } width="50px" alt={ item.name } /></td>
                    <td>{ active }</td>
                    <td> <Link to={`/admin/shops/${ item.id }`} className="btn btn-success btn-sm"> Uredi </Link></td>
                </tr>
            )
        });
    }

    return (
            <div className="card mt-3 px-4">
                <div className="card-header">
                    <h4> Lista
                        <Link to="/admin/add-shop" className="btn btn-primary btn-sm float-end">Dodaj</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-stripped"> 
                            <thead>
                                <tr>
                                    <th>Broj</th>
                                    <th>Ime</th>
                                    <th>Fotografija</th>
                                    <th>Aktivan</th>
                                    <th>Uredi</th>
                                </tr>
                            </thead>
                            <tbody>
                                { shops_HTMLTABLE }
                            </tbody>
                        </table>
                        </div>
                </div>
            </div>
    )
}

export default Shops;