import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Redirect} from "react-router";
import cogoToast from "cogo-toast";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppURL";
import '../../asset/css/style.css';
import {Link} from "react-router-dom";


class UserLogin extends Component {

    constructor() {
        super();
        this.state={
            author_username:"",
            author_pass:"",
            UserRedirect:false,
            pageTitle:"Login",
        }
    }

    componentDidMount() {

    }

    onUserRedirect=()=>{
        if(this.state.UserRedirect===true){
            return(<Redirect to={"/userProfile/"+this.state.author_username}/>)
        }
    }

    UserNameOnChange=(event)=>{
        let UserName = event.target.value;
        this.setState({author_username:UserName})
    }
    PasswordOnChange=(event)=>{
        let Password = event.target.value;
        this.setState({author_pass:Password})
    }
    LoginOnClick=()=>{
        let UserName = this.state.author_username;
        let Password = this.state.author_pass;

        if(UserName.length==0){
            cogoToast.warn("Plz write UserName")
        }
        else if(Password.length==0){
            cogoToast.warn("Plz write your Password")
        }
        else {

            RestClient.PostRequest(AppUrl.UserLogin,{
                author_username:this.state.author_username,
                author_pass:this.state.author_pass
            }).then(result=>{
                if (result=="1"){
                    sessionStorage.setItem("UserName",this.state.author_username);
                    cogoToast.success("Success full login");
                    this.setState({UserRedirect:true});
                }else {
                    this.setState({UserRedirect:false});
                    cogoToast.error("Fail login");
                }

            }).catch(error=>{
                this.setState({UserRedirect:false});
                cogoToast.error("Fail login");
            })
        }
    }


    render() {
        return (
            <Fragment>
                <title>{this.state.pageTitle}</title>
                <Container fluid={true} className="topPageBanner p-0">
                    <div className="topPageBannerOverlay">
                        <Container className="topPageBannerContent">
                            <Row>
                                <Col className="text-center">
                                    <h1 className="topPageBannerTitle">Login Page</h1>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Container>

                <Container>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center offset-md-3" md={6} lg={6} sm={12} xs={12}>
                                    <Form>
                                        <h4>USER SING IN</h4>
                                        <h6>Please Enter Your UserName,Password And Go Next</h6>
                                        <input onChange={this.UserNameOnChange} className="form-control m-2" type="text" placeholder="User Name"/>
                                        <input onChange={this.PasswordOnChange} className="form-control m-2" type="password" placeholder="Password"/>
                                        <Button onClick={this.LoginOnClick} className="btn btn-block m-2 site-btn">Next</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.onUserRedirect()}
            </Fragment>
        );
    }
}

export default UserLogin;
