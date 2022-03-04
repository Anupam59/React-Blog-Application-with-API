import React, {Component,Fragment} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import '../../asset/css/TopNavCss.css';
import '../../asset/css/style.css';
import {Link, NavLink} from "react-router-dom";

class TopNavigation extends Component {
    constructor(props) {
        super();
        this.state={
            author_username:sessionStorage.getItem("UserName"),
            navTitle:"navTitle",
            navBackground:"navBackground",
            navItem:"navBarItem",
            pageTitle: props.pageTitle,

        }
    }

    onLogoutBtn=()=>{
        sessionStorage.removeItem("UserName");
    }

    onScroll=()=>{
        if (window.scrollY>100){
            this.setState({
                navTitle:"navTitleScroll",
                navBackground:"navBackgroundScroll",
                navItem:"navBarItemScroll"
            })
        }
        else if (window.scrollY<100){
            this.setState({
                navTitle:"navTitle",
                navBackground:"navBackground",
                navItem:"navBarItem"
            })
        }
    }

    componentDidMount() {

        window.addEventListener('scroll',this.onScroll);
    }

    render() {
        return (
            <Fragment>

                    <title>{this.state.pageTitle}</title>
                    <Navbar fixed={"top"} className={this.state.navBackground} expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand><Link className={this.state.navTitle} to="/">React Blog App</Link></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                </Nav>
                                <Nav>
                                    <p className="navLinkP"><a className={this.state.navItem} href="/category/food">Food</a> </p>
                                    <p className="navLinkP"><a className={this.state.navItem} href="/category/project">Project</a> </p>
                                    <p className="navLinkP"><a className={this.state.navItem} href="/category/news">News</a> </p>
                                    <p className="navLinkP"><a className={this.state.navItem} href="/category/song">Song</a> </p>
                                    <p className="navLinkP"><a className={this.state.navItem} href="/category/movie">Movie</a> </p>
                                    <p className="navLinkP"><a className={this.state.navItem} href="/category/play">Play</a> </p>

                                    <Button className="m-1" variant="outline-danger"><Link to={"/userProfile/"+this.state.author_username}>Profile</Link></Button>
                                    <Button className="m-1" onClick={this.onLogoutBtn} variant="outline-danger"><a href="/">Logout</a></Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
            </Fragment>
        );
    }
}

export default TopNavigation;
