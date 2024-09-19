import mongoose from "mongoose";

export async function initdb(){


    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }
    return await mongoose.connect(process.env.MONGO);

    
}