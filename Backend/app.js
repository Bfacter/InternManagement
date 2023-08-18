const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./connection/mongooseconnection');
const corsMiddleware = require('./middlewares/registrationscors');
const cors = require('cors');
const registrationRoutes = require('./routes/registrationroute');
const loginRoute=require('./routes/loginroute')
const formgetRoute=require('./routes/formgetroute')
const formpostRoute=require('./routes/formpostroute')
const app = express();
const port = 4444; 

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
 
     
app.use('/register', registrationRoutes);
app.use('/login', loginRoute);
app.use('/form/:RID',formgetRoute);
app.use('/form/post', formpostRoute);
connectDB().then(()=>{
  console.log("connectedDB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
)

