import { useState } from "react";
import io from "socket.io-client";

export default function useWebsockets() 
{

      const [socket, setSocket] = useState(false);

      const connectSocket = () =>
      {
        setSocket(io.connect("http://localhost:3002"));


        socket.on("connected", (data) => 
        {
          console.log('Websockets connected');
          console.log(data)
        });

        socket.on('message', data => 
        {
          console.log('message');
          console.log(data);
        })
        
      }
      const disconnectSocket = () =>
      {
        socket.disconnect();
        setSocket(false);
        console.log('Websockets disconnect')
      }
      
      const emmitMessage = message =>
      {
        socket.emit('message', message);
      }

      return {connectSocket, disconnectSocket, emmitMessage};
}