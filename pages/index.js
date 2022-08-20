import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { GrSearch } from "react-icons/gr";
import BgJpg from "../public/bg.jpg";
import Weather from "../components/Weather";
import Spinner from "../components/Spinner";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      // console.log(response.data);
    });
    setCity("");
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Head>
          <title>Luth Weather</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/cloud.ico" />
        </Head>
        {/* Overlay */}
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-white/40 z-[1]" />
        {/* Background Image */}
        <Image src={BgJpg} alt="Weather Jpg" layout="fill" className="object-cover" />
        {/* Search */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-black z-10">
          <form onSubmit={fetchWeather} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-black text-black rounded-2xl">
            <div>
              <input onChange={(e) => setCity(e.target.value)} className="bg-transparent border-none text-black focus:outline-none text-2xl placeholder:text-black " type="search" placeholder="Search your city" />
            </div>
            <button onClick={fetchWeather} className="text-white">
              <GrSearch size={20} />
            </button>
          </form>
        </div>
        {/* Weather */}
        {weather.main && <Weather data={weather} />}
      </>
    );
  }
}
