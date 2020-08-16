var bodyParser = require('body-parser');
const fetch = require("node-fetch");
const NodeCache = require( "node-cache" );
var utils = require('../utils/Utils');
var assert = require('assert');
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 } );

let getPeliculasByTitleAndYear= (req,res) =>
{
    console.log("Buscando pelicula por titulo y anio");
    const keyTitleYear = req.query.title+req.query.year;
    console.log('Valor de la key: ', keyTitleYear);
    value = myCache.get(keyTitleYear);
    console.log('Valor de la key:',value);
    if ( value == undefined ){
        console.log("No esta guarda la key");
        const url = utils.getUrlByKey()+`&t=${req.query.title}&y=${req.query.year}`;
        success = myCache.set( keyTitleYear, url, 10000 );
        console.log("Guarda con exito: ",success);
    }
    const endpoint =  myCache.get(keyTitleYear);
    console.log('Valor de la url del cache:',endpoint);
    value = myCache.get(endpoint);
    console.log('Variable enpoint esta definida?: ',value);
    if ( value == undefined ){
        console.log("No esta guarda la json del endpoint", endpoint);
        fetch(endpoint)
        .then (
            (response) => {
                console.log("Entre a consultar al enpoint.");
                return response.json();
            }).then (responseData => {
                console.log("Parsear Json to object");
                const {Title,Genre,Actors,Language,Poster,imdbRating,imdbID,Website,Runtime,Year,Plot,Type}= responseData;
                console.log("Mapeo json");
                const newData = {title:Title, genre:Genre,actors:Actors, language: Language, 
                    poster: Poster,rating:imdbRating,movieId:imdbID,website:Website,
                runtime:Runtime,year:Year,synapsi:Plot,typeMovie:Type};
                myCache.set(endpoint,newData,1000);
                console.log ("Valor del json en cache: ",myCache.get(endpoint));
                res.status(200).send(newData);   
        }).catch((error) => {
            assert.ok('Promise error',error);
            console.log(error);
            res.status(409).send({ msg: "Error:." + error});
          });
        }else{
            console.log ("Valor del json que estaba cache: ",myCache.get(endpoint));
            res.status(200).send(myCache.get(endpoint));
        }
}

let getPeliculasByTitle= (req,res) =>
{ 
    console.log('Buscando pelicula por titulo:  %s ',req.query.title);
    const keyTitle = req.query.title;
    console.log('Valor de la key: ', keyTitle);
    value = myCache.get(keyTitle);
    console.log('Valor de la key:',value);
    if ( value == undefined ){
        console.log("No esta guarda la key");
        const url = utils.getUrlByKey()+`&t=${keyTitle}`;
        success = myCache.set( keyTitle, url, 10000 );
        console.log("Guarda con exito: ",success);
    }
    const endpoint =  myCache.get(keyTitle);
    console.log('Valor de la url del cache:',endpoint);
    value = myCache.get(endpoint);
    console.log('Variable enpoint esta definida?: ',value);
    if(value == undefined){
        fetch(endpoint)
        .then (
            (response) => {
                console.log("Entre a consultar al enpoint.");
                return response.json();
            }).then (responseData => {
                console.log('Parsear Json to object: ',responseData );
                const {Title,Genre,Actors,Language,Poster,imdbRating,imdbID,Website,Runtime,Year,Plot,Type}= responseData;
                const newData = {title:Title, genre:Genre,actors:Actors, language: Language, 
                    poster: Poster,rating:imdbRating,movieId:imdbID,website:Website,
                runtime:Runtime,year:Year,synapsi:Plot,typeMovie:Type};
                myCache.set(endpoint,newData,1000);
                console.log ("Valor del json en cache: ",myCache.get(endpoint));
                res.status(200).send(newData);   
            }).catch((error) => {
                assert.ok('Error console',error);
                console.log('Error console',error);
                res.status(409).send({ msg: "Error:." + error});
             });
    }else{
        console.log ("Valor del json que estaba cache: ",myCache.get(endpoint));
        res.status(200).send(myCache.get(endpoint));
    }
}

let getPeliculasAndSeriesById= (req,res) =>
{
   
    console.log('Buscando pelicula y series por id:',req.query.movieId)
    const keymovieId = req.query.movieId;
    console.log('Valor de la key: ', keymovieId);
    value = myCache.get(keymovieId);
    console.log('Valor de la key:',value);
    if ( value == undefined ){
        console.log("No esta guarda la key");
        const url = utils.getUrlByKey()+`&i=${keymovieId}`;
        success = myCache.set( keymovieId, url, 10000 );
        console.log("Guarda con exito: ",success);
    }
    const endpoint =  myCache.get(keymovieId);
    console.log('Valor de la url del cache:',endpoint);
    value = myCache.get(endpoint);
    console.log('Variable enpoint esta definida?: ',value);
    if(value == undefined){
        fetch(endpoint)
        .then (
            (response) => {
                console.log("Entre a consultar al enpoint.");
                return response.json();
            }).then (responseData => {
                console.log("Parsear Json to object");
                const {Title,Genre,Actors,Language,Poster,imdbRating,imdbID,Website,Runtime,Year,Plot,Type}= responseData;
                const newData = {title:Title, genre:Genre,actors:Actors, language: Language, 
                    poster: Poster,rating:imdbRating,movieId:imdbID,website:Website,
                runtime:Runtime,year:Year,synapsi:Plot,typeMovie:Type};
                myCache.set(endpoint,newData,1000);
                console.log ("Valor del json en cache: ",myCache.get(endpoint));
                res.status(200).send(newData);   
            }).catch((error) => {
                assert.ok('Promise error',error);
                console.log(error);
                res.status(409).send({ msg: "Error:." + error});
              });
    }else{
        console.log ("Valor del json que estaba cache: ",myCache.get(endpoint));
        res.status(200).send(myCache.get(endpoint));
    }
}



let getPeliculasByKey= (req,res) =>
{  
    console.log('Buscando pelicula por key:  %s ',req.query.key);
    const keymovieId = req.query.key;
    console.log('Valor de la key: ', keymovieId);
    value = myCache.get(keymovieId);
    console.log('Valor de la key:',value);
    if ( value == undefined ){
        console.log("No esta guarda la key");
        const url = utils.getUrlByKey()+`&type=movie&s=${keymovieId}`;
        success = myCache.set( keymovieId, url, 10000 );
        console.log("Guarda con exito: ",success);
    }
    const endpoint =  myCache.get(keymovieId);
    console.log('Valor de la url del cache:',endpoint);
    value = myCache.get(endpoint);
    console.log('Variable enpoint esta definida?: ',value);
    if(value == undefined){
        fetch(endpoint)
        .then (
            (response) => {
                console.log("Entre a consultar al enpoint.");
                return response.json();
            }).then (responseData => {
                var arrayMovie = [];
                console.log('Response por key.',responseData.Response);
                if(responseData.Response == 'False'){
                    console.log("Cantidad de peliculas no hay.");
                    myCache.set(endpoint,arrayMovie,1000);
                    res.status(206).send(arrayMovie);         
                }else{
                    console.log("Parsear Json to object.");
                    for (var i = 0, len = responseData.Search.length; i < len; i++) {
                        const newData = {Title: responseData.Search[i].Title, Year: responseData.Search[i].Year,imdbID: responseData.Search[i].imdbID, Type: responseData.Search[i].Type, Poster: responseData.Search[i].Poster};
                        arrayMovie.push(newData);
                      }     
                    myCache.set(endpoint,arrayMovie,1000);
                    console.log ("Valor del json en cache: ",myCache.get(endpoint));       
                    res.status(200).send(arrayMovie); //devuelvo resultado query  
                }
        }).catch((error) => {
            assert.ok('Promise error',error);
            console.log(error);
            res.status(409).send({ msg: "Error:." + error});
          });    
    }else{
        console.log ("Valor del json que estaba cache: ",myCache.get(endpoint));
        res.status(200).send(myCache.get(endpoint));
    }
}

let getSeriesByKey= (req,res) =>
{ 
    console.log('Buscando series por key:  %s ',req.query.key);
    const keyserieId = req.query.key;
    console.log('Valor de la key: ', keyserieId);
    const keyCache = keyserieId+'series';
    console.log('Valor de la key series:',keyCache)
    value = myCache.get(keyCache);
    console.log('Valor de la key:',value)
    if ( value == undefined ){
        console.log("No esta guarda la key");
        const url = utils.getUrlByKey()+`&type=series&s=${keyserieId}`;
        success = myCache.set( keyCache, url, 10000 );
        console.log("Guarda con exito: ",success);
    }
    const endpoint =  myCache.get(keyCache);
    console.log('Valor de la url del cache:',endpoint);
    value = myCache.get(endpoint);
    console.log('Variable enpoint esta definida?: ',value);
    if(value == undefined){
        fetch(endpoint)
        .then (
            (response) => {
                console.log("Entre a consultar al enpoint.");
                return response.json();
            }).then (responseData => {
                console.log("Parsear Json to object.");
                console.log('Response por key.',responseData.Response);
                var arraySeries = [];
                if(responseData.Response == 'False'){
                    console.log("Cantidad de series no hay.");  
                    myCache.set(endpoint,arraySeries,1000);
                    res.status(206).send(arraySeries);         
                }else{
                    console.log("Cantidad de series por key.",responseData.Search.length);           
                    for (var i = 0, len = responseData.Search.length; i < len; i++) {
                        const newData = {Title: responseData.Search[i].Title, Year: responseData.Search[i].Year,imdbID: responseData.Search[i].imdbID, Type: responseData.Search[i].Type, Poster: responseData.Search[i].Poster};
                        arraySeries.push(newData);
                    }
                    myCache.set(endpoint,arraySeries,1000);
                    console.log ("Valor del json en cache: ",myCache.get(endpoint));       
                    res.status(200).send(arraySeries);
                }
            }).catch((error) => {
                assert.ok('Error console',error);
                console.log('Error console',error);
                res.status(409).send({ msg: "Error:." + error});
              });
    }else{
        console.log ("Valor del json que estaba cache: ",myCache.get(endpoint));
        res.status(200).send(myCache.get(endpoint));
    }
}


module.exports = {getPeliculasByTitle,getPeliculasByTitleAndYear,getPeliculasByKey,getPeliculasAndSeriesById,getSeriesByKey};