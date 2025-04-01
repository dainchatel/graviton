import * as React from 'react'
import Map, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

type StayMarker = {
  name: string
  latitude: number
  longitude: number
}

export default function MapComponent({ 
  stayMarkers, 
}: {
  stayMarkers: StayMarker[]
}) {
  const mapTilerKey = process.env.NODE_ENV === 'development' 
    ? process.env.NEXT_PUBLIC_MAPTILER_DEV_KEY 
    : process.env.NEXT_PUBLIC_MAPTILER_PROD_KEY
  const mapStyleUrl = 'https://api.maptiler.com/maps/dataviz/style.json?key=' + mapTilerKey
  
  if (!stayMarkers?.length) {
    return (<div>Cannot load map</div>)
  }

  const initialViewState = {
    longitude: stayMarkers[0].longitude,
    latitude: stayMarkers[0].latitude,
    zoom: 13,
  }
   
  return (
    <Map
      initialViewState={initialViewState}
      style={{ width: 500, height: 500 }}
      mapStyle={mapStyleUrl}
    >
      {stayMarkers.map((marker, index) => (
        <Marker 
          key={`marker-${index}`}
          longitude={marker.longitude} 
          latitude={marker.latitude}
        >
          <div style={{
            backgroundColor: '#14213D',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            cursor: 'pointer',
          }} 
          onClick={() => {
            const anchorId = marker.name.toLowerCase().replace(/\s+/g, '-')
            document.getElementById(anchorId)?.scrollIntoView({ 
              behavior: 'smooth', 
            })
          }}
          onMouseEnter={(e) => {
            const label = e.currentTarget.querySelector('.marker-label')
            if (label) (label as HTMLElement).style.opacity = '1'
          }}
          onMouseLeave={(e) => {
            const label = e.currentTarget.querySelector('.marker-label')
            if (label) (label as HTMLElement).style.opacity = '0'
          }}>
            {marker.name && (
              <div 
                style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'white',
                  color: 'black',
                  padding: '3px 7px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                  zIndex: 10,
                  opacity: 0,
                  transition: 'opacity 0.2s',
                }}
                className="marker-label"
              >
                {marker.name}
              </div>
            )}
          </div>
         
        </Marker>
        
      ))}
    </Map>
  )
}