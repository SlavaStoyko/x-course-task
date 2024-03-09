import { useEffect, useState } from "react";
import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";
import { EmptyBasket } from './BasketComponents/EmptyBasket';
import { ListBasket } from './BasketComponents/ListBasket';
import './style.css'

export const Basket = () =>{
const [LocalStorageData,setLocalStorageData] = useState(LocalStorageService.get(LS_KEYS.BOOK)||[]);
const [isActiveCart, setIsActiveCart] = useState();
useEffect(()=>{
    if(LocalStorageData.length){
        setIsActiveCart(true);
    }else if(undefined){
        setIsActiveCart(false);

    }
},[LocalStorageData])
const handleCleanStorage = () => {
    setLocalStorageData(LocalStorageService.remove(LS_KEYS.BOOK));
    setLocalStorageData(LocalStorageService.set(LS_KEYS.BOOK,[]));
    setIsActiveCart(false)
}
console.log(LocalStorageData.length);
    return (
        <div className="box">
            {isActiveCart  ? <button onClick={handleCleanStorage} disabled={!isActiveCart} id="purchase" type="button">Purchase</button> : null}
            
            {isActiveCart  ? < ListBasket booksInCart={LocalStorageData}  /> : < EmptyBasket /> }
       
        </div>
     
        
        );
    }
    /*  */
    