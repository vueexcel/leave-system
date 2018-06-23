import axios from "axios"

axios.interceptors.response.use(function (response) {
    // Do something with response data
    if('error' in response){
        //this is for our blockchain nodejs app
        return response;
    }
    if (response.data && response.data.error && response.data.error == 1) {
        return Promise.reject(response.data.data.message);
    }
    if (response.data) {
        return response.data.data;
    } else {
        return response;
    }
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

const API_URL = 'https://hr.excellencetechnologies.in/attendance/API_HR/api.php';
const SAL_INFO = 'https://hr.excellencetechnologies.in/attendance/sal_info/api.php';

export class HRSystem {
    userId = 0;
    token = false;
    profile = false;
    constructor() {
        this.token = this.getFromStorage("token")
        // console.log("token found in local storage", this.token)
        if (this.token) {
            this.getMyProfile();
        }
    }
    logout = () => {
        this.setInStorage("token", false)
    }
    login = (username, password) => {

        return axios.post(API_URL, {
            "action": "login",
            "username": username,
            "password": password,
            "token": null
        }).then((obj) => {
            this.setInStorage("token", obj.token);
            this.token = obj.token;
            this.userId = obj.userId;
            return obj;
        })

    }
    getMyProfile = () => {
        if (this.profile) {
            return Promise.resolve(this.profile)
        }
        if (!this.token) {
            return Promise.reject("token not found");
        }
        return axios.post(SAL_INFO, {
            "action": "get_user_profile_detail",
            "token": this.token
        }).then((obj) => {
            this.profile = obj.user_profile_detail;
            return obj.user_profile_detail;
        })
    }
    assignAddressToUser(addr) {
        return axios.post(API_URL, {
            "action": "update_user_eth_token",
            "eth_token": addr,
            "token": this.token
        })
    }
    setInStorage(key, value) {
        if (localStorage) {
            localStorage.setItem(key, value);
        }
    }
    getFromStorage(key) {
        if (localStorage) {
            return localStorage.getItem(key)
        } else {
            false;
        }
    }
    applyLeave(from_date, to_date, no_of_days, reason, type) {
        return axios.post(API_URL,
            {
                "action": "apply_leave",
                "from_date": from_date,
                "to_date": to_date,
                "no_of_days": no_of_days,
                "reason": reason,
                "user_id": this.profile.id,
                "day_status": "",
                "leave_type": type,
                "late_reason": "Applied From Blockchain App",
                "token": this.getFromStorage("token")
            })
    }
}