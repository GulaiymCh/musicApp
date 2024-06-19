const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
  await mongoose.connect(config.mongo.db);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }
  
  const [admin, tom] = await User.create({
    username: 'admin@gmail.com',
    password: 'admin',
    role: 'admin',
    token: nanoid(),
    displayName: 'Admin',
    avatarImage: 'https://img.icons8.com/color/480/avatar.png',
  }, {
    username: 'tom@gmail.com',
    password: 'tom',
    role: 'user',
    token: nanoid(),
    displayName: 'Tom',
    avatarImage: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
  });

  const [Eilish, Grande, Houston] = await Artist.create({
    title: "Billie Eilish",
    information: null,
    image: "fixtures/UC7jcQTHUBnedlkuEGErW.jpg",
    publish: true,
    user: admin._id,
  }, {
    title: "Ariana Grande",
    information: null,
    image: "fixtures/XY8Ds7UoTnNzrpbp0qHk2.jpg",
    publish: true,
    user: admin._id,
  }, {
    title: "Whitney Houston",
    information: null,
    image: "fixtures/nF6kXzINnWYtAOZtQb_kr.jpeg",
    publish: true,
    user: admin._id,
  });
  
  const [Happier, dont, Everything, Whitney] = await Album.create({
    title: "Happier Than Ever",
    date: 2021,
    image: "fixtures/IXroHDbk9VGkfRKIVE1PT.jpg",
    artist: Eilish._id,
    publish: true,
    user: admin._id,
  }, {
    title: "dont smile at me",
    date: 2017,
    image: "fixtures/ab67616d0000b273a9f6c04ba168640b48aa5795.jpeg",
    artist: Eilish._id,
    publish: true,
    user: admin._id,
  }, {
    title: "My Everything",
    date: 2014,
    image: "fixtures/AQstSzeoqqMSFUyhGwHUw.jpeg",
    artist: Grande._id,
    publish: true,
    user: admin._id,
  }, {
    title: "Whitney",
    date: 1987,
    image: "fixtures/neYq-2nJTqsfOKivrp_QZ.jpg",
    artist: Houston._id,
    publish: true,
    user: admin._id,
  });
  
  const array = [
    {
      title: "Getting Older",
      album: Happier._id,
      duration: "04:04",
    }, {
      title: "I Didn't Change My Numbe",
      album: Happier._id,
      duration: "02:38",
    }, {
      title: "Billie Bossa Nova",
      album: Happier._id,
      duration: "03:16",
    }, {
      title: "My Future",
      album: Happier._id,
      duration: "03:30",
    }, {
      title: "Happier Than Ever",
      album: Happier._id,
      duration: "04:58",
    }, {
      album: dont._id,
      title: "Ocean Eyes",
      duration: "03:20",
    }, {
      title: 	"Hostage",
      album: dont._id,
      duration: "03:48",
    }, {
      title: 	"Bellyache",
      album: dont._id,
      duration: "03:00",
    }, {
      title: "Copycat",
      album: dont._id,
      duration: "03:13",
    }, {
      title: "My Boy",
      album: dont._id,
      duration: "02:50",
    },{
      title: "Intro",
      album: Everything._id,
      duration: "01:20",
    }, {
      title: 	"One Last Time",
      album: Everything._id,
      duration: "03:17",
    }, {
      title: "Why Try",
      album: Everything._id,
      duration: "03:31",
    }, {
      title: "My Everything",
      album: Everything._id,
      duration: "02:49",
    }, {
      title: 	"Break Free",
      album: Everything._id,
      duration: "03:34",
    },{
      title: "I wanna dance with somebody",
      album: Whitney._id,
      duration: "04:50",
    }, {
      title: "Love will save the day",
      album: Whitney._id,
      duration: "05:23",
    }, {
      title: "So emotional",
      album: Whitney._id,
      duration: "04:37",
    }, {
      title: "Love is a contact sport",
      album: Whitney._id,
      duration: "04:19",
    }, {
      title: "For the love of you",
      album: Whitney._id,
      duration: "04:12",
    }
  ];
  
  array.map(async (item, index) => {
    item.number = index + 1;
    item.publish = true;
    item.user = admin._id;
  });
  
  await Track.create(array);
  
  await mongoose.connection.close();
};

run().catch(console.error);