import React from 'react';
import ProductContainer from "./Product";
import Store from '../Store/store';

class Product extends React.Component{
    render(){
        return (
            <Store.Consumer>
                {store => {
                    <ProductContainer user_id={store.id} user_nickname={store.nickname} />
                }
                }
            </Store.Consumer>
        );
    }
}

export default Product;
