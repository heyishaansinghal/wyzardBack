const express = require("express");
const app = express();
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

app.use(cors());

const OPENAI_API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";
// Configure OpenAI API credentials

// Define the GET route
app.get("/grammar", async (req, res) => {
  // Get the text query parameter
  const { text } = req.query;
  const prompt = `Forget previous instructions. Act like a professional writer. I will provide input and you will scan the text for spelling, grammar, and fluency mistakes. If there are no mistakes you will respond with "OK." If there are spelling, grammar, and fluency mistakes you will respond with the corrected text. You will NOT state that there are errors. You will NOT provide an explanation of the corrections you made. You will NOT make a note of what you corrected. You will ONLY provide the corrected text. Input ${text} Also give me the number of errors you corrected in this given text in the end after the corrected text so for a incorrect text first you will have a correct text and then a plus + sign and then Number of error's corrected like for this text for example : "P.S. Need help turning a business idea into reality? I reopened my course Monthly1K for just $10 (kinda limited time). Sign up at OkDork.com/Monthly1K.
" THis is the correct text according to you : "P.S. Need help turning a business idea into reality? I've reopened my course Monthly1K for just $10 (for a limited time). Sign up at OkDork.com/Monthly1K." and only 1 word is change so the output you will give me will be Corrected Text : "P.S. Need help turning a business idea into reality? I've reopened my course Monthly1K for just $10 (for a limited time). Sign up at OkDork.com/Monthly1K." Number of Error's : "1" If there are 0 Number of Error's you will only revert with the orignal text nothing else no explanations or any other sentences only and only Pure text that i gave you just revert that back`;
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
