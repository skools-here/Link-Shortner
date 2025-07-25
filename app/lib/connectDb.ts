import mongoose from "mongoose"
const connection: { isConnected?: number } = {};
export default async function dbConnect(isConnected?:number){

    if(connection.isConnected){
    return;
    }

    const db=await mongoose.connect(`mongodb+srv://sajal:sajal@cluster0.i0hsbys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

    connection.isConnected = db.connections[0].readyState;
}