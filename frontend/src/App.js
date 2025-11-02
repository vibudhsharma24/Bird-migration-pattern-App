import React, {useEffect, useState} from 'react';
import MapComponent from './components/MapComponent';

export default function App(){
  const [species, setSpecies] = useState([]);
  const [selected, setSelected] = useState('');
  const [dataRange, setDataRange] = useState({start:'2024-01-01', end:'2024-12-31'});

  useEffect(()=> {
    fetch('http://localhost:5000/api/species')
      .then(r=>r.json())
      .then(setSpecies)
      .catch(console.error);
  },[]);

  return (
    <div className="app">
      <header>
        <h1>Bird Migration Tracker</h1>
        <div className="controls">
          <select value={selected} onChange={e=>setSelected(e.target.value)}>
            <option value=''>-- All species --</option>
            {species.map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <label>
            Start
            <input type="date" value={dataRange.start} onChange={e=>setDataRange({...dataRange,start:e.target.value})}/>
          </label>
          <label>
            End
            <input type="date" value={dataRange.end} onChange={e=>setDataRange({...dataRange,end:e.target.value})}/>
          </label>
        </div>
      </header>
      <main>
        <MapComponent species={selected} range={dataRange} />
      </main>
    </div>
  );
}
