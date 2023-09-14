import mongoose from "mongoose";
export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION_STRING!)
        const connection = mongoose.connection
        connection.on("connected",() => {
            console.log("MongoDB Connect successfully");
            
        })
        connection.on('error',(err) => {
            console.log("Mongodb connection error Plz make sure Mongodb is Running"+ err);
            process.exit();
            
        })
    } catch (error) {
        console.log("Some thing went Worng");
        console.log(error);
        
        
    }
}