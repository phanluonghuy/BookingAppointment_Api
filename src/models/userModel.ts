/* external imports */
import mongoose, { Document, model, ObjectId, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

/* create user schema interface */
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: {
        url: string;
        public_id: string;
    };
    phone: string;
    address: string;
    dateOfBirth: Date;
    isVerified: boolean;
    isFemale : boolean;
    bio: string;
    experience: number;
    role: "doctor" | "patient";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
    loyaltyPoints: number;

    encryptedPassword(password: string): string;

    comparePassword(password: string, hash: string): boolean;

    earnPoints(orderValue: number): number;

    redeemPoints(points: number): number;
}

/* create user schema */
const userSchema = new Schema<IUser>(
    {
        // for full name
        name: {
            type: String,
            required: [true, "Please, provide your full name"],
            trim: true,
            maxLength: [100, "Your name would be at most 100 characters"],
        },

        // for email
        email: {
            type: String,
            required: [true, "Please, provide your email address"],
            validate: [validator.isEmail, "Provide a valid email address"],
            unique: true,
        },

        // for password
        password: {
            type: String,
            required: [true, "Please, provide a strong password"],
            validate: {
                validator: (value: string) =>
                    validator.isStrongPassword(value, {
                        minUppercase: 1,
                        minLowercase: 1,
                        minNumbers: 1,
                        minSymbols: 1,
                    }),
                message:
                    "Password {VALUE} should contain minimum 1 => uppercase, lowercase, number, and symbol",
            },
            minLength: [8, "Password should be at least 8 characters"],
            maxLength: [20, "Password should be at most 20 characters"],
        },

        // for avatar
        avatar: {
            url: {
                type: String,
                validate: [validator.isURL, "Please provide a valid avatar URL"],
                default: "https://placehold.co/300x300.png",
            },
            // porducts  =]]]
            public_id: {
                type: String,
                default: "N/A",
            },
        },

        // for contact number
        phone: {
            type: String,
            default: "N/A",
            validate: {
                validator: (value: string) => {
                    if (value === "N/A") return true;
                    // const regexPhoneNumber = /(84)+([0-9]{8})\b/g;
                    const regexPhoneNumber = /^84\d{9,10}$/;
                    return value.match(regexPhoneNumber) ? true : false;
                },
                // value === "N/A" || validator.isMobilePhone(value, "vi-VN", { strictMode: true }),
                message:
                    "Phone number {VALUE} is not valid. Please, retry like 84xxxxxxxxx or 0xxxxxxxxx",
            },
        },

        // for role
        role: {
            type: String,
            enum: ["doctor", "patient"],
            default: "patient",
        },

        // for account status
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        address: { type: String, default: "N/A" },

        dateOfBirth: {
            type: Date,
            required: [true, "Please, provide your date of birth"],
        },
        isVerified: { type: Boolean, default: false },

        isFemale: { type: Boolean, default: false },

        bio: { type: String, default: "Bio." },

        experience: { type: Number, default: 0 },

        createdAt: {
            type: Date,
            default: Date.now,
        },
        
        updatedAt: {
            type: Date,
            default: Date.now,
        },

        loyaltyPoints: {
            type: Number,
            default: 0,
            validate: {
                validator: (value: number) => value >= 0,
                message: "Loyalty points cannot be negative",
            },
        },
    },
    { timestamps: true }
);

/* encrypted user account password */
userSchema.methods.encryptedPassword = function (password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
};

/* middleware to encrypt password */
userSchema.pre("save", async function (next) {
    try {
        // initialize encrypted password
        if (!this.isModified("password")) {
            return next();
        }
        // encrypt password
        this.password = this.encryptedPassword(this.password);
        //  console.log("Password encrypted successfully");
    } catch (error) {
        next(error as mongoose.CallbackError);
    }
});

/* compare passwords as sign in proportion */
userSchema.methods.comparePassword = function (
    password: string,
    hash: string
): boolean {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
};

userSchema.methods.earnPoints = function (orderValue: number): number {
    const pointsEarned = Math.floor(orderValue * 0.05); // 5%
    this.loyaltyPoints += pointsEarned;
    return pointsEarned;
};

userSchema.methods.redeemPoints = function (points: number): number {
    if (this.loyaltyPoints < points) {
        throw new Error("Insufficient loyalty points");
    }

    const discountValue = points * 1000;
    this.loyaltyPoints -= points;
    return discountValue;
};

/* create user model schema */
const User = model<IUser>("User", userSchema);

/* export user schema */
export default User;
