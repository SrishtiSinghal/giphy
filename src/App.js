import React, { useState, useEffect } from "react";
import "./App.css";

const Giphy_api_key = "sFulW8b5Fb2gH06SnuUMs0HccAOlbXuG";
let currentText = "";

function App() {
  const [imageURLs, setImageURLs] = useState([]);
  const [searchText, setSearchText] = useState("");

  /*
  useEffect(function() {
    getGiphyURL(setImageURL);
  }, []);
*/
  return (
    <div className="container">
      <h3> Search Gifs </h3>
      <form>
        <input
          type="text"
          value={searchText}
          onChange={function(event) {
            const text = event.target.value;

            currentText = text;
            setSearchText(text);
            getGiphyURL(text, setImageURLs);
          }}
          placeholder="Start typing here"
        />
      </form>
      {imageURLs.map(arrayElement => (
        <img src={arrayElement} />
      ))}
    </div>
  );
}

async function getGiphyURL(searchText, setImageURLs) {
  if (searchText === "") {
    setImageURLs([]);
    return;
  }
  const url =
    "https://api.giphy.com/v1/gifs/search?&limit=10&q=" +
    searchText +
    "&api_key=" +
    Giphy_api_key;
  const response = await fetch(url);
  const parsedResponse = await response.json();
  console.log(parsedResponse);

  const data = parsedResponse.data;

  if (searchText != currentText) {
    //to deal with the delay caused by async call
    return;
  }
  const urls = data.map(function(arrayElement) {
    return arrayElement.images.original.url;
  });
  setImageURLs(urls);
}

export default App;
