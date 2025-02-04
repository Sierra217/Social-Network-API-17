import { Schema, model, Types, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    friendCount?: number;
}

const userSchema = new Schema<IUser>(
    {
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
                type:Schema.Types.ObjectId,
                _id: "User",
            }
        ]
    },  
);
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);

export default User;
