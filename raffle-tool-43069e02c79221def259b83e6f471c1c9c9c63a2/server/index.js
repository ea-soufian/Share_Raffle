import "@shopify/shopify-api/adapters/node";
import "dotenv/config";
import Express from "express";
import mongoose from "mongoose";
import { resolve } from "path";
import shopify from "../utils/shopifyConfig.js";
import sessionHandler from "../utils/sessionHandler.js";
import csp from "./middleware/csp.js";
import setupCheck from "../utils/setupCheck.js";
import {
  customerDataRequest,
  customerRedact,
  shopRedact,
} from "./controllers/gdpr.js";
import applyAuthMiddleware from "./middleware/auth.js";
import isShopActive from "./middleware/isShopActive.js";
import verifyHmac from "./middleware/verifyHmac.js";
import verifyProxy from "./middleware/verifyProxy.js";
import verifyRequest from "./middleware/verifyRequest.js";
import proxyRouter from "./routes/app_proxy/index.js";
import userRoutes from "./routes/index.js";
import webhookRegistrar from "./webhooks/index.js";
import RafflePost from "./RafflePostModelHost.js";
import RaffleEntry from "./RaffleEntryModelHost.js"; // Add this line
import cors from "cors"; // Add this line

setupCheck(); // Run a check to ensure everything is set up properly

const PORT = parseInt(process.env.PORT, 10) || 8081;
const isDev = process.env.NODE_ENV === "dev";

// MongoDB Connection
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/shopify-express-app";

mongoose.connect(mongoUrl);

// Register all webhook handlers
webhookRegistrar();

const createServer = async (root = process.cwd()) => {
  const app = Express();
  app.disable("x-powered-by");

  applyAuthMiddleware(app);

  // Enable CORS
  app.use(cors()); // Add this line

  // Incoming webhook requests
  app.post(
    "/webhooks/:topic",
    Express.text({ type: "*/*" }),
    async (req, res) => {
      const { topic } = req.params || "";
      const shop = req.headers["x-shopify-shop-domain"] || "";

      try {
        await shopify.webhooks.process({
          rawBody: req.body,
          rawRequest: req,
          rawResponse: res,
        });
        console.log(`--> Processed ${topic} webhook for ${shop}`);
      } catch (e) {
        console.error(
          `---> Error while registering ${topic} webhook for ${shop}`,
          e
        );
        if (!res.headersSent) {
          res.status(500).send(error.message);
        }
      }
    }
  );

  app.use(Express.json());

  // GET request to retrieve RafflePost data
  app.get("/raffle-posts", async (req, res) => {
    try {
      const rafflePosts = await RafflePost.find();
      res.status(200).json(rafflePosts);
    } catch (error) {
      console.error("Error retrieving RafflePost data:", error);
      res.status(500).send("An error occurred while retrieving data.");
    }
  });

  // GET request to retrieve RaffleEntry data
  app.get("/raffle-entries", async (req, res) => {
    const { productId } = req.query;
    try {
      const raffleEntries = await RaffleEntry.find({ productId: productId });
      res.json(raffleEntries);
    } catch (error) {
      console.error("Error fetching raffle entries:", error);
      res.status(500).json({ error: "Error fetching raffle entries" });
    }
  });

  app.post("/graphql", verifyRequest, async (req, res) => {
    // ...
  });

  app.use(csp);
  app.use(isShopActive);
 
  app.use("/apps", verifyRequest, userRoutes); 
  app.use("/proxy_route", verifyProxy, proxyRouter); 

  app.post("/gdpr/:topic", verifyHmac, async (req, res) => {
    // ...
  });

  if (!isDev) {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    const fs = await import("fs");

    app.use(compression());
    app.use(serveStatic(resolve("dist/client")));
    app.use("/*", (req, res, next) => {
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${root}/dist/client/index.html`));
    });
  }

  return { app };
};

createServer().then(({ app }) => {
  app.listen(PORT, () => {
    console.log(`--> Running on ${PORT}`);
  });
});
