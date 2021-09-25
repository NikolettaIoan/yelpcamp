const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6144e14ff38d161c70419af5',
      location: `${cities[random1000].city}, ${cities[random1000].state} `,
      title: `${sample(descriptors)} ${sample(places)}`,

      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam exercitationem sunt id et? Atque similique, quasi consectetur, quo sint quae ea facilis ratione sit voluptates quas, rem earum animi eum!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dypt4q91p/image/upload/v1632057985/YelpCamp/fl2trrzb6eyvqwrzvv0z.jpg',
          filename: 'YelpCamp/fl2trrzb6eyvqwrzvv0z',
        },
        {
          url: 'https://res.cloudinary.com/dypt4q91p/image/upload/v1632057984/YelpCamp/ddcnkthamioippwej2aq.jpg',
          filename: 'YelpCamp/ddcnkthamioippwej2aq',
        },
      ],
    });
    await camp.save();
  }
};

// seedDB();
seedDB().then(() => {
  mongoose.connection.close();
});
