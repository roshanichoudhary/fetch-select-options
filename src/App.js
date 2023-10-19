import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [values, setValues] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchDataFromApi();
  }, []); //empty array to run this effect only once

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch("http://192.168.1.8:8765/api/genders.json");
      if (response.ok) {
        const genderOptions = await response.json();
        const arr = genderOptions.data;
        setValues(arr);
      } else {
        console.error("failed to fetch from the API");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="App">
      <form>
        <select
          id="dropdown1"
          value={options}
          name="gender"
          required
          placeholder="Gender"
          onChange={(e) => {
            setOptions(e.target.value);
          }}
        >
          <option value="">Select an option</option>
          {values.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}

export default App;
