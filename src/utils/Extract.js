import { jwtDecode } from "jwt-decode";

export default function Extract(token,key){
    console.log("Extracting from token:", token);
    const decode=jwtDecode(token);
    console.log(decode)
    return decode[key];
}