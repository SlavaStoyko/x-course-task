import { useEffect, useState } from "react";
import { LS_KEYS, LocalStorageService } from "../../localStorage/localStorage";
import sprite from '../../../images/sprites.svg';
export const ListBasket = (props) => {
    const [data, setData] = useState(props.booksInCart);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        let finalCost = 0;
        data.forEach(({totalCost}) => {
        finalCost = finalCost + totalCost;
        });
        setTotalPrice(finalCost);

        if(data.length > 0){
            LocalStorageService.set(LS_KEYS.BOOK,data);
        }else{
            props.cleanCard(LocalStorageService.remove(LS_KEYS.BOOK));
        }
    },[data]);
    
    const handlerModifyCard = (id) =>{
        
        const modifyCard  =  data.filter((itemCard)=>itemCard.id !== id);
        setData(modifyCard);

    }
    return (
        <section className="box_list">
            
            <h1 className="visibility-hidden">books in the basket</h1>
            <div className="list" key="listBasket">
                
        <ul className="list_books">
            {data.map((itemCart)=>(
                    <li>
                        <article className="listArticleBasket" key={itemCart.id} >
                            <p className="cartTitleItem">{itemCart.title}</p>
                            <p className="cartCountItem">{itemCart.count}</p>
                            <p className="cartPriceItem">$ {itemCart.totalCost.toFixed(2)}</p>
                            <p><button className="btnModifyCard" onClick={()=>{handlerModifyCard(itemCart.id)}} type="button">
                            <svg  width="45" height="40">
                                    <use xlinkHref={`${sprite}#delete`}></use>
                                </svg>
                                </button></p>
                        </article>
                    </li>
                 ))}   
                </ul>
                </div>
                <h2 className="totalPriceBooks"><strong>Total price book, $ <span>{totalPrice.toFixed(2)}</span></strong></h2>
            </section>
    );
}