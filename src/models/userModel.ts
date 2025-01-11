import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

interface IUser extends Document {
    email: string;
    password: string;
    role: "patient" | "doctor" | "admin";
    name: string;
    gender: boolean;
    dateOfBirth: Date;
    status: "active" | "inactive" | "suspended";
    phone: string;
    address: string;
    avatar?: { // Optional field
        url: string;
        fileName: string;
        fileType: string;
    };
    createdAt: Date;
    updatedAt: Date;
    encryptedPassword(password: string): string;
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
        gender: {
            type: Boolean,
            required: [true, "Gender is required"],
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
            url: {
                type: String,
                validate: [validator.isURL, "Please provide a valid URL"],
                default: "https://placehold.co/1000x1000/EEE/31343C?font=lato&text=Not%20Found%20File%20Avatar",
            },
            fileName: {
                type: String,
                default: "N/A",
            },
            fileType: {
                type: String,
                default: "N/A",
            },
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

UserSchema.methods.encryptedPassword = function (password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
};

UserSchema.methods.comparePassword = function (
    candidatePassword: string,
    hash: string
): boolean {
    return bcrypt.compareSync(candidatePassword, hash);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;