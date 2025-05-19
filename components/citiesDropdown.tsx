import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { DropdownLocation } from '@/graviton/types'

type ComponentProps = {
  dropdownLocations: DropdownLocation[]
}

export default function CitiesDropdown({ dropdownLocations = [] }: ComponentProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div 
      ref={dropdownRef}
      style={{ position: 'relative' }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={
          {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 12px',
            color: '#374151',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }
        }
      >
        Cities
        <ChevronDown 
          size={16} 
          style={
            {
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s ease',
            }
          }
        />
      </button>

      {
        isOpen && (
          <div style={
            {
              position: 'absolute',
              zIndex: 10,
              marginTop: '4px',
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '8px 12px',
              width: '256px',
              right: 0,  // Align to the right side of the parent element
            }
          }>
            <div style={
              {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '16px',
                rowGap: '4px',
              }
            }>
              {
                dropdownLocations.map(({ name, id }, index) => (
                  <Link
                    key={index}
                    href={`/locations/${id}`}
                    passHref
                    style={
                      {
                        color: '#374151',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        display: 'block',
                      }
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {name}
                  </Link>
                ))
              }
              <Link
                key={dropdownLocations.length + 1}
                href={'/locations'}
                passHref
                style={
                  {
                    color: '#374151',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    display: 'block',
                  }
                }
                onClick={() => setIsOpen(false)}
              >
                All
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}