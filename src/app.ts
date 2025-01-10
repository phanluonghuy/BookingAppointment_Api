import express, {Application} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import error from "./middlewares/errorMiddleware";

// routers
import userRouter from "./routes/userRoute";
import allergyRouter from "./routes/allergyRoute";
import insuranceRouter from "./routes/insuranceRoute";
import specializationRouter from "./routes/specializationRoute";
import workScheduleRouter from "./routes/workScheduleRoute";
import ratingAndReviewRouter from "./routes/ratingAndReviewRoute";
import appointmentRouter from "./routes/appointmentRoute";
import paymentRouter from "./routes/paymentRoute";
import medicalRecordRouter from "./routes/medicalRecordRoute";
import examinationRouter from "./routes/examinationRoute";
import healthStatusRouter from "./routes/healthStatusRoute";
import testResultRouter from "./routes/testResultRoute";
import medicineRouter from "./routes/medicineRoute";
import dosageRouter from "./routes/dosageRoute";
import prescriptionRouter from "./routes/prescriptionRoute";
import notificationRouter from './routes/notificationRoute';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bookingAppointment";
const SERVER_URL = process.env.SERVER_URL || "http://localhost";
const SESSION_SECRET = process.env.TOKEN_SECRET || "150131091ad22d4e4acecd1340fef3d6cef0477a3745520756e19c9f2021f37f18bb45aa135049ee36d4ad7439dc8cad72d928c95332c6b8da59c56521d85a56"


app.use(
    cors({
        origin: "*",
        methods: "GET, PATCH, POST, DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);
app.use(express.json());
app.use(error);

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);

app.use("/api/user", userRouter);
app.use("/api/allergy", allergyRouter);
app.use("/api/insurance", insuranceRouter);
app.use("/api/specialization", specializationRouter);
app.use("/api/work-schedule", workScheduleRouter);
app.use("/api/rating-review", ratingAndReviewRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/medical-record", medicalRecordRouter);
app.use("/api/examination", examinationRouter);
app.use("/api/health-status", healthStatusRouter);
app.use("/api/test-result", testResultRouter);
app.use("/api/medicine", medicineRouter);
app.use("/api/dosage", dosageRouter);
app.use("/api/prescription", prescriptionRouter);
app.use('/api/notification', notificationRouter);

mongoose
    .connect(MONGO_URI as string)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Backend running on ${SERVER_URL}:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

app.get("/", (req, res) => {
    res.send("Hello World");
});