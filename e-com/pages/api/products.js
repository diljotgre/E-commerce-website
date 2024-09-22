import { initdb } from "@/lib/mongoose";
import Product from "@/models/products";


export  async function findAllProducts(){
    return Product.find().exec();
}
export default async function products (req,res){

    await initdb();
    const {ids} = req.query;
    if (ids){
        const idsArray = ids.split(",");
        res.json( await Product.find({'_id':{$in: idsArray}}).exec());
    }
    const products = await findAllProducts();
    res.status(200).json({products});
    
}