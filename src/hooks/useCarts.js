import { useContext } from "react";
import CartsContext from "../context/carts";

function useCarts()
{
    return useContext(CartsContext);
}

export default useCarts;



