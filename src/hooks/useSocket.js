import { useState, useEffect } from "react";

export default function useSocket() 
{
    const [socket, setSocket] = useState(false);
    
      return {socket, setSocket};
}