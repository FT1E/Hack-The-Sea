import axios from 'axios'


axios.defaults.withCredentials = true;  // to preserve session data between different api calls from front end
const server_api = axios.create({
    baseURL : (!process.env.REACT_APP_DEPLOY_URL 
    ?  'http://localhost:4000/' 
    : process.env.render_deploy_url)
})

export default server_api
