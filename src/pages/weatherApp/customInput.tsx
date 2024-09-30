import { useState } from 'react';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Search...');

  const handleSearchMouseEnter = () => {
    setPlaceholder('Search a location, i.e. London,');
    setValue(value);
  };

  const handleSearchMouseLeave = () => {
    console.log('123');
    setPlaceholder('');
    setValue('');
  };

  const handleSearchBar = async (event) => {
    if (event.key === 'Enter') {
      const value = event.target.value;
      const containsSymbols = /[^a-zA-Z0-9\s,]/.test(value); // Only allows letters, numbers, and spaces
      if (value.length < 3 || value.length > 25) {
        setSearchError('Input must be between 5 and 25 characters long.');
      } else if (containsSymbols) {
        setSearchError('Input must not contain symbols - other than comma.');
      } else {
        setSearchError('');
        try {
          setCityName(value);
          const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=1a4415755168a7a47cc946e7c107fadf`);
          const geo = await geoResponse.json();
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geo[0].lat}&lon=${geo[0].lon}&units=metric&appid=1a4415755168a7a47cc946e7c107fadf`);
          const weather = await response.json();
          if (weather) {
            setData(weather);
            console.log(weather);
          } else {
            throw new Error(weather.message);
          }
        } catch (error) {
          setError(error.message);
        }
      }
    }
  };

  return (
    <input
      type="text"
      name='search_bar'
      value={value}
      placeholder={placeholder}
      onKeyDown={handleSearchBar}
      onMouseEnter={handleSearchMouseEnter}
      onMouseLeave={handleSearchMouseLeave}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
