//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 1. Create Express app
const app = express();
const port = 3000;
var userIsAuthorised = false;

// 2. Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 3 Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Middleware to check password
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);


// 3. Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
  
// 4. Route to explicitly fetch index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

// 5. Route to handle form submission
app.post("/check", (req, res) => {
    if (userIsAuthorised) {
      res.sendFile(__dirname + "/public/secret.html");
    } else {
      res.redirect("/");   
    }
  });
  
// 4. Start server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  