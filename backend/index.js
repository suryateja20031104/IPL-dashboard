const express = require("express");
const { MongoClient} = require("mongodb");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const url = "mongodb+srv://suryateja1938102074:suryaamazonintern@cluster0.ldxadbe.mongodb.net/";
const dbName = "IPL";

async function connectToMongoDB_tasks() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("MongoDB connected successfully 1.");
    return client.db(dbName).collection("teamsCollection");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

async function connectToMongoDB_tasks1() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("MongoDB connected successfully 2.");
    return client.db(dbName).collection("teamNames");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

app.get("/getteams/", async (req, res) => {
    try {
      const collection = await connectToMongoDB_tasks();
      const employee = await collection.findOne();
      res.status(200).json(employee);
    } 
    catch (error) 
    {
      console.error("Error fetching employee tasks:", error);
      res.status(500).json({ error: "An error occurred while retrieving tasks" });
    }
});

app.get("/getinfo/:teamName", async (req, res) => {
    try 
    {
        const { teamName } = req.params;
        const collection = await connectToMongoDB_tasks1();
        const teamDetails = await collection.findOne({ [teamName]: { $exists: true } });
        if (!teamDetails) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.status(200).json(teamDetails[teamName]);
    } 
    catch (error) 
    {
        console.error("Error fetching team details:", error);
        res.status(500).json({ error: "An error occurred while retrieving team details" });
    }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
