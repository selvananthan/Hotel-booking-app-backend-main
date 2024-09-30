const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const reviewRoutes = require('./routes/reviews');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payment')
const app = express();
const port = process.env.PORT ||10000;
const dburl = process.env.MONGO_URI;


// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization' // Allowed headers
};

// Middleware
app.use(cors(corsOptions));  // Enables CORS with specific options
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment/',paymentRoutes)
const connectDb = async () => {

  if (mongoose.connection.readyState === 1) {
      console.log(' MongoDb instance already connected ');
      return
  }
  

  await mongoose.connect('mongodb+srv://Selva:Mars%401992@selva.tvmfr.mongodb.net/HotelBooking');
  console.log(mongoose.connection.readyState, ' Connection State');
}
connectDb
// Connect to MongoDB
// mongoose.connect(dburl)
// // mongoose.connect('mongodb+srv://selvagoogly:%3CMars%401992%3E@cluster0.k3rqn.mongodb.net/SiddHotelBooking?retryWrites=true&w=majority&appName=Cluster0')

// // mongoose.connect('mongodb://localhost:27017/SiddHotelBooking',{ useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 ,ssl: false,})
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

