import { DropdownLocation, LocationTile } from '@/graviton/types'
import { ContentGrid, Layout, SearchInput } from '@/graviton/components'
import { fetchData } from '@/graviton/lib/data'
import { asLocationTile } from '@/graviton/lib/locations'

type PageProps = {
  dropdownLocations: DropdownLocation[]
  locations: LocationTile[]
}

export async function getServerSideProps(): Promise<{ props: PageProps }> {
  try {
    const { locations, dropdownLocations } = await fetchData()
    const locationTiles = locations
      .map(asLocationTile)

    return {
      props: {
        locations: locationTiles,
        dropdownLocations,
      },
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      props: {
        locations: [],
        dropdownLocations: [],
      },
    }
  }
}

export default function Locations({ dropdownLocations, locations }: PageProps) {
  return (
    <Layout dropdownLocations={dropdownLocations}>
      <section style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexGrow: '1',
        }
      }>
        <SearchInput/>
        <div style={{ width: '80vw' }}>
          <ContentGrid articles={[]} locations={locations} sortBy="alphabetical" />
        </div>
      </section>
    </Layout>
  )
}

