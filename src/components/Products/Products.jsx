import React from "react";
import {Grid} from '@material-ui/core';

import Product from "./Product/Product";
import useStyles from './styles'

// const products = [
//     {id: 1, name: 'RAM', description: 'DDR4 Ram modules.', price: '$100', image: 'https://cdn.mdcomputers.in/image/cache/catalog/memory/g%20skill/f4-3600c19d-16gtzrb/f4-3600c19d-16gtzrb-image-main-600x600.jpg' },
//     {id: 2, name: 'GPU', description: 'Graphics Cards.', price: '$700', image: 'https://dlcdnwebimgs.asus.com/gain/a391e6f3-74d9-46d8-bccf-24f0e6713232/w800'},

// ];

const Products = ( {products, onAddToCart} ) => {
    const classes = useStyles();
    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
        <Grid container justify="center" spacing={4}>
            {products.map( (product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart = {onAddToCart}/>
                </Grid>
            
            ))}
        </Grid>
    </main>
    )
    
}

export default Products;