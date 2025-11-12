import axios from "axios";

const axiosConfig = axios.create({
    baseURL : "localhost:8080/api/v1.0",
    headers:{
        "Content-Type" : "application/json",
        Accept: "application/json"
    }
})

//list of end points not require auth
const excludeEndPoints = ["/login","register","status","/activate","/health"];


// request intercepter
axiosConfig.interceptors.request.use()