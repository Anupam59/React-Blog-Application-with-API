import React, {Component,Fragment} from 'react';
import UserProfile from "../components/UserProfile/UserProfile";
import '../asset/css/style.css';

class UserProfilePage extends Component {

    constructor({ match }) {
        super();
        this.state={
            author:match.params.author,
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
                <UserProfile authorName={this.state.author}/>
            </Fragment>
        );
    }
}

export default UserProfilePage;
