// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParse from "body-parser";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;

// URL for the secrets API
const API_URL = "https://secrets-api.appbrewery.com/";

// Set EJS as the templating engine
app.set("view engine", "ejs");

// 3. Use the public folder for static files.
// tells EJS that all of the static files are in the public folder
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  try {
    // 5. Use axios to get a random secret and pass it to index.ejs to display the
    // secret and the username of the secret.
    const result = await axios.get(`${API_URL}random`);
    // the random secret retured from the GET request (response) is stored in the result's data object
    let randomSecret = result.data;
    console.log('randomSecret = ', randomSecret);
    res.render('index', {
        secret: randomSecret.secret,
        user: randomSecret.username
    });
  } catch (error) {
    // Theoretically, this block should never be reached (unless there's an issue with the secrets API).
    // GET request for a random secret should always work unless there are no secrets stored in the database 
    // or something is wrong with the secrets API.
    console.log("Error: ", error);
    res.render('index', {
        secret: 'Secret not generated',
        user: 'Username not generated',
        error: error
    })
  }
  
});

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
