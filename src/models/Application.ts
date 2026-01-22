import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
    // Personal Info
    name: string;
    age: number;
    profession?: string;
    phone: string;
    whatsapp?: string;
    email?: string;
    qualification?: string;

    // Present Address
    presentState: string;
    presentDistrict: string;
    presentTown: string;
    presentTehsil?: string;
    presentHouseNo: string;
    presentAddress: string;
    presentPinCode: string;

    // Permanent Address
    permanentState: string;
    permanentDistrict: string;
    permanentTown: string;
    permanentTehsil?: string;
    permanentHouseNo: string;
    permanentPermanentAddress: string;
    permanentPinCode: string;

    // Other
    remark?: string;

    // Files (Base64 string or URL)
    aadharFront?: string;
    aadharBack?: string;

    status: "Pending" | "Approved" | "Rejected";
    createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
    {
        // Personal
        name: { type: String, required: true },
        age: { type: Number, required: true },
        profession: { type: String },
        phone: { type: String, required: true },
        whatsapp: { type: String },
        email: { type: String },
        qualification: { type: String },

        // Present Address
        presentState: { type: String, required: true },
        presentDistrict: { type: String, required: true },
        presentTown: { type: String, required: true },
        presentTehsil: { type: String },
        presentHouseNo: { type: String, required: true },
        presentAddress: { type: String, required: true },
        presentPinCode: { type: String, required: true },

        // Permanent Address
        permanentState: { type: String },
        permanentDistrict: { type: String },
        permanentTown: { type: String },
        permanentTehsil: { type: String },
        permanentHouseNo: { type: String },
        permanentPermanentAddress: { type: String },
        permanentPinCode: { type: String },

        // Other
        remark: { type: String },
        aadharFront: { type: String }, // Storing base64 for simplicity in MVP
        aadharBack: { type: String },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const Application: Model<IApplication> =
    mongoose.models.Application ||
    mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
