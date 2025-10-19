'use server'

import { scrapeAmazonProduct } from "../scraper";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { getLowestPrice,getHighestPrice,getAveragePrice } from "../utils";
import Product from "../models/product.model";
export async function scrapeAndStoreProduct(productUrl:string){
    if(!productUrl) return;
    try {
        connectToDB();
        const scrapedProduct = await scrapeAmazonProduct(productUrl)
        if(!scrapedProduct) return;
        let product = scrapedProduct;
        let existingProduct  = await Product.findOne({url:scrapedProduct.url});
        if(existingProduct){
            const updatedPriceHistoy:any = [
                ...existingProduct.priceHistory,
                {price:scrapedProduct.currentPrice}
            ]
            product = {
                ...scrapedProduct,
                priceHistory : updatedPriceHistoy,
                lowestPrice: getLowestPrice(updatedPriceHistoy),
                highestPrice: getHighestPrice(updatedPriceHistoy),
                averagePrice: getAveragePrice(updatedPriceHistoy),

            }
        }
        const newProduct = await Product.findOneAndUpdate(
            {url:scrapedProduct.url},
            product,
            {upsert:true,new:true}
        );
        revalidatePath(`/products/${newProduct._id}`)
        console.log(scrapedProduct)

    } catch (error:any) {
        throw new Error(`Failed to update product : ${error.message}`)
    }

}

export async function getProductById(productId:string){
    try {
        connectToDB();
        const product = await Product.findOne({_id : productId});
        if(!product) return null;
        return product;
        
    } catch (error) {
        console.log(error);
    }
}