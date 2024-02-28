import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let [arr, setarr] = useState([]);
  let [view, setview] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    let api = async () => {
      try {
        let temp = await axios.get("https://restcountries.com/v3.1/all");
        setarr(temp.data);
        setview(temp.data);
      } catch (e) {
        console.log(e);
      }
    };
    api();
  }, []);

  useEffect(() => {
    if (!search.length) setview([...arr]);
    else {
      let id = setTimeout(() => {
        searchOp(search);
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [search]);

  let searchOp = (val) => {
    if (val.length) {
      console.log("in searchOp value=", val);
      let len = val.length;
      let temp = arr.filter(
        (aval) =>
          aval.name.common.toLowerCase().includes(val.toLowerCase())
      );
      setview(temp);
      console.log("temp=", temp);
    }
  };

  const handleChange = (e) => {
    console.log("in handleChange value=", e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className="component">
      <input type="text" onChange={(e) => handleChange(e)} className="input" />
      <div className="flags">
        {arr.length !== 0
          ? view.map((val) => {
              return (
                <div key={val.cca3} className="containers">
                  <img
                    src={val.flags.png}
                    alt={val.flags.alt}
                    className="image"
                  />
                  <h3 className="name">{val.name.common}</h3>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;