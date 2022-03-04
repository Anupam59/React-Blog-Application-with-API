import React, {Component,Fragment} from 'react';
import TopNavigation from "../components/TopNavigation/TopNavigation";
import PageTop from "../components/PageTop/PageTop";
import BlogDetails from "../components/BlogDetails";
import TopNavigationLogin from "../components/TopNavigation/TopNavigationLogin";
import '../asset/css/style.css';

class BlogDetailsPage extends Component {

    constructor({ match }) {
        super();
        this.state={
            NavigationLogin:"",
            Navigation:"navBtn",
            id:match.params.id,
            title:match.params.title
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
                    <TopNavigationLogin pageTitle = {this.state.title}/>
                </div>
                <div className={this.state.Navigation}>
                    <TopNavigation pageTitle = {this.state.title}/>
                </div>


                <PageTop PageName={this.state.title}/>
                <BlogDetails blogId={this.state.id} blogTitle={this.state.title}/>
            </Fragment>
        );
    }
}

export default BlogDetailsPage;
