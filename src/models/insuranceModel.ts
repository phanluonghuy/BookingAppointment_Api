import mongoose, { Document, Schema } from "mongoose";

interface IInsurance extends Document {
    patientId: mongoose.Types.ObjectId;
    insuranceProvider: string;
    insuranceCardNumber: string;
    benefitLevel: "1" | "2" | "3" | "4" | "5";
    livingAreaCode?: "K1" | "K2" | "K3";
    initialHealthcareFacility: string; // Nơi đăng ký khám chữa bệnh ban đầu
    insuranceCardIssuingPlace: string; // Nơi cấp, đổi thẻ BHYT
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    getBenefitLevelDescription(): string;
    getLivingAreaCodeDescription(): string;
}

const BenefitLevelDescriptions: Record<string, string> = {
    "1": "100% chi phí KCB thuộc phạm vi BHYT",
    "2": "100% chi phí KCB có giới hạn tỷ lệ thanh toán một số thuốc, hóa chất, VTYT và DVKT",
    "3": "95% chi phí KCB, 100% tại tuyến xã",
    "4": "80% chi phí KCB, 100% tại tuyến xã",
    "5": "100% chi phí KCB ngoài phạm vi BHYT, chi phí vận chuyển",
};

const LivingAreaCodeDescriptions: Record<string, string> = {
    K1: "Dân tộc thiểu số và hộ gia đình nghèo ở vùng khó khăn",
    K2: "Dân tộc thiểu số và hộ gia đình nghèo ở vùng đặc biệt khó khăn",
    K3: "Sinh sống tại xã đảo, huyện đảo",
};

const InsuranceSchema: Schema<IInsurance> = new Schema<IInsurance>(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Patient ID is required"],
        },
        insuranceProvider: {
            type: String,
            required: [true, "Insurance provider is required"],
        },
        insuranceCardNumber: {
            type: String,
            required: [true, "Insurance card number is required"],
            minlength: [10, "Insurance card number must be 10 characters"],
            maxlength: [10, "Insurance card number must be 10 characters"],
        },
        benefitLevel: {
            type: String,
            enum: ["1", "2", "3", "4", "5"],
            required: [true, "Benefit level is required"],
        },
        livingAreaCode: {
            type: String,
            enum: ["K1", "K2", "K3"],
            required: false,
        },
        initialHealthcareFacility: {
            type: String,
            required: [true, "Initial healthcare facility is required"],
        },
        insuranceCardIssuingPlace: {
            type: String,
            required: [true, "Insurance card issuing place is required"],
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
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

InsuranceSchema.methods.getBenefitLevelDescription = function (): string {
    return BenefitLevelDescriptions[this.benefitLevel];
};

InsuranceSchema.methods.getLivingAreaCodeDescription = function (): string {
    return this.livingAreaCode
        ? LivingAreaCodeDescriptions[this.livingAreaCode]
        : "";
};

const Insurance = mongoose.model<IInsurance>("Insurance", InsuranceSchema);
export default Insurance;
