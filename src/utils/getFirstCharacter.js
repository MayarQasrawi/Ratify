export default function getFirstCharacter(fullName){
    if(fullName=='') return 'A'
    return fullName=fullName.split(" ")[0].toUpperCase();
}