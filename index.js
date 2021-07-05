const express = require('express'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const sequelize = require('./models');

const swaggerUi = require('swagger-ui-express'),
    swaggerJsDoc = require('swagger-jsdoc');

require('./config/sequelize');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "theknownTech",
            version: "1.0.0",
            description: "theknownTech Blog"
        },
        servers: [
            {
                url: "http://127.0.0.1:5000"
            }
        ], 
    },
    apis: ["./controllers/*.controller.js"]
}

const specs = swaggerJsDoc(options);

dotenv.config({ path: './config/config.env' });
    
const app = express();
    
colors.enable();
    
app.use(express.json());
    
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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