import axios from "axios"

export class Free {
    getTokenForFree(addr){
        return axios.get("http://5.9.144.226:9001/free/" +addr)
    }
}