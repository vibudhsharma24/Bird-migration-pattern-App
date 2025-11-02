import React, {useEffect, useRef} from 'react';

export default function MapComponent({species, range}){
  const ref = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(()=>{
    if(!window.google) {
      console.error('Google Maps JS API not loaded. Add your API key in public/index.html');
      return;
    }
    mapRef.current = new window.google.maps.Map(ref.current, {
      center: {lat:20, lng:0},
      zoom:2
    });
  },[]);

  useEffect(()=>{
    const params = new URLSearchParams();
    if(species) params.append('species', species);
    if(range?.start) params.append('start', range.start);
    if(range?.end) params.append('end', range.end);

    fetch('http://localhost:5000/api/migrations?' + params.toString())
      .then(r=>r.json())
      .then(points => {
        markersRef.current.forEach(m=>m.setMap(null));
        markersRef.current = [];
        if(!points || points.length===0) return;

        const bounds = new window.google.maps.LatLngBounds();
        points.forEach(p=>{
          const pos = {lat: p.lat, lng: p.lng};
          bounds.extend(pos);
          const marker = new window.google.maps.Marker({
            position: pos,
            map: mapRef.current,
            title: `${p.species} — ${p.date} — count: ${p.count}`
          });
          const iw = new window.google.maps.InfoWindow({
            content: `<div><strong>${p.species}</strong><div>${p.date}</div><div>count: ${p.count}</div><div>${p.notes || ''}</div></div>`
          });
          marker.addListener('click', ()=> iw.open({map: mapRef.current, anchor: marker}));
          markersRef.current.push(marker);
        });
        if(points.length>0) mapRef.current.fitBounds(bounds);
      })
      .catch(console.error);
  }, [species, range]);

  return <div ref={ref} style={{height:'80vh', width:'100%'}} />;
}
