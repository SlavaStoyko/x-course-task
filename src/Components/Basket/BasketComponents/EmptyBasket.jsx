import sprite from '../../../images/sprites.svg';

export const EmptyBasket = () => {

    return (
<section className="box_list">
            <h1 className="hidenheader visibility-hidden">Empty shopping cart page</h1>
            <div className="list" key="EmptyBasket">
            <div class="buscet_img">
                    <svg>
                        <use xlinkHref={`${sprite}#basket`}></use>
                    </svg>
                    <h1 class="TextAboutBasket" >Cart empty</h1>
                </div>
            </div>
            </section>
    );
}