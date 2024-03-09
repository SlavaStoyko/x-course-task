import { useEffect, useState } from "react";
import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";
import { EmptyBasket } from './BasketComponents/EmptyBasket';
import { ListBasket } from './BasketComponents/ListBasket';
import './style.css'

export const Basket = () =>{
const [LocalStorageData,setLocalStorageData] = useState(LocalStorageService.get(LS_KEYS.BOOK)||[]);
useEffect(()=>{
if(LocalStorageData == null){
    setISCheckBasket(true);
}
},[])
const [isCheckBasket, setISCheckBasket] = useState(false);
const handleCleanStorage = () => {
    setLocalStorageData(LocalStorageService.remove(LS_KEYS.BOOK));
    setISCheckBasket(true)
}

    return (
        <div className="box">
            {!isCheckBasket  ? <button onClick={handleCleanStorage} disabled={isCheckBasket} id="purchase" type="button">Purchase</button> : null}
            
            {!isCheckBasket  ? < ListBasket booksInCart={LocalStorageData}  /> : < EmptyBasket /> }
       
        </div>
     
        
        );
    }
    /*  */
    