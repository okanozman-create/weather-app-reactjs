import { useEffect, useState } from "react";
import IMAGES from "./images";
import toDateFunction from "./toDateFunction";
// import configs from "./config.json";





// import "./App.css";
// import { Amplify } from 'aws-amplify';
// import { generateClient } from 'aws-amplify/api';

// import { API } from "aws-amplify";
// import "@aws-amplify/ui-react/styles.css";
// import {
//   withAuthenticator,
//   Button,
//   Flex,
//    Heading,
//   // Image,
//   Text,
//   TextField,
//   View,
//   Card,
// } from "@aws-amplify/ui-react";

// import { listNotes } from "./graphql/queries";
// import {
//   createNote as createNoteMutation,
//   deleteNote as deleteNoteMutation,
// } from "./graphql/mutations";

// import config from './amplifyconfiguration.json';
// Amplify.configure(config);
// const client = generateClient();

import {
  // Card,
  // Button,
  // Flex,
  // Heading,
  // Text,
  // TextField,
  // View,
  // WithAuthenticatorProps,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import "./style.css";




// import "@aws-amplify/ui-react/styles.css";
// import { listNotes } from "../src/graphql/queries";
// import {
//   createNote as createNoteMutation,
//   deleteNote as deleteNoteMutation,
// } from "../src/graphql/mutations";





// import { CreateNoteInput, Note } from "@/src/API";
  // import { API, Storage } from 'aws-amplify';
  // import { Storage } from 'aws-amplify';
// import API from '@aws-amplify/api'
// import Storage from '@aws-amplify/storage'


import { Amplify } from "aws-amplify";
// import { generateClient } from "aws-amplify/api";
// import awsconfig from "@/src/amplifyconfiguration.json";
// Amplify.configure(awsconfig);
import config from './amplifyconfiguration.json';
Amplify.configure(config);


// const storage = Amplify.Storage;

// const client = generateClient();
const apiKey = process.env.REACT_APP_API_KEY
// const apiKey = configs.apiKey;

const App = ({signOut}) =>{

//  function App({signOut}) {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [containerRes, setConatinerRes] = useState([]);

  // const [notes, setNotes] = useState([]);

 
  // useEffect(() => {
  //   fetchNotes();
  // }, []);
  
  // async function fetchNotes() {
  //   const apiData = await client.graphql({ query: listNotes });
  //   const notesFromAPI = apiData.data.listNotes.items;
  //   await Promise.all(
  //     notesFromAPI.map(async (note) => {
  //       if (note.image) {
  //         const url = await storage.get(note.name);
  //         note.image = url;
  //       }
  //       return note;
  //     })
  //   );
  //   setNotes(notesFromAPI);
  // }
  



  // async function createNote(event) {
  //   event.preventDefault();
  //   const form = new FormData(event.target);
  //   const image = form.get("image");
  //   const data = {
  //     name: form.get("name"),
  //     description: form.get("description"),
  //     image: image.name,
  //   };
  //   if (!!data.image) await storage.put(data.name, image);
  //   await client.graphql({
  //     query: createNoteMutation,
  //     variables: { input: data },
  //   });
  //   fetchNotes();
  //   event.target.reset();
  // }
  






  


  // async function deleteNote({ id }) {
  //   const newNotes = notes.filter((note) => note.id !== id);
  
  //   setNotes(newNotes);
  
  //   await client.graphql({
  //     query: deleteNoteMutation,
  //     variables: { input: { id } },
  //   });
  // }






  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (containerRes.find((el) => el.url === res.url)) return;
      if (!containerRes.find((el) => el.url === res.url))
        setConatinerRes((prevContainer) => {
          const newContainerRes = [res, ...prevContainer];
          if (newContainerRes.length > 10) {
            newContainerRes.pop();
          }

          return newContainerRes;
        });

      if (res.status === 404) throw new Error("City not found");
      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
    

      setError("");
      setWeatherData(data);
    } catch (error) {
      // console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }



  function handleSearchClick() {
    fetchData();
    setCity("");
  }


 return (
    <div className="App">


{/* 
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">



        <View
  name="image"
  as="input"
  type="file"
  style={{ alignSelf: "end" }}
/>



          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>

 */}





      <div className="container">
        <Search
          city={city}
          setCity={setCity}
          onSearchClick={handleSearchClick}
          fetchData={fetchData}
        />
        {isLoading && <Loader />}

        {!isLoading && !error && (
          <>
            <Main weatherData={weatherData} />
            <Footer weatherData={weatherData} />
          </>
        )}
        {error && <ErrorMessage message={error} />}
        </div>
      </div>
  
  );
}

export default withAuthenticator(App)




function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Search({ city, setCity, onSearchClick,fetchData }) {

  useEffect(() => {
    const handleKeyPress = async function (e) {
      if (e.key === 'Enter') {
        await fetchData(); // Wait for fetchData to complete
        setCity('');
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [fetchData, setCity]);



  return (
    <div className="search-box">
      <input
        type="text"
        className="input-field"
        placeholder="Enter City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <img
        className="search-logo"
        src={IMAGES.search}
        alt="search-logo"
        onClick={onSearchClick}
      />
    </div>
  );
}

function Main({ weatherData }) {
  const temp = Math.round(weatherData?.main?.temp || null);

  const condition =
    Object.keys(weatherData).length !== 0 ? weatherData.weather[0]?.main : null;
  function checkWeather(condition) {
    if (condition === "Rain") return IMAGES.rain;
    if (condition === "Snow") return IMAGES.snow;
    if (condition === "Clouds") return IMAGES.cloud;
    if (condition === "Clear") return IMAGES.clear;
    if (condition === "Mist") return IMAGES.haze;
    if (condition === "Haze") return IMAGES.haze;
    else {
      return "";
    }
  }

  return (
    <div className="weather-details">
      <h1>{weatherData.name}</h1>
      <h3>{toDateFunction()}</h3>
      <div className="new-flex">
        {Object.keys(weatherData).length !== 0 && (
          <div className="main-img">
            <img src={checkWeather(condition)} alt="conditional-weather" />
          </div>
        )}
        <div className="new-flex-2">
          {Object.keys(weatherData).length !== 0 && (
            <>
              <p>{temp} °C</p>
              <p style={{ color: "#94d82d" }}>{weatherData.weather[0].main}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Footer({ weatherData }) {
  return (
    <div className="footer">
      {Object.keys(weatherData).length !== 0 && (
        <>
          <div className="humidity">
            <img src={IMAGES.humidity} alt="humidity-logo" />
            <p>Humidity: {weatherData.main?.humidity} %</p>
          </div>

          <div className="wind">
            <img src={IMAGES.wind} alt="wind-logo" />
            <p>Wind: {weatherData.wind?.speed} km/s</p>
          </div>
        </>
      )}
    </div>
  );
}
