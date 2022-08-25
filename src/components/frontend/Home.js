import React from 'react';
import { Link } from 'react-router-dom';
import HomeCarousel from '../../HomeCarousel';
import Categories from './Categories';

function Home() {
    return (
        <div>
            <HomeCarousel />
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 mb-3'>
                            <div className='card'>
                                <div className='card'>
                                    <Link to="">
                                        <img src={`http://localhost:8000/photos/ana.jpg`} className='w-100' alt="avatar"/>
                                    </Link>
                                    <div className='card-body'>
                                            <p>Naša Ana zadužena je za uvijek aktivnu korisničku podršku.
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-3'>
                            <div className='card'>
                                <div className='card'>
                                    <Link to="">
                                        <img src={`http://localhost:8000/photos/toni.jpg`} className='w-100' alt="avatar"/>
                                    </Link>
                                    <div className='card-body'>
                                        <p>Brine se da Vaša narudžba stigne u što kraćem roku na Vašu adresu.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-3'>
                            <div className='card'>
                                <div className='card'>
                                    <Link to="">
                                        <img src={`http://localhost:8000/photos/mario.jpg`} className='w-100' alt="avatar"/>
                                    </Link>
                                    <div className='card-body'>
                                    <p>Naš web admin zaslužan je za tehničku podršku i promociju Vaših proizvoda.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Categories />
        </div>

    );
}

export default Home;