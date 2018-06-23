import axios from "axios"

export class Free {
    getTokenForFree(addr){
        return axios.get("https://blockchain.excellencetechnologies.in/api/free/" +addr)
    }
}