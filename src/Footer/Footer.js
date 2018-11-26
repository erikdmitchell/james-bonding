import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Grid>
                    <Row>
                        <Col xs={12}>
                            James Bonding &copy; {new Date().getFullYear()}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Footer;
