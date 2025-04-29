import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "https://complainmanagementsystem-1.onrender.com",
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import adminRouter from "./routes/admin.route.js";
import complainRouter from "./routes/complain.route.js";

app.use("/api/admin", adminRouter);
app.use("/api/user", complainRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
})