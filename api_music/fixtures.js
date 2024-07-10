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
  const userArray = [
    {
      email: 'admin@gmail.com',
      password: 'admin',
      role: 'admin',
      token: nanoid(),
      displayName: 'Admin',
      avatarImage: 'https://img.icons8.com/color/480/avatar.png',
    }, {
      email: 'tom@gmail.com',
      password: 'tom',
      role: 'user',
      token: nanoid(),
      displayName: 'Tom',
      avatarImage: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
    }
  ];
  const [admin, tom] = await User.create(userArray);
  
  const artistsArray = [
    {
      title: "Olivia Singer",
      information: null,
      image: "fixtures/photos/singers/s1.jpg",
      publish: true,
      user: admin._id,
    }, {
      title: "Amelia Singer",
      information: null,
      image: "fixtures/photos/singers/s2.jpg",
      publish: true,
      user: admin._id,
    }, {
      title: "Oliver Singer",
      information: null,
      image: "fixtures/photos/singers/s3.jpg",
      publish: true,
      user: admin._id,
    }, {
      title: "Emma Singer",
      information: null,
      image: "fixtures/photos/singers/s4.jpg",
      publish: true,
      user: admin._id,
    }, {
      title: "Sophia Singer",
      information: null,
      image: "fixtures/photos/singers/s5.jpg",
      publish: false,
      user: admin._id,
    }, {
      title: "Charlotte Singer",
      information: null,
      image: "fixtures/photos/singers/s6.jpg",
      publish: true,
      user: tom._id,
    }, {
      title: "Isabella Singer",
      information: null,
      image: "fixtures/photos/singers/s7.jpg",
      publish: false,
      user: tom._id,
    }, {
      title: "Ava Singer",
      information: null,
      image: "fixtures/photos/singers/s8.jpg",
      publish: false,
      user: tom._id,
    }, {
      title: "Leo Singer",
      information: null,
      image: "fixtures/photos/singers/s9.jpg",
      publish: true,
      user: tom._id,
    }
  ];
  const [Olivia, Amelia, Oliver, Emma, Sophia, Charlotte, Isabella, Ava, Leo] = await Artist.create(artistsArray);
  
  const albumsArray = [
    {
      title: "Mandarinfish Album",
      date: 2021,
      image: "fixtures/photos/albums/a1.jpg",
      artist: Olivia._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Axolotl Album",
      date: 2017,
      image: "fixtures/photos/albums/a2.jpg",
      artist: Olivia._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Snow leopard Album",
      date: 2014,
      image: "fixtures/photos/albums/a3.jpg",
      artist: Olivia._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Dolphin Album",
      date: 1987,
      image: "fixtures/photos/albums/a4.jpg",
      artist: Olivia._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Blue and Gold Macaw Album",
      date: 2021,
      image: "fixtures/photos/albums/a5.jpg",
      artist: Olivia._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Black-backed Kingfisher Album",
      date: 2017,
      image: "fixtures/photos/albums/a6.jpg",
      artist: Amelia._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Blue Glaucus Album",
      date: 2014,
      image: "fixtures/photos/albums/a7.jpg",
      artist: Amelia._id,
      publish: true,
      user: admin._id,
    }, {
      title: "California Red-sided Garter Snake Album",
      date: 1987,
      image: "fixtures/photos/albums/a8.jpg",
      artist: Amelia._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Candy Crab Album",
      date: 2021,
      image: "fixtures/photos/albums/a9.jpg",
      artist: Oliver._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Clouded Leopard Album",
      date: 2017,
      image: "fixtures/photos/albums/a10.jpg",
      artist: Oliver._id,
      publish: true,
      user: admin._id,
    }, {
      title: "Costa’s Hummingbird Album",
      date: 2014,
      image: "fixtures/photos/albums/a11.jpg",
      artist: Emma._id,
      publish: true,
      user: tom._id,
    }, {
      title: "Fire Salamander Album",
      date: 1987,
      image: "fixtures/photos/albums/a12.jpg",
      artist: Emma._id,
      publish: false,
      user: tom._id,
    }, {
      title: "Fleischmann’s Glass Frog Album",
      date: 2021,
      image: "fixtures/photos/albums/a13.jpg",
      artist: Sophia._id,
      publish: true,
      user: tom._id,
    }, {
      title: "Friesian Horse Album",
      date: 2017,
      image: "fixtures/photos/albums/a14.jpg",
      artist: Sophia._id,
      publish: true,
      user: tom._id,
    }, {
      title: "Giant Panda Album",
      date: 2014,
      image: "fixtures/photos/albums/a15.jpg",
      artist: Charlotte._id,
      publish: false,
      user: tom._id,
    }, {
      title: "Loch’s Chromodoris Album",
      date: 1987,
      image: "fixtures/photos/albums/a16.jpg",
      artist: Charlotte._id,
      publish: true,
      user: tom._id,
    }, {
      title: "Lilac-breasted Roller Album",
      date: 2021,
      image: "fixtures/photos/albums/a17.jpg",
      artist: Isabella._id,
      publish: true,
      user: tom._id,
    }, {
      title: "Leafy Sea Dragon Album",
      date: 2017,
      image: "fixtures/photos/albums/a18.jpg",
      artist: Isabella._id,
      publish: true,
      user: tom._id,
    }, {
      title: "Green-headed Tanager Album",
      date: 2014,
      image: "fixtures/photos/albums/a19.jpg",
      artist: Leo._id,
      publish: true,
      user: tom._id,
    }, {
      title: "Glasswinged Butterfly Album",
      date: 1987,
      image: "fixtures/photos/albums/a20.jpg",
      artist: Leo._id,
      publish: true,
      user: tom._id,
    }
  ];
  
  const [Mandarinfish, Axolotl, Snow, Dolphin, Blue, Black, Blue_Glaucus, California, Candy, Clouded, Costa, Fire, Fleischmann, Friesian, Giant] = await Album.create(albumsArray);

  const array = [
    {
      title: "Music 1",
      album: Mandarinfish._id,
      mp3: "fixtures/musics/m2.mp3"
    }, {
      title: "Music 2",
      album: Mandarinfish._id,
      mp3: "fixtures/musics/m3.mp3"
    }, {
      title: "Music 3",
      album: Mandarinfish._id,
      mp3: "fixtures/musics/m4.mp3"
    }, {
      title: "Music 4",
      album: Mandarinfish._id,
      mp3: "fixtures/musics/m5.mp3"
    }, {
      title: "Music 5",
      album: Axolotl._id,
      mp3: "fixtures/musics/m6.mp3"
    }, {
      album: Axolotl._id,
      title: "Music 6",
      mp3: "fixtures/musics/m7.mp3"
    }, {
      title: 	"Music 7",
      album: Snow._id,
      mp3: "fixtures/musics/m8.mp3"
    }, {
      title: 	"Music 8",
      album: Snow._id,
      mp3: "fixtures/musics/m9.mp3"
    }, {
      title: "Music 9",
      album: Dolphin._id,
      mp3: "fixtures/musics/m10.mp3"
    }, {
      title: "Music 10",
      album: Dolphin._id,
      mp3: "fixtures/musics/m1.mp3",
    },{
      title: "Music 11",
      album: Dolphin._id,
      mp3: "fixtures/musics/m2.mp3"
    }, {
      title: 	"Music 12",
      album: Blue._id,
      mp3: "fixtures/musics/m3.mp3"
    }, {
      title: "Music 13",
      album: Blue._id,
      mp3: "fixtures/musics/m4.mp3"
    }, {
      title: "Music 14",
      album: Blue._id,
      mp3: "fixtures/musics/m5.mp3"
    }, {
      title: 	"Music 15",
      album: Blue._id,
      mp3: "fixtures/musics/m6.mp3"
    },{
      title: "Music 16",
      album: Blue._id,
      mp3: "fixtures/musics/m7.mp3"
    }, {
      title: "Music 17",
      album: Black._id,
      mp3: "fixtures/musics/m8.mp3"
    }, {
      title: "Music 18",
      album: Black._id,
      mp3: "fixtures/musics/m9.mp3"
    }, {
      title: "Music 19",
      album: Giant._id,
      mp3: "fixtures/musics/m10.mp3"
    }, {
      title: "Music 20",
      album: Giant._id,
      mp3: "fixtures/musics/m1.mp3"
    },{
      title: "Music 21",
      album: Giant._id,
      mp3: "fixtures/musics/m2.mp3"
    }, {
      title: 	"Music 22",
      album: Friesian._id,
      mp3: "fixtures/musics/m3.mp3"
    }, {
      title: "Music 23",
      album: Fire._id,
      mp3: "fixtures/musics/m4.mp3"
    }, {
      title: "Music 24",
      album: Fire._id,
      mp3: "fixtures/musics/m5.mp3"
    }, {
      title: 	"Music 25",
      album: Fire._id,
      mp3: "fixtures/musics/m6.mp3"
    },{
      title: "Music 26",
      album: Fire._id,
      mp3: "fixtures/musics/m7.mp3"
    }, {
      title: "Music 27",
      album: Costa._id,
      mp3: "fixtures/musics/m8.mp3"
    }, {
      title: "Music 28",
      album: Costa._id,
      mp3: "fixtures/musics/m9.mp3"
    }, {
      title: "Music 29",
      album: Clouded._id,
      mp3: "fixtures/musics/m10.mp3"
    }, {
      title: "Music 30",
      album: Clouded._id,
      mp3: "fixtures/musics/m1.mp3"
    }
  ];

  array.map(async (item, index) => {
    item.number = index + 1;
    item.publish = true;
    if (index < 17) {
      item.user = tom._id;
    } else {
      item.user = admin._id;
    }
  });

  await Track.create(array);
  
  await mongoose.connection.close();
};

run().catch(console.error);