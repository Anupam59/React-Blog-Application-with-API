import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../asset/css/AllBlog.css';
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppURL";

class CategoryBlog extends Component {

    constructor(props) {
        super();
        this.state={
            category:props.category,
            MyData:[]
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.BlogSelectCategory(this.state.category)).then(result=>{
            this.setState({MyData:result});
        }).catch(error=>{
            console.log(error)
        })
    }

    render() {
        const MyLists = this.state.MyData;
        const MyView = MyLists.map(MyList=>{
            return <Col className="mt-2" lg={4} md={6} sm={12}>
                <Card>
                    <img src={MyList.blog_image}/>
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

export default CategoryBlog;
