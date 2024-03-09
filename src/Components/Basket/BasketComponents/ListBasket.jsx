import { useEffect, useState } from "react";

export const ListBasket = (props) => {
    const [totalPrice, settotalPrice] = useState(0);

    useEffect(()=>{
        let finalCost = 0;
    props.booksInCart.forEach(({totalCost}) => {
        finalCost = finalCost + totalCost;
        });
        settotalPrice(finalCost)
    },[props])
    
    return (
        <section className="box_list">
            
            <h1 className="hidenheader visibility-hidden">books in the basket</h1>
            <div className="list" key="listBasket">
                
        <ul className="list_books">
            {props.booksInCart.map((itemcart)=>(
                    <li>
                        <article className="listArticleBasket" key={itemcart.id} >
                            <p className="cartTitleItem">{itemcart.title}</p>
                            <p className="cartCountItem">{itemcart.count}</p>
                            <p className="cartPriceItem">$ {itemcart.totalCost.toFixed(2)}</p>
                        </article>
                    </li>
                 ))}   
                </ul>
                </div>
                <h2 className="totalPriceBooks"><strong>Total price book, $ <span>{totalPrice.toFixed(2)}</span></strong></h2>
            </section>
    );
}