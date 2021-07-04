const express = require('express'); 
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: './config/config.env' });

const app = express();

colors.enable();

app.use(express.json());


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

//Handle Unhandled Promise Rejection 
// eslint-disable-next-line no-unused-vars
process.on('unhandeldRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close Server and Exit Process
    server.close(() => process.exit(1));
})