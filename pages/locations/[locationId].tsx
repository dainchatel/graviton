import { Location as LocationType, Stay as StayType, DropdownLocation } from '@/graviton/types'
import { fetchData } from '@/graviton/lib/data'
import { Layout, MapComponent, Stay } from '@/graviton/components'
import { useEffect, useMemo, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { GetServerSidePropsContext } from 'next'
import * as lucide from 'lucide-react'

type PageProps = {
  location?: LocationType
  stays: StayType[]
  dropdownLocations: DropdownLocation[]
}

const getIcon = (iconName: string) => {
  const Icon = lucide[iconName as keyof typeof lucide] as lucide.LucideIcon | undefined
  if (!Icon) return null
  return (<Icon size={100} />)
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: PageProps }> {
  try {
    const { stays, locations, dropdownLocations } = await fetchData()
    const { locationId } = context.params as { locationId: string }
    const location = locations.find(location => location.id === locationId)

    const filteredStays = location
      ? stays.filter(stay => stay.location === location.name)
      : []

    return {
      props: {
        location, 
        stays: filteredStays,
        dropdownLocations,
      },
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      props: {
        stays: [],
        dropdownLocations: [],
      },
    }
  }
}

export default function Location({ location, dropdownLocations, stays }: PageProps) {

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

  if (!location) {
    return (
      <Layout dropdownLocations={dropdownLocations}>
        <h1>Uh oh, couldn&apos;t find what you were looking for!</h1>
      </Layout>
    )
  }

  const stayMarkers = stays.map(stay => ({ 
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

  return (
    <Layout dropdownLocations={dropdownLocations}>
      <main style={{ display: 'flex', justifyContent: 'space-evenly', color: '#333333' }}>
        <div style={{ width: 600 }}>
          <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', fontSize: '2.2rem' }}>Our {location.numberOfStays} Favorite Stays in {location.name}</h1>
            <div style={{ textAlign: 'center' }}>{getIcon(location.icon)}</div>
            <p style={{ textAlign: 'center' }}>{location.description}</p>
          </div>
          {
            stays.map((stay, i) => (
              <Stay 
                key={i} 
                index={i}
                stay={stay}   
                onInView={debouncedSetSelectedStayIndex}
                isProgrammaticScroll={isProgrammaticScroll}
                readyForScrollSync={readyForScrollSync}
              />))
          }
        </div>
        <div>

          <div style={{ position: 'sticky', top: '1rem', alignSelf: 'flex-start' }}>
            <MapComponent
              key={location.id}
              selectedIndex={selectedStayIndex}
              onMarkerClick={onMarkerClick}
              stayMarkers={stayMarkers}
            />
         
          </div>
        </div>
      </main>
    </Layout>
  )
}