import { useEffect, useState } from "react";

export const ListBasket = (props) => {
    const [data, setData] = useState(props.booksInCart);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        let finalCost = 0;
    props.booksInCart.forEach(({totalCost}) => {
        finalCost = finalCost + totalCost;
        });
        setTotalPrice(finalCost);
        
    },[data])
    return (
        <section className="box_list">
            
            <h1 className="visibility-hidden">books in the basket</h1>
            <div className="list" key="listBasket">
                
        <ul className="list_books">
            {props.booksInCart.map((itemCart)=>(
                    <li>
                        <article className="listArticleBasket" key={itemCart.id} >
                            <p className="cartTitleItem">{itemCart.title}</p>
                            <p className="cartCountItem">{itemCart.count}</p>
                            <p className="cartPriceItem">$ {itemCart.totalCost.toFixed(2)}</p>
                        </article>
                    </li>
                 ))}   
                </ul>
                </div>
                <h2 className="totalPriceBooks"><strong>Total price book, $ <span>{totalPrice.toFixed(2)}</span></strong></h2>
            </section>
    );
}