import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppURL";
import '../../asset/css/style.css';
import cogoToast from 'cogo-toast';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import axios from "axios";

class UserProfile extends Component {

    constructor(props) {
        super();
        this.state={
            authorName:props.authorName,
            rowDataId:"",
            deleteBtnText:"Delete",
            addNewModal:false,
            DetailsNewModal:false,
            MyData:[],
            blogTitle:'',
            blogSort:'',
            blogDes:'',
            category:'',
            blogImage:'',
            UserRedirectLogin:false,
            name:"",
            username:"",
            email:"",
            password:"",
        }
    }

    componentDidMount() {
        if(sessionStorage.getItem("UserName")){
            RestClient.GetRequest(AppUrl.AllUserBlog(this.state.authorName)).then(result=>{
                this.setState({MyData:result});
            }).catch(error=>{

            })
        }else {
            this.setState({UserRedirectLogin:true});
        }


        if(sessionStorage.getItem("UserName")){
            axios.get(AppUrl.GetUserData(this.state.authorName)).then(response=>{
                if (response.status==200){
                    let JSONData= (response.data)[0];
                    this.setState({
                        name:JSONData['author_name'],
                        username:JSONData['author_username'],
                        email:JSONData['author_email'],
                        password:JSONData['author_pass'],
                    });
                }
            }).catch(error=>{
                console.log(error)
            })

        }else {
            this.setState({UserRedirectLogin:true});
        }

    }

    onUserRedirectLogin=()=>{
        if(this.state.UserRedirectLogin===true){
            return(<Redirect to="/userlogin"/>)
        }
    }


    blogTitleOnChang=(event)=>{
        let blogTitle = event.target.value;
        this.setState({blogTitle:blogTitle})
    }
    blogSortDesOnChang=(event)=>{
        let blogSort = event.target.value;
        this.setState({blogSort:blogSort})
    }
    blogDesOnChang=(event)=>{
        let blogDes = event.target.value;
        this.setState({blogDes:blogDes})
    }
    blogImageOnChang=(event)=>{
        let blogImage = event.target.files[0];
        this.setState({blogImage:blogImage})
    }
    categoryOnChang=(event)=>{
        let category = event.target.value;
        this.setState({category:category})
    }



    addNewBtnOpen=()=>{
        this.setState({addNewModal:true})
    }
    addNewBtnClose=()=>{
        this.setState({addNewModal:false})
    }
    addFormData=(event)=>{
        let blogTitle = this.state.blogTitle;
        let blogSort = this.state.blogSort;
        let blogDes = this.state.blogDes;
        let blogImage = this.state.blogImage;
        let category = this.state.category;
        let authorName = this.state.authorName;

        let myFormData = new FormData();
        myFormData.append('blog_title',blogTitle)
        myFormData.append('blog_sort_des',blogSort)
        myFormData.append('blog_des',blogDes)
        myFormData.append('category',category)
        myFormData.append('blog_image',blogImage)
        myFormData.append('author',authorName)

        if(sessionStorage.getItem("UserName")){
            RestClient.PostRequestFile(AppUrl.AddUserBlog,myFormData).then(result=>{
                this.setState({addNewModal:false})
                cogoToast.success('Blog Add success!');
                this.componentDidMount();
            }).catch(error=>{
                this.componentDidMount();
                cogoToast.error('Blog Add fail!');
            })
        }else {
            this.setState({UserRedirectLogin:true});
        }


        event.preventDefault();
    }



    DetailsBtnOpen=()=>{
        this.setState({DetailsNewModal:true})
        this.blogDetails();
    }
    DetailsBtnClose=()=>{
        this.setState({DetailsNewModal:false})
    }
    blogDetails=()=>{
        if(sessionStorage.getItem("UserName")){
            axios.post(AppUrl.UserBlogDetails,{id:this.state.rowDataId}).then(response=>{
                    let jsonData = response.data;
                    this.setState({
                        blogTitle:jsonData[0]['blog_title'],
                        blogSort:jsonData[0]['blog_sort_des'],
                        blogDes:jsonData[0]['blog_des'],
                        blogImage:jsonData[0]['blog_image'],
                        category:jsonData[0]['category'],
                    });
                })
                .catch(error=>{
                   alert(error)
                });

        }else {
            this.setState({UserRedirectLogin:true});
        }


    }


    updateFormData=(event)=>{
        let rowDataId = this.state.rowDataId;
        let blogTitle = this.state.blogTitle;
        let blogSort = this.state.blogSort;
        let blogDes = this.state.blogDes;
        let blogImage = this.state.blogImage;
        let category = this.state.category;

        let myFormData = new FormData();
        myFormData.append('id',rowDataId);
        myFormData.append('blog_title',blogTitle);
        myFormData.append('blog_sort_des',blogSort);
        myFormData.append('blog_des',blogDes);
        myFormData.append('category',category);
        myFormData.append('blog_image',blogImage);

        if(sessionStorage.getItem("UserName")){
            RestClient.PostRequestFile(AppUrl.UserBlogUpdate,myFormData).then(result=>{
                this.setState({DetailsNewModal:false})
                cogoToast.success('Blog Update success!');
                this.componentDidMount();
            }).catch(error=>{
                this.componentDidMount();
                cogoToast.error('Blog Update fail!');
            })
        }else {
            this.setState({UserRedirectLogin:true});
        }
        event.preventDefault();
    }



    blogDelete=()=>{
        let confirmResult= window.confirm("Do you Want to delete ?");
        if(sessionStorage.getItem("UserName")){
            if (confirmResult===true){
                RestClient.PostRequest(AppUrl.UserBlogDelete,{id:this.state.rowDataId}).then(result=>{
                    this.componentDidMount();
                    cogoToast.success('Blog Delete success!');
                }).catch(error=>{
                    this.componentDidMount();
                    cogoToast.error('Blog Delete fail');
                })
            }else {
                this.componentDidMount();
                cogoToast.error('Blog Delete fail');
            }
        }else {
            this.setState({UserRedirectLogin:true});
        }

    }
    imgCellFormatter=(cell,row)=>{
        return(
            <img className="cellImage" src={cell}/>
        )
    }

    render() {
        const data = this.state.MyData;
        const columns = [
            {dataField:"id",text:"ID"},
            {dataField:'blog_image', text: 'Image', formatter:this.imgCellFormatter},
            {dataField:"blog_title",text:"Blog Title"},
            {dataField:"blog_sort_des",text:"Blog Sort Des"},
            {dataField:"category",text:"Category"},
            {dataField:"date",text:"Create Date"}
        ];
        const selectRow = {
            mode: 'radio',
            onSelect: (row, isSelect, rowIndex, e) => {
                this.setState({rowDataId:row['id']});
            },
            clickToSelect: true,
            bgColor: '#ecd7d7'
        };

        return (

            <Fragment>
                <title>{this.state.name}</title>
                <Container>
                    <Container>
                        <Row>
                            <Col className="mt-2">
                                <Link to="/"><Button className="btn btn-sm btn-primary">Go to Home</Button></Link>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={6} md={6} sm={12} className="offset-md-3">
                                <h3>Name : {this.state.name}</h3>
                                <p>UserName : {this.state.username}</p>
                                <p>Email : {this.state.email}</p>
                                <p>Password : {this.state.password}</p>
                                <Button className="btn btn-primary">Update</Button>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                <button onClick={this.DetailsBtnOpen} className="normal-btn m-lg-2 btn btn-danger">Details</button>
                                <button onClick={this.blogDelete} className="normal-btn m-lg-2 btn btn-danger">{this.state.deleteBtnText}</button>
                                <button onClick={this.addNewBtnOpen} className="normal-btn m-lg-2 btn btn-primary">Add New</button>
                                <BootstrapTable
                                    keyField='id'
                                    data={ data }
                                    columns={ columns }
                                    selectRow={ selectRow }
                                    pagination={ paginationFactory()}
                                />
                            </Col>
                        </Row>
                    </Container>
                    {this.onUserRedirectLogin()}
                </Container>



                <Modal size="lg" show={this.state.addNewModal} onHide={this.addNewBtnClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Blog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={this.addFormData}>
                            <Form.Group className="mb-3">
                                <Form.Label>blog_title</Form.Label>
                                <Form.Control onChange={this.blogTitleOnChang} type="text" placeholder="blog_title" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>blog_sort_des</Form.Label>
                                <Form.Control onChange={this.blogSortDesOnChang} type="text" placeholder="blog_sort_des" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>blog_des</Form.Label>
                                <Form.Control onChange={this.blogDesOnChang} as="textarea" placeholder="blog_des" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>blog_image</Form.Label>
                                <Form.Control onChange={this.blogImageOnChang} type="file"/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>category</Form.Label>
                                <Form.Select onChange={this.categoryOnChang} aria-label="Default select example">
                                    <option>Select Category</option>
                                    <option value="food">Food</option>
                                    <option value="project">Project</option>
                                    <option value="news">News</option>
                                    <option value="song">Song</option>
                                    <option value="movie">Movie</option>
                                    <option value="play">Play</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.addNewBtnClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal size="lg" show={this.state.DetailsNewModal} onHide={this.DetailsBtnClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add And Update Blog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={this.updateFormData}>
                            <Form.Group className="mb-3">
                                <Form.Label>blog_title</Form.Label>
                                <Form.Control onChange={this.blogTitleOnChang} value={this.state.blogTitle} type="text" placeholder="blog_title" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>blog_sort_des</Form.Label>
                                <Form.Control onChange={this.blogSortDesOnChang} value={this.state.blogSort} type="text" placeholder="blog_sort_des" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>blog_des</Form.Label>
                                <Form.Control onChange={this.blogDesOnChang} value={this.state.blogDes} as="textarea" placeholder="blog_des" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>image</Form.Label><br/>
                                <img className="cellImage" src={this.state.blogImage}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>blog image Select</Form.Label>
                                <Form.Control onChange={this.blogImageOnChang} type="file"/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>category</Form.Label>
                                <Form.Select onChange={this.categoryOnChang} value={this.state.category} aria-label="Default select example">
                                    <option value="food">Food</option>
                                    <option value="project">Project</option>
                                    <option value="news">News</option>
                                    <option value="song">Song</option>
                                    <option value="movie">Movie</option>
                                    <option value="play">Play</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.DetailsBtnClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

export default UserProfile;
