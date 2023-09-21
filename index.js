const express = require('express');
const connectToDatabase = require('./db'); // Updated import

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Use async/await to connect to the database
(async () => {
  try {
    const { foodData, categoryData } = await connectToDatabase();
    global.foodData = foodData;
    global.foodCategory = categoryData;
    
    app.use('/api/auth', require('./Routes/Auth'));
    
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error in main:', error);
  }
})();
