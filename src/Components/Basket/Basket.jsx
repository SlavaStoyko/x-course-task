import { useState } from "react";
import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";
import { EmptyBasket } from './BasketComponents/EmptyBasket';
import { ListBasket } from './BasketComponents/ListBasket';
import './style.css'


export const Basket = () =>{
    
const [isActiveCart, setIsActiveCart] = useState(!!LocalStorageService.get(LS_KEYS.BOOK));

const handleCleanStorage = () => {
    setIsActiveCart(LocalStorageService.remove(LS_KEYS.BOOK));
}
return (
    <div className="box">
            <button onClick={handleCleanStorage} disabled={!isActiveCart} id="purchase" type="button">Purchase</button>
            
            {isActiveCart  ? < ListBasket booksInCart={LocalStorageService.get(LS_KEYS.BOOK)}  /> : < EmptyBasket /> }
       
        </div>
     
     
     );
    }
   