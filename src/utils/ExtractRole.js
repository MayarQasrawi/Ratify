import { jwtDecode } from "jwt-decode";

export default function ExtractRole(token){
    const decode=jwtDecode(token);
    return decode.role;
}