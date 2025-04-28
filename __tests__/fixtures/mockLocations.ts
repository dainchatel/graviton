import { Location } from '@/graviton/types'
import { randomUUID } from 'crypto'

export const mockLocations: Location[] = [
  {
    id: randomUUID(),
    name: 'Tokyo',
    icon: 'Sun',
    updatedAt: '2025-04-22',
    numberOfStays: 12,
  },
  {
    id: randomUUID(),
    name: 'Berlin',
    icon: 'Building2',
    updatedAt: '2025-04-20',
    numberOfStays: 11,
  },
  {
    id: randomUUID(),
    name: 'Lisbon',
    icon: 'Waves',
    updatedAt: '2025-04-18',
    numberOfStays: 10,
  },
  {
    id: randomUUID(),
    name: 'Miami',
    icon: 'PalmTree',
    numberOfStays: 13,
  },
]
