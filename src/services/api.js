// Edit this file as you see fit lang,
// Especially sa katong na assign sa authorization


import axios from 'axios'

const BaseApi = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    },
    
})

const Api = function () {
    let token = localStorage.getItem("token")
    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`
        BaseApi.defaults.headers.common["Accept"] = "application/json"
    }
    return BaseApi
}

export default Api