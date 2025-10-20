'use server'

import { scrapeAmazonProduct } from "../scraper";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { getLowestPrice,getHighestPrice,getAveragePrice } from "../utils";
import { generateEmailBody, sendEmail} from "../nodemailer";
import { User } from "@/types";
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
        console.log('this is the scraped data')
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

export async function getAllProducts(){
    try {
        connectToDB();
        const products  = await Product.find();
        // console.log(products);
        return products;
    } catch (error) {
        console.log(error);
    }
}
export async function getSimilarProducts(productId:string){
    try {
        connectToDB();
        const currentProduct = await Product.findById(productId);
        if(!currentProduct) return null
        const similarProducts = await Product.find({
            _id:{$ne:productId},
        }).limit(3)
        // console.log(products);
        return similarProducts;
    } catch (error) {
        console.log(error);
    }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {
  try {
    const product = await Product.findById(productId);

    if(!product) return;

    const userExists = product.users.some((user: User) => user.email === userEmail);

    if(!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}