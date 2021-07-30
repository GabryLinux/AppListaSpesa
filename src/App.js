import React, { useEffect } from 'react';
import MainPage from './Component/MainPage';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import ListaProdotti from './Component/ListaProdotti';
import firebase from 'firebase';
import PageProdotti from './Component/PageProdotti';
import PageSpesa from './Component/PageListaSpesa/PageSpesa';
import PageCreaLista from './Component/PageCreaLista';

function App() {
  const actualHeight = window.innerHeight;
  const elementHeight = document.getElementById('control-height').clientHeight;
  const barHeight = elementHeight - actualHeight;
  var firebaseConfig = {
    apiKey: "AIzaSyA4Kcxyo_Bn4G65lyzpQ2Lhp2RwD7kfRZk",
    authDomain: "listaspesa-a7db9.firebaseapp.com",
    projectId: "listaspesa-a7db9",
    storageBucket: "listaspesa-a7db9.appspot.com",
    messagingSenderId: "120437686839",
    appId: "1:120437686839:web:190ed754d668aef88735b2"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
  useEffect(()=>{
    var bodi = document.getElementById('bodi')
    var html = document.getElementById('html')
    //bodi.style.height =  'fill-available'
    //html.style.height =  'fill-available'
    console.log(barHeight)
  })
  return (
    <div className=" w-full h-full" >
      <Router>
        <MainPage>
            <Route component={PageProdotti} exact path="/lista/Prodotti"/>
            <Route component={PageSpesa} exact path="/lista/Spesa"/>
            <Route component={PageCreaLista} exact path="/lista/CreaLista"/>
        </MainPage>
      </Router>
    </div>
  );
}

export default App;
