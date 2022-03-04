import React, {Component,Fragment} from 'react';
import UserLogin from "../components/UserLogin/UserLogin";

class UserLoginPage extends Component {


    componentDidMount() {
        window.scroll(0,0);
    }


    render() {
        return (
            <Fragment>
                <UserLogin/>
            </Fragment>
        );
    }
}

export default UserLoginPage;
