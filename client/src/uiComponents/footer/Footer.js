import React from 'react';
import {Container, Row, Col, Image} from "react-bootstrap";

function Footer() {
    return (
        <div className="c-footer">
            <Container>
                <Row className="">
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <p>© Dr. Samir Abbas Hospital</p>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <ul>
                            <li>
                                <a href="https://twitter.com/dsahospital?lang=en">
                                    <Image src={require('../../assets/svg/twitter.svg')}/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/DSAHospital/">
                                    <Image src={require('../../assets/svg/facebook.svg')}/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/channel/UCuPIk9PfFbWOPcGJn04ThCw?view_as=subscriber">
                                    <Image src={require('../../assets/svg/youtube.svg')}/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/dsahospital/">
                                    <Image src={require('../../assets/svg/instagram.svg')}/>
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;