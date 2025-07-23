const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 


app.get('/', (req, res) => {
  res.send('Welcome to the Basic Express Server!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
