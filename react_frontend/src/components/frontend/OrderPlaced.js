import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';

function OrderPlaced() {

    return (
        <div>
            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card card-body py-5 text-center shadow-sm'>
                                <h6>Vaša narudžba je zaprimljena te će uskoro stići na Vašu adresu.</h6>
                                <h6>Zahvaljujemo Vam se na povjerenju.</h6>
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPlaced;