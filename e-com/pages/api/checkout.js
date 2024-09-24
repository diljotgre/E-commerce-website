import { initdb } from "@/lib/mongoose";

export default async function checkoutHandler (req,res){
    await initdb();

    if(req.method !== 'POST'){
        res.body('should be a POST request').send();
        return;
    }

    res.json(req.method);

}