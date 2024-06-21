import React, {useState} from 'react';
import {artistsApi} from "./store/api/artistApi";
import Layout from "./components/UI/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";
import ArtistAlbums from "./containers/ArtistAlbums";
import AlbumTracks from "./containers/AlbumTracks";
import SighUp from "./containers/SignUP";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Artists/>}/>
          <Route path='/albums' element={<Albums/>}/>
          <Route path='/albums/:id' element={<ArtistAlbums/>}/>
          <Route path='/tracks/:id' element={<AlbumTracks/>}/>
          <Route path='/register' element={<SighUp/>}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;