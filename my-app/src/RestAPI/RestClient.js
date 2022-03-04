import axios from "axios";
import cogoToast from "cogo-toast";
class RestClient{

    static GetRequest(getUrl){
        return axios.get(getUrl)
            .then(response=>{
                return response.data;
            })
            .catch(error=>{
                return null;
            });
    }

    static PostRequest(postUrl,postJSON){
        return axios.post(postUrl,postJSON)
            .then(response=>{
                if (response.status==200 && response.data=="1"){
                    return response.data;
                }
                else {
                    return null;
                }
            })
            .catch(error=>{
                return null;
            });
    }

    static PostRequestFile(postUrl,postJSON){

        let config={
            headers: {'Content-Type': 'multipart/form-data'}
        };

        return axios.post(postUrl,postJSON,config)
            .then(response=>{
                return response.data;
            })
            .catch(error=>{
                return null;
            });
    }

}
export default RestClient;
