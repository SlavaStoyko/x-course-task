import { useState } from "react";
import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";
import { EmptyBasket } from './BasketComponents/EmptyBasket';
import { ListBasket } from './BasketComponents/ListBasket';
import './style.css'


export const Basket = () =>{
    
const [LocalStorageData,setLocalStorageData] = useState(LocalStorageService.get(LS_KEYS.BOOK)||[]);
const [isActiveCart, setIsActiveCart] = useState(true);

const handleCleanStorage = () => {
    setLocalStorageData(LocalStorageService.remove(LS_KEYS.BOOK));
    setIsActiveCart(false);
    
}
console.log(typeof LocalStorageData);
return (
    <div className="box">
            <button onClick={handleCleanStorage} disabled={!isActiveCart} id="purchase" type="button">Purchase</button>
            
            {isActiveCart  ? < ListBasket booksInCart={LocalStorageData}  /> : < EmptyBasket /> }
       
        </div>
     
     
     );
    }
   