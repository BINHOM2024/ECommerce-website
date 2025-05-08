import mongoose from "mongoose";

const connect_DB =async() => {
    mongoose.connection.on("connected", () => {
        console.log("DB Connected")
    })
 
    await mongoose.connect(`${process.env.MONGODB_URL}`);
}
export default connect_DB;