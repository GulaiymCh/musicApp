import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";
import ArtistAlbums from "./containers/ArtistAlbums";
import AlbumTracks from "./containers/AlbumTracks";
import Register from "./containers/User/Register";
import Login from "./containers/User/Login";
import NewArtist from "./containers/NewElements/NewArtist";
import NewAlbum from "./containers/NewElements/NewAlbum";
import NewTrack from "./containers/NewElements/NewTrack";
import Tracks from "./containers/Tracks";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UnpublishedArtistsList from "./containers/Unpublished/UnpublishedArtistsList";
import UnpublishedAlbumsList from "./containers/Unpublished/UnpublishedAlbumsList";
import UnpublishedTracksList from "./containers/Unpublished/UnpublishedTracksList";
import TracksHistory from "./containers/TracksHistory";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Artists/>}/>
          <Route path='/albums' element={<Albums/>}/>
          <Route path='/tracks' element={<Tracks/>}/>
          <Route path='/trackHistory' element={<TracksHistory/>}/>

          <Route path='/albums/:id' element={<ArtistAlbums/>}/>
          <Route path='/tracks/:id' element={<AlbumTracks/>}/>

          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route path='/newArtist'  element={<NewArtist/>}/>
          <Route path='/newAlbum'  element={<NewAlbum/>}/>
          <Route path='/newTrack'  element={<NewTrack/>}/>

          <Route path='/unpublishedArtists'  element={<UnpublishedArtistsList/>}/>
          <Route path='/unpublishedAlbums'  element={<UnpublishedAlbumsList/>}/>
          <Route path='/unpublishedTracks'  element={<UnpublishedTracksList/>}/>

          <Route path='*' element={<ErrorPage/>}/>
          <Route path='/errorPage' element={<ErrorPage/>}/>
        </Routes>
      </Layout>
      <ToastContainer position='bottom-right' theme='dark'/>
    </>
  );
};

export default App;