import { useLocation } from "react-router-dom";

function ChatsPage(){
    const location = useLocation();
    const myParam = location.state?.myParam;
    console.log(myParam)

    return(
        <h1>Chats for ID number: {myParam}</h1>
    )
}
export default ChatsPage