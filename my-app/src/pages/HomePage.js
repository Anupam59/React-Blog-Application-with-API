import React, {Component,Fragment} from 'react';
import TopNavigation from "../components/TopNavigation/TopNavigation";
import PageTop from "../components/PageTop/PageTop";
import AllBlog from "../components/AllBlog";
import '../asset/css/style.css';
import TopNavigationLogin from "../components/TopNavigation/TopNavigationLogin";

class HomePage extends Component {

    constructor() {
        super();
        this.state={
            NavigationLogin:"",
            Navigation:"navBtn",
        }
    }


    onChangNavigation=()=>{
        if (sessionStorage.getItem("UserName")){
            this.setState({
                NavigationLogin:"navBtn",
                Navigation:"",
            })
        }else {
            this.setState({
                NavigationLogin:"",
                Navigation:"navBtn",
            })
        }
    }

    componentDidMount() {
        window.scroll(0,0);
        this.onChangNavigation();
    }

    render() {
        return (
            <Fragment>
                <div className={this.state.NavigationLogin}>
                    <TopNavigationLogin pageTitle ="Home Page"/>
                </div>
                <div className={this.state.Navigation}>
                    <TopNavigation pageTitle ="Home Page"/>
                </div>

                <PageTop PageName="Home Page All Blog"/>
                <AllBlog/>
            </Fragment>
        );
    }
}

export default HomePage;
