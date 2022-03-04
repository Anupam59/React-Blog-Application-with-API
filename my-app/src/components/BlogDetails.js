import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import '../asset/css/AllBlog.css';
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppURL";
import {Link} from "react-router-dom";

class BlogDetails extends Component {

    constructor(props) {
        super();
        this.state={
            MyBlogId:props.blogId,
            blog_title:" ",
            blog_des:" ",
            blog_image:" ",
            author:" ",
            category:" ",
            date:" "
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.BlogDetails+this.state.MyBlogId).then(result=>{
            this.setState({
                blog_title:result[0]['blog_title'],
                blog_des:result[0]['blog_des'],
                blog_image:result[0]['blog_image'],
                author:result[0]['author'],
                category:result[0]['category'],
                date:result[0]['date']
            });
        }).catch(error=>{

        })
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col className="mt-2 justify-content-center offset-md-1" lg={10} md={10} sm={12}>
                            <Card>
                                <img className="blogImage" src={this.state.blog_image}/>
                                <Card.Body>
                                    <h4 className="blogTitle">{this.state.blog_title}</h4>
                                    <p className="blogAuthor">{this.state.author} | Date: {this.state.date}</p>
                                    <p className="blogAuthor">Category : <Link to={"/category/" + this.state.category}>{this.state.category}</Link></p>
                                    <p className="blogDes">{this.state.blog_des}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default BlogDetails;
