import mongoose from 'mongoose'

const connectMongoose=async()=>{
    try{
    const {connection}=await mongoose.connect(process.env.MONGO_URI as string);
    if(connection.readyState===1) {
        console.log('succesfully connected')
        return Promise.resolve(true);
    }
    }catch(err) {
        return Promise.reject(err);
    }
}

export default connectMongoose;



