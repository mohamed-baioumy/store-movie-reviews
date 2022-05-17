import React from "react";
import { Link } from "react-router-dom";
import {useRef,useState } from 'react';
import image from "./1.jpg";

function Header(props){
    return(
      <header>
        <div id ="header">
        <h1>{props.name} Movies Reviews Website</h1>
        </div>
        <br></br>
        <br></br>
      </header>
    );
  }
  
  
  function Main(props){
    return(
      <main>
        <div id="head">
        <p>The Most {props.adjective} Movies Reviews Wepsite</p>
        </div>
        <img  className="logo" src={image} alt="site logo "/>  
      </main>
    
    );
  }
  
  
  function Footer(props){
    return(
      <footer>
        <p>CopyRight {props.year}</p>
      </footer>
    );
  }

export function Home1(){
    return(
        <div className="App">
       <Header name="MO"/>
       <div id="nav">
            <Link to="/">Home</Link>
        </div>
        <div id="nav2">
          <Link to = "reviews"> Add Movie</Link>
        </div>
          <Main adjective = "Amazing" />
        </div>

    );
}

 export function Form(){

  const addMovieDatabase = async (name, date, actors, poster, rating) => {
    let info = {
      "name": name,
      "date": date,
      "actors": actors,
      "poster": poster.name,
      "rating": rating
    };
  }
  
  var fs = require("fs");
  
  var data = fs.readFileSync("movies.json");
  var myObject = JSON.parse(data);
    
  myObject.push(info);
    
  var newData2 = JSON.stringify(myObject);
  fs.writeFile("data2.json", newData2, (err) => {
    if (err) throw err;
    console.log("New data added");}
    

  const formName = useRef();
  const formDate = useRef();
  const formActors = useRef();
  const formPoster = useRef();
  const formRating = useRef();
  const submit = e => {
    e.preventDefault();
    const name = formName.current.value;
    const date = formDate.current.value;
    const actors = formActors.current.value;
    const poster = formPoster.current.files[0];
    const rating = formRating.current.value;
    
    addMovieDatabase(name, date, actors.split(", "), poster, rating);
    formName.current.value = "";
    formDate.current.value = "";
    formActors.current.value = "";
    formPoster.current.value = "";
    formRating.current.value = "";
  };


  return(
        <div id="uplode">
            <h3> Add New Movie </h3>
            <form method="post" id ="form1" onSubmit={submit} >
            <div className="file">
              <input  type={"file"} name={"file"} accept={".jpg,.png,.jpeg"} ref={formPoster} required></input><br></br>
            </div>
        <div className="input">    
            <div className="name">
              <label for={"name"} >Movie Title</label>
              
              <input className="name1" type={"text"} ref={formName} required></input><br></br>
             
            </div>
            <div className="actor">
              <label for={"name"} >Actors Names</label>
              <input className="actor1" type={"text"} ref={formActors} required></input><br></br>
            </div>
            <div className="rate1">
              <label for={"rate"} >Rate</label>
              <select className="rate" ref={formRating} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              </select><br></br>

            </div>
            <div className="released">
              <label for={"rate"} >Released</label>
              <input className="released1" type={"date"} ref={formDate} required></input><br></br>
            </div>
        </div>    
            <input type={"submit"} value={"sumbit"}></input>
            </form>
        </div>
  
      );
}


export function Reviews(){
    return(
        <div>
            <div id="nav1">
                <Link to="/">Home</Link>
            </div>
            <Form/>
        </div>

    )
}

export default function Movie({
  Title,Poster,Released,Actors,Rating,
  onRemove = (f) => f,
}) { 
return (
    <div className="movie">
       <button className="delete"
          onClick={() => {  onRemove(Title);
          }}
        >
          Remove
        </button>
          <h2 style={{color:"blue"}}>Movie Name: {Title}</h2>
          <p>
            Actors :{Actors[0]} ,{Actors[1]} ,{Actors[2]} and {Actors[3]}
          </p>
          <p>Rating : {Rating}</p>
          <p> Released: {Released}</p>
          <img className="poster" src={"./images/" + Poster} alt={Title}
          width={600}
          height={500}
        />
        <p></p>
       
    </div>
    
  );
  
}
export function Home2({ movies = [], onRemoveMovie = (f) => f }){

    return(
      <>
      <Home1/>
      <div  className="display" >
        {movies.map((movie,key) =>(
          <Movie
          key={key}
          Title={movie.Title}
          Actors={movie.Actors}
          Poster={movie.Poster}
          Rating={movie.Rating}
          Released={movie.Released}
          onRemove={onRemoveMovie}
        ></Movie>
            
        ))}
      </div> 
      <div>
     <Footer year = {new Date().getFullYear()} />
     </div>
      </>

    );
  }