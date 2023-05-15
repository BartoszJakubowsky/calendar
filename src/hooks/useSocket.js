import { useState, useEffect } from "react";

export default function useSocket() 
{
    const [socket, setSocket] = useState(false);
    const handleSendSocketMessage = (data) =>
    {
      socket.emit('message', data);
    }
    
      return {socket, setSocket, handleSendSocketMessage};
}