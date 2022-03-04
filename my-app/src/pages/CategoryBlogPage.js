import React, {Component, Fragment} from 'react';
import TopNavigation from "../components/TopNavigation/TopNavigation";
import PageTop from "../components/PageTop/PageTop";
import CategoryBlog from "../components/CategoryBlog/CategoryBlog";
import '../asset/css/style.css';
import TopNavigationLogin from "../components/TopNavigation/TopNavigationLogin";

class CategoryBlogPage extends Component {

    constructor({ match }) {
        super();
        this.state={
            category:match.params.catName,
            NavigationLogin:"",
            Navigation:"navBtn",
        }
    }


    onChangNavigation=()=>{
        if (sessionStorage.getItem("UserName")!==null){
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
                    <TopNavigationLogin pageTitle = {this.state.category}/>
                </div>
                <div className={this.state.Navigation}>
                    <TopNavigation pageTitle = {this.state.category}/>
                </div>

                <PageTop PageName={"Category "+this.state.category}/>
                <CategoryBlog category={this.state.category}/>
            </Fragment>
        );
    }
}

export default CategoryBlogPage;
