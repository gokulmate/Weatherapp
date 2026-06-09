import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import weatherIcon from "../assets/weatherIcon.PNG";
import axios from "axios";

const Weather = () => {

  const [Search,setSearch]= useState ("");
  const [loading,setLoading] = useState (false);
  const[Temprature,setTemprature] = useState(null)
const[Humidity,setHumidity] = useState(null)
const[windSpeed,setWindSpeed] = useState(null)
const[cityName,setCityName] =useState("")
const[weatherIcon,setWeatherIcon] = useState("01d")

const API_KEY = "3930c3b45512907db9c951cfbfb1e3dd";

const fetchWeather = async () => {
  if (!Search) return;
  setLoading(true);
  try{
const { data } = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${Search}&units=metric&appid=${API_KEY}`
);
console.log(data);
if(data.cod===200){
  setTemprature(data.main.temp);
  setHumidity(data.main.humidity) ;
  setWindSpeed(data.wind.speed);
  setCityName(data.name);
setWeatherIcon(data.weather[0].icon);
}
 }
  catch(error){
    console.log(error);
    setCityName("city not found");
    setTemprature(null);
    setHumidity(null);
    setWindSpeed(null);
    setWeatherIcon("01d");
  }
  setLoading(false);
};

  return (
    <>

      <div className="flex flex-col items-center justify-start pt-10 h-screen bg-linear-to-br from-green-950 to-black text-white">
       <div className="flex item-center bg-white rounded-full px-4 py-2 mb-6 w-full max-w-xs  shadow-lg">
        <input type="text" placeholder="Search"
        value={Search}
        onChange={(e) =>setSearch(e.target.value)}
        onKeyDown={(e)=> e.key === "Enter" && fetchWeather()}
        className="flex-1 text-black outline-none px-2" />
        <FaSearch  onClick={fetchWeather}className="text-gray-600 cursor-pointer" />
     </div>
      {/*image icon*/}
      <div>
         <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} // weathericon image 
            alt="weather"
          />
      </div>
      {/*Temprature & cityname*/}
      <h1 className="text-5xl font-bold">{loading?"loading...":Temprature!==null?`${Temprature}°C`:"__"}</h1>
      <h2 className="text-3xl font-semibold">{cityName || "type to check temprature "}</h2>
      {/* Humadity & wind speed */}
      <div className="w-full max-w-md mt-8 flex flex-row items-center justify-around md:items start px-4">
        <div className="flex flex-col items-center gap-1">
          <WiHumidity className="text-3xl"/>
          <span className="text-lg font-medium">{Humidity!==null?`${Humidity}%`:"__"}</span>

          <p className="text-sm">Humidity</p>      
        </div>
          <div className="flex flex-col items-center">
            <WiStrongWind className="text-3xl"/>
            <span className="text-lg font-medium">{windSpeed!==null?`${windSpeed}km/h`:"__"}</span>
            <p className="text-sm">Wind Speed</p>
        </div>
      </div>
       </div>
    </>
  );
};

export default Weather;
