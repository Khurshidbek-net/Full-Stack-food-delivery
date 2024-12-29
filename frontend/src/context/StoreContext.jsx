import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:8080";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId] : 1}))
        }else{
            setCartItems((prev) => ({...prev,[itemId] : prev[itemId] + 1}))
        }
        if(token){
            await axios.post(url + "/api/card/add", {itemId}, {headers:{token}});
        }
    }

    const removeFromCart = async (itemId) =>{
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] - 1}));
        if(token){
            await axios.post(url + "/api/card/remove", {itemId}, {headers: {token}});
        }
    }

    const getTotalAmount = () =>{
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () =>{
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCardData = async (token) => {
        try {
            const response = await axios.get(url + "/api/card/get", {
                headers: { token },
            });
            setCartItems(response.data.cardData);
        } catch (error) {
            console.error("Error loading card data:", error);
        }
    };
    
    useEffect(() => {
        async function loadData() {
            try {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCardData(storedToken);
                }
            } catch (error) {
                console.error("Error in loadData:", error);
            }
        }
        loadData();
    }, []);
    

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;