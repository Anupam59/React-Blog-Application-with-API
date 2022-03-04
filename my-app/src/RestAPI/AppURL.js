
class AppUrl{
    static BaseUrl='http://127.0.0.1:8000/api';

    static AllBlogSelect=this.BaseUrl+'/AllBlogSelect';
    static BlogDetails=this.BaseUrl+'/BlogDetails/';

    static BlogSelectCategory(category){
        return this.BaseUrl+"/BlogSelectCategory/"+category;
    }

    static AllUserBlog(author){
        return this.BaseUrl+"/AllUserBlog/"+author;
    }

    static UserBlogDelete = this.BaseUrl+'/UserBlogDelete';
    static UserBlogDetails = this.BaseUrl+'/UserBlogDetails';
    static AddUserBlog = this.BaseUrl+'/AddUserBlog';
    static UserBlogUpdate = this.BaseUrl+'/UserBlogUpdate';

    static UserLogin = this.BaseUrl+'/UserLogin';

    static GetUserData(author){
        return this.BaseUrl+"/GetUserData/"+author;
    }


}
export default AppUrl;
