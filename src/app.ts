import express, { Application } from "express";
import cors from "cors";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// application route
app.use("/api/", router);

// HTML content for home page of the live server
app.get("/", (req, res) => {
  res.send(`<div 
    style="margin: -8px;
    padding: 0;
    font-family: Arial, sans-serif;
    background: linear-gradient(to right,rgb(153, 0, 255),rgb(248, 80, 68)); 
    height: 100vh; 
    display: flex; 
    justify-content: center; 
    align-items: center;"
    >
     <div 
     style="text-align: center; 
     background-color: rgba(134, 224, 205, 0.9); padding: 50px; 
     margin: auto 20px; 
     border-radius: 15px; 
     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);"
     >
        <h1 
        style="font-size: 3em;
        color: #333;"
        >Welcome to Gym Class Management Server</h1>

        <p 
        style="font-size: 1.2em; 
        color: #444; 
        margin: 20px 0;"
        >
            We're excited to have you here. Explore our features and api's for Making your website more dynamic, real and user friendly!
        </p>
        
        <a href="https://github.com/nurullah91/gym-class-management" style="display: inline-block; padding: 15px 30px; font-size: 1.2em; color: white; background-color: #00A86B; border-radius: 25px; text-decoration: none; transition: background-color 0.3s;">
            Explore API Endpoints
        </a>
    </div>
    </div>`);
});

// Global routes
app.use(globalErrorHandler);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
app.use(notFound);

export default app;
