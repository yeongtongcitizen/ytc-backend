const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const compression = require('compression');
const greatRoute = require("./routes/great");
const suggestionReviewRoute = require("./routes/suggestionReview");
const suggestionRoute = require("./routes/suggestion");
const financeRoute = require("./routes/finance");
const memberRoute = require("./routes/member");
const configurationRoute = require("./routes/configuration");
const eventRoute = require("./routes/event");
const eventFileRoute = require("./routes/eventFile");
const eventJoinRoute = require("./routes/eventJoin");
const eventAttendRoute = require("./routes/eventAttend");
const eventReviewRoute = require("./routes/eventReview");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const restRoute = require("./routes/restaurant");
const catRoute = require("./routes/category");
const foodRoute = require("./routes/food");
const cartRoute = require("./routes/cart");
const addressRoute = require("./routes/address");
const driverRoute = require("./routes/driver");
const orderRoute = require("./routes/order");

dotenv.config()

const admin = require('firebase-admin')
const serviceAccount = require('./servicesAccountKey.json')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected to the db")).catch((err) => { console.log(err) });


app.use(compression({
    level: 6,
    threshold: 0
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", authRoute);
app.use("/api/great", greatRoute);
app.use("/api/suggestion", suggestionRoute);
app.use("/api/suggestion/review", suggestionReviewRoute);
app.use("/api/finance", financeRoute);
app.use("/api/member", memberRoute);
app.use("/api/configuration", configurationRoute);
app.use("/api/users", userRoute);
app.use("/api/event", eventRoute);
app.use("/api/event/join", eventJoinRoute);
app.use("/api/event/attend", eventAttendRoute);
app.use("/api/event/file", eventFileRoute);
app.use("/api/event/review", eventReviewRoute);
app.use("/api/restaurant", restRoute);
app.use("/api/category", catRoute);
app.use("/api/foods", foodRoute);
app.use("/api/cart", cartRoute);
app.use("/api/address", addressRoute);
app.use("/api/driver", driverRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/applied", appliedRoute);


app.listen(process.env.PORT || 6000, () => console.log(`YTC backend app listening on port ${process.env.PORT}!`));
