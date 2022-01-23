import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    profilePic: { type: String },
    bio: { type: String },
    quote: { type: String },
    course: { type: String },
    department: { type: String },
    hall: { type: String },
    contact: {
        number: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        youtube: { type: String },
        github: { type: String },
        reddit: { type: String },
        pinterest: { type: String },
    }
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll: { type: String, required: true },
    username: { type: String, required: true },
    hashedPass: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    society: { type: String },
}, { timestamps: true });

const tsgEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    host: { type: String, required: true },
    updatesBy: [{
        date: { type: Date, required: true },
        id: { type: String, required: true },
    }],
    fileURLs: [{ type: String }],
}, { timestamps: true });

const socEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    host: { type: String, required: true },
    updatesBy: [{
        date: { type: Date, required: true },
        id: { type: String, required: true },
    }],
    fileURLs: [{ type: String }],
}, { timestamps: true });

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    host: { type: String, required: true },
    updatesBy: [{
        date: { type: Date, required: true },
        id: { type: String, required: true },
    }],
    fileURLs: [{ type: String }],
}, { timestamps: true });

const quickInfoSchema = new mongoose.Schema({
    title: { type: String },
    name: { type: String },
    description: { type: String },
    designation: { type: String },
    department: { type: String },
    date: { type: Date },
    category: { type: String, required: true },
    subCategory: { type: String },
    researchArea: { type: String },
    URL: { type: String },
    host: { type: String },
    fileURLs: [{ type: String }],
    updatesBy: [{
        date: { type: Date, required: true },
        id: { type: String, required: true },
    }],
    contact: {
        number: { type: String },
        email: { type: String },
    }
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

const messagesSchema = new mongoose.Schema({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    messages: [messageSchema]
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    category: { type: String },
    description: { type: String },
    date: { type: Date },
    host: { type: String },
    fileURLs: [{ type: String }],
}, { timestamps: true });

const notificationSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    type: { type: String },
    from: { name: { type: String }, email: { type: String }, profilePic: { type: String } },
    to: { name: { type: String }, email: { type: String }, profilePic: { type: String } },
}, { timestamps: true });

const achievementSchema = new mongoose.Schema({
    event: tsgEventSchema,
    achiever: { type: String },
    pos: { type: Number },
    total: { type: Number },
    certificate: { type: String },
    date: { type: Date },
    updatesBy: [{
        date: { type: Date, required: true },
        id: { type: String, required: true },
    }],
}, { timestamps: true });

export const User = new mongoose.model("users", userSchema);
export const Admin = new mongoose.model("admins", adminSchema);
export const TsgEvent = new mongoose.model("tsgEvents", tsgEventSchema);
export const SocEvent = new mongoose.model("socEvents", socEventSchema);
export const News = new mongoose.model("news", newsSchema);
export const QuickInfo = new mongoose.model("quickInfo", quickInfoSchema);
export const Messages = new mongoose.model("messages", messagesSchema);
export const Post = new mongoose.model("posts", postSchema);
export const Notification = new mongoose.model("notifications", notificationSchema);
export const Achievement = new mongoose.model("achievements", achievementSchema);