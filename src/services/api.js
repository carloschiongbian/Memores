// Edit this file as you see fit lang,
// Especially sa katong na assign sa authorization


import axios from 'axios'

export const BaseApi = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    },
})

const Api = function () {
    return BaseApi
}

export default Api