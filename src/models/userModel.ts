import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

interface IUser extends Document {
    email: string;
    password: string;
    role: "patient" | "doctor" | "admin";
    name: string;
    dateOfBirth: Date;
    status: "active" | "inactive" | "suspended";
    phone: string;
    address: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string, hash: string): boolean;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: [validator.isEmail, "Invalid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        role: {
            type: String,
            enum: ["patient", "doctor", "admin"],
            default: "patient",
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        dateOfBirth: {
            type: Date,
            required: false,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "suspended"],
            default: "active",
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        avatar: {
            type: String,
            required: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = function (
    candidatePassword: string,
    hash: string
): boolean {
    return bcrypt.compareSync(candidatePassword, hash);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;