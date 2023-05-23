import { useContext } from "react";
import AuthContext from "../context/auth";

function useAuthenctication()
{
    return useContext(AuthContext);
}

export default useAuthenctication;



