import React, {Component,Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import CategoryBlogPage from "../pages/CategoryBlogPage";
import UserProfilePage from "../pages/UserProfilePage";
import UserLoginPage from "../pages/UserLoginPage";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/blogDetails/:id/:title" component={BlogDetailsPage}/>
                    <Route exact path="/category/:catName" component={CategoryBlogPage}/>

                    <Route exact path="/userProfile/:author" component={UserProfilePage}/>
                    <Route exact path="/userlogin" component={UserLoginPage}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;
