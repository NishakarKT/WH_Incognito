import mongoose from "mongoose";

const DB_URL = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.w4sgi.mongodb.net/hackathon?retryWrites=true&w=majority`

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
})
    .then(() => console.log("connection: success"))
    .catch(err => console.log(err));