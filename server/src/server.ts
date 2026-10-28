import "dotenv/config";
import app from "./app.ts";

const port: number = Number(process.env.PORT) || 5000;

app.listen(port, () => {
    console.log("Server is live at port: ", port);
})