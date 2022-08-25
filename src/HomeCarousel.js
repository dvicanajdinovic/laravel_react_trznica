import React from "react";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class HomeCarousel extends React.Component {
render() {
    return (
        <div>
            <div className='container-fluid' height='30%'>
                <div className="row">
                    <div className="col-sm-12">
                        <h3></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Carousel>
                        <Carousel.Item>
                        <img className="d-block w-100" src={`http://localhost:8000/photos/pasnjak.jpg`} alt="Pasnjak"/>
                        <Carousel.Caption>
                        <h3>Pridružite nam se</h3>
                        <p>i zavirite u čaroban svijet domaćih pašnjaka.</p>
                        </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                        <img className="d-block w-100" src={`http://localhost:8000/photos/maslinik.jpg`} alt="Maslinik" />
                        <Carousel.Caption>
                        <h3>Čvrsto čuvamo našu stoljetnu tradiciju</h3>
                        <p>koja našim proizvodima daje prepoznatljivu kvalitetu.</p>
                        </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                        <img className="d-block w-100" src={`http://localhost:8000/photos/pecanje.jpg`} alt="Pecanje" />
                        <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                        </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
};
}
export default HomeCarousel;