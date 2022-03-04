import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import '../asset/css/AllBlog.css';
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppURL";
import {Link} from "react-router-dom";




class AllBlog extends Component {

    constructor() {
        super();
        this.state={
            MyData:[]
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.AllBlogSelect).then(result=>{
            this.setState({MyData:result});
        }).catch(error=>{

        })
    }

    render() {

        const MyLists = this.state.MyData;
        const MyView = MyLists.map(MyList=>{
            return <Col className="mt-2" lg={4} md={6} sm={12}>
                <Card>
                    <img className="blogImageBox" src={MyList.blog_image}/>
                    <Card.Body>
                        <Link to={"/blogDetails/"+MyList.id+"/"+MyList.blog_title}>
                            <h4 className="blogTitle">{MyList.blog_title}</h4>
                        </Link>
                        <p className="blogAuthor">{MyList.author} | {MyList.date}</p>
                        <p className="blogAuthor">Category : <Link to={"/category/" + MyList.category}>{MyList.category}</Link></p>
                        <p className="blogDes">{MyList.blog_sort_des}</p>
                    </Card.Body>
                </Card>
            </Col>
        });

        return (
            <Fragment>
                <Container>
                    <Row>
                        {MyView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default AllBlog;
