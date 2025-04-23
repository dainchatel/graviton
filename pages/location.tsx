import { Props } from '@/graviton/types'
import { fetchData } from '@/graviton/lib/data'
import Layout from '@/graviton/components/layout'
import MapComponent from '@/graviton/components/map'
import Stay from '@/graviton/components/stay'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import debounce from 'lodash.debounce'


export async function getServerSideProps() {
  try {
    const { stays, locations } = await fetchData()
    return {
      props: {
        stays,
        articles: [],
        locations,
      },
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      props: {
        stays: [],
        articles: [],
      },
    }
  }
}

export default function Location({ stays, locations }: Props) {
  const router = useRouter()
  const [selectedStayIndex, setSelectedStayIndex] = useState<number | null>(null)

  const isProgrammaticScroll = useRef(false)
  const readyForScrollSync = useRef(false)

  const debouncedSetSelectedStayIndex = useMemo(
    () => debounce((index: number) => setSelectedStayIndex(index), 100),
    [],
  )
  
  useEffect(() => {
    return () => {
      debouncedSetSelectedStayIndex.cancel()
    }
  }, [debouncedSetSelectedStayIndex])

  useEffect(() => {
    const enable = () => { readyForScrollSync.current = true }
    window.addEventListener('scroll', enable, { once: true })
    return () => window.removeEventListener('scroll', enable)
  }, [])

  const location = Array.isArray(router.query.name) 
    ? router.query.name[0] 
    : router.query.name || ''
    
  const filteredStays = stays.filter(stay => stay.location === location)

  const stayMarkers = filteredStays.map(stay => ({ 
    name: stay.name, 
    latitude: Number(stay.coordinates.split(',')[0]), 
    longitude: Number(stay.coordinates.split(',')[1]), 
  })) 

  const onMarkerClick = (index: number) => {
    isProgrammaticScroll.current = true
    setSelectedStayIndex(index)

    const anchorId = stayMarkers[index].name.toLowerCase().replace(/\s+/g, '-')
    const el = document.getElementById(anchorId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 600)
    }
  }
  
  if (location)
    return (
      <Layout locations={locations}>
        <main style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ width: 600 }}>
            {filteredStays.map((stay, i) => (
              <Stay 
                key={i} 
                index={i}
                stay={stay}   
                onInView={debouncedSetSelectedStayIndex}
                isProgrammaticScroll={isProgrammaticScroll}
                readyForScrollSync={readyForScrollSync}
              />))}
          </div>
          <div>

            <div style={{ position: 'sticky', top: '1rem', alignSelf: 'flex-start' }}>
              <MapComponent
                key={location}
                selectedIndex={selectedStayIndex}
                onMarkerClick={onMarkerClick}
                stayMarkers={stayMarkers}
              />
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '3.2rem' }}>{location}</h1>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    )
}