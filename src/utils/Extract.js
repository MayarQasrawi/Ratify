import { jwtDecode } from "jwt-decode";

export default function Extract(token,key){
    const decode=jwtDecode(token);
    console.log(decode)
    return decode[key];
}