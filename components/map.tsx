import * as React from 'react'
import Map, { Marker, MapRef } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useState, useRef, useEffect } from 'react'
import { WebMercatorViewport } from '@math.gl/web-mercator'
import { brandColor } from '@/graviton/constants'


type StayMarker = {
  name: string
  latitude: number
  longitude: number
}

export function calculateViewState(
  stayMarkers: StayMarker[],
  width: number = 600,
  height: number = 600,
  padding: number = 40,
): { latitude: number, longitude: number, zoom: number } {
  const lats = stayMarkers.map(m => m.latitude)
  const lngs = stayMarkers.map(m => m.longitude)

  if (!lats.length || !lngs.length) {
    throw new Error('Latitude and longitude arrays must not be empty')
  }

  const bounds: [[number, number], [number, number]] = [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ]

  return new WebMercatorViewport({ width, height }).fitBounds(bounds, { padding })
}

export default function MapComponent({ 
  stayMarkers, 
  selectedIndex,
  onMarkerClick,
}: {
  stayMarkers: StayMarker[]
  selectedIndex: number | null
  onMarkerClick: (index: number) => void
}) {
  const selectedMarkerId = selectedIndex !== null ? `marker-${selectedIndex}` : null
  const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState<number | null>(null)
  const [labelCoords, setLabelCoords] = useState<[number, number] | null>(null)
  const mapRef = useRef<MapRef | null>(null)

  const mapTilerKey = process.env.NODE_ENV === 'development' 
    ? process.env.NEXT_PUBLIC_MAPTILER_DEV_KEY 
    : process.env.NEXT_PUBLIC_MAPTILER_PROD_KEY
  const mapStyleUrl = 'https://api.maptiler.com/maps/dataviz/style.json?key=' + mapTilerKey

  useEffect(() => {
    if (hoveredMarkerIndex !== null && mapRef.current) {
      const marker = stayMarkers[hoveredMarkerIndex]
      const point = mapRef.current.project([marker.longitude, marker.latitude])
      setLabelCoords([point.x, point.y])
    } else {
      setLabelCoords(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredMarkerIndex])

  useEffect(() => {
    if (selectedIndex === null || !mapRef.current) return
  
    const marker = stayMarkers[selectedIndex]
    if (!marker) return
  
    const { longitude, latitude } = marker
  
    const currentZoom = mapRef.current.getZoom()
  
    const timeout = setTimeout(() => {
      mapRef.current!.flyTo({
        center: [longitude, latitude],
        zoom: currentZoom,
        duration: 1000,
      })
    }, 100)
  
    return () => clearTimeout(timeout)
  }, [selectedIndex, stayMarkers])

  if (!stayMarkers?.length) {
    return (<div>Cannot load map</div>)
  }

  const initialViewState = calculateViewState(stayMarkers)

  return (
    <div style={{ position: 'relative', width: 600, height: 600 }}>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyleUrl}
      >
        {
          stayMarkers.map((marker, index) => (
            <Marker 
              key={`marker-${index}`}
              longitude={marker.longitude} 
              latitude={marker.latitude}
            >
              <div 
                style={
                  {
                    position: 'relative',
                    cursor: 'pointer',
                  }
                }
                onClick={
                  () => {
                    const anchorId = marker.name.toLowerCase().replace(/\s+/g, '-')
                    document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' })
                    onMarkerClick(index)
                  }
                }
                onMouseEnter={() => setHoveredMarkerIndex(index)}
                onMouseLeave={() => setHoveredMarkerIndex(null)}
              >
                <svg 
                  width="25" 
                  height="35" 
                  viewBox="0 0 25 35"
                >
                  <path 
                    d="M12.5,2 C7,2 2.5,6.5 2.5,12 C2.5,18 7.5,26 12.5,33 C17.5,26 22.5,18 22.5,12 C22.5,6.5 18,2 12.5,2 Z" 
                    fill={selectedMarkerId === `marker-${index}` ? brandColor : 'transparent'} 
                    stroke={brandColor}
                    strokeWidth="2" 
                  />
                </svg>
              </div>
            </Marker>
          ))
        }
      </Map>

      {
        hoveredMarkerIndex !== null && labelCoords && (
          <div
            style={
              {
                position: 'absolute',
                top: `${labelCoords[1] - 45}px`,
                left: `${labelCoords[0]}px`,
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                color: 'black',
                fontFamily: 'Helvetica',
                padding: '3px 7px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                fontSize: '12px',
                pointerEvents: 'none',
                zIndex: 9999,
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                transition: 'opacity 0.2s',
              }
            }
          >
            {stayMarkers[hoveredMarkerIndex].name}
          </div>
        )
      }
    </div>
  )
}
