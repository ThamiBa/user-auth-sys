import express from 'express';	// Import express

const app = express();	// Create express app

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {	// Start server
    console.log('Server is running on port 3000');
});
