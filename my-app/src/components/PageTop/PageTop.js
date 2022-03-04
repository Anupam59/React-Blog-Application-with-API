import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import '../../asset/css/PageTopCss.css';

class PageTop extends Component {
    render() {
        return (
            <Fragment>
                <Container fluid={true} className="topPageBanner p-0">
                    <div className="topPageBannerOverlay">
                        <Container className="topPageBannerContent">
                            <Row>
                                <Col className="text-center">
                                    <h1 className="topPageBannerTitle">{this.props.PageName}</h1>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Container>
            </Fragment>
        );
    }
}

export default PageTop;
