import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "please use valid email address"]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            _id: "Thought",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            _id: "User",
        }
    ]
});
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});
const User = model("User", userSchema);
export default User;
