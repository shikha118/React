import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';

function App() {

  return (
    <div className="App">
       {/* <SearchInput onSearch={handleSearch} /> */}
      {/* <CityName cityName={selectedCity} /> */}
      {/* <CityInfo cityName={selectedCity} /> */}
      {/* <WeatherData weather={weatherData} /> 
      <TabSwitcher />
      <DataDisplay cityName={selectedCity} /> */}

      {/* <h1>City Information: {displayedCity.name}</h1>
      <img src={displayedCity.backgroundUrl} alt={`Background of ${displayedCity.name}`} />
      <SearchInput onSearch={handleSearch} />
      <CityName cityName={selectedCity} />
      <CityInfo city={displayedCity} />
      The rest of your components go here */}
      <MainComponent/>
    </div>
  );
}

export default App;
