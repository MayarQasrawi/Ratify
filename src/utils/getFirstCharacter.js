export default function getFirstCharacter(fullName){
    if(fullName=='') return 'A'
    return fullName.split(" ")[0][0].toUpperCase();
}