import { initdb } from "@/lib/mongoose";
import Product from "@/models/products";

export default async function products (req,res){

    await initdb();
    const products = await Product.find().exec();
    res.status(200).json({products});
    
}