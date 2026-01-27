import { useSelector } from "react-redux"
import {io} from "socket.io-client"
export const Socket_conn=(id)=>{


     function connection(){
        const socket=io(`ws://localhost:5000?id=${id}`,{
            withCredentials:true
        })
        socket.on("connection",()=>console.log("Connected"))
    }
    connection()

}
