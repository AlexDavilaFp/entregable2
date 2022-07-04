import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'


function App() {

  const [apiWeather, setApiWeather] = useState({})
  const [temp, setTemp] = useState(0)
  const [isCelcius, setIsCelcius] = useState(true)

  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=753d6518321da15f1042402129974ab2`)
        .then(res => {
          setApiWeather(res.data)
          setTemp(Math.round(res.data.main.temp - 273.15))
        })
    }

    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const convertTemp = () => {
    if (isCelcius) {
      setTemp(Math.round((temp * (9 / 5)) + 32))
      setIsCelcius(false)
    } else {
      setTemp(Math.round((temp - 32) / (9 / 5)))
      setIsCelcius(true)
    }
  }

  console.log(apiWeather)

  return (
    <div className="App">
      <div className='card'>
        <div>
          <h2><b style={{ color: "purple" }} >Wheather App</b></h2>
        </div>
        <div>
          <b style={{ color: "purple" }}> {apiWeather.name} , {apiWeather.sys?.country}</b>
        </div>
        <div className='weather'>
          <div>
            <img src={`http://openweathermap.org/img/wn/${apiWeather.weather?.[0].icon}@2x.png`} alt="" />
          </div>
          <div>
            <ul>
              <li><b style={{ color: "purple" }}>"{apiWeather.weather?.[0].description}"</b></li>
              <li><b style={{ color: "purple" }}>Wind Speed:</b> {apiWeather.wind?.speed} m/s</li>
              <li><b style={{ color: "purple" }}>Coulds:</b> {apiWeather.clouds?.all} %</li>
              <li><b style={{ color: "purple" }}>Humidity:</b> {apiWeather.main?.humidity} %</li>
            </ul>
          </div>
        </div>
        <div style={{ padding: "0", marginLeft: "40px", textAlign: "left" }}>
          <b>{temp} {isCelcius ? "ºC" : "ºF"}</b>
        </div>
        <div>
          <button onClick={convertTemp} style={{ color: "white", background: "purple" }}><b>Degrees Fº/Cº</b></button>
        </div>
      </div>
    </div>
  )
}

export default App
