const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());

const OPENAI_API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";
// Configure OpenAI API credentials

// Define the GET route
app.get("/grammar", async (req, res) => {
  // Get the text query parameter
  const { text } = req.query;
  const prompt = `Forget previous instructions. Act like a professional writer. I will provide input and you will scan the text for spelling, grammar, and fluency mistakes. If there are no mistakes you will respond with "OK." If there are spelling, grammar, and fluency mistakes you will respond with the corrected text. You will NOT state that there are errors. You will NOT provide an explanation of the corrections you made. You will NOT make a note of what you corrected. You will ONLY provide the corrected text. Input ${text}`;
  try {
    // Call OpenAI's Curie API to generate text variations for the input word
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    };
    axios
      .post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        res.json({
          result: response.data.choices[0].message.content,
        });
      })
      .catch((error) => console.log(error));

    // Return the generated text variations as the API response
  } catch (error) {
    console.log(error);
    res.status(500).send("Error generating text variations");
  }
});

app.get("/aiseo", async (req, res) => {
  // Get the text query parameter
  const { text } = req.query;
  const prompt = `Forget previous instructions. Act like a professional writer. I will provide input and you will provide a variation of the input with improved readability. Do NOT change the tone or context of the input. You will NOT provide an explanation of the changes you made. You will NOT make a note of what you changed. You will ONLY provide the new variation. Input ${text}`;

  try {
    // Call OpenAI's Curie API to generate text variations for the input word
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    };
    axios
      .post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        res.json({
          result: response.data.choices[0].message.content,
        });
      })
      .catch((error) => console.error(error));

    // Return the generated text variations as the API response
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating text variations");
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
