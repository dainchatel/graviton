import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import SearchInput from '@/graviton/components/searchInput'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('SearchInput', () => {
  it('renders with placeholder', () => {
    render(<SearchInput />)
    expect(screen.getByPlaceholderText('Search destinations')).toBeInTheDocument()
  })

  it('updates input value when typing (uncontrolled)', () => {
    render(<SearchInput />)
    const input = screen.getByPlaceholderText(/search/i)
    fireEvent.change(input, { target: { value: 'test' } })
    expect((input as HTMLInputElement).value).toBe('test')
  })

  it('displays the value from props (controlled)', () => {
    render(<SearchInput value="controlled value" />)
    const input = screen.getByPlaceholderText(/search/i)
    expect((input as HTMLInputElement).value).toBe('controlled value')
  })

  it('calls onSearch callback when text changes', () => {
    const handleSearch = jest.fn()
    render(<SearchInput onSearch={handleSearch} />)

    const input = screen.getByPlaceholderText(/search/i)
    fireEvent.change(input, { target: { value: 'new query' } })

    expect(handleSearch).toHaveBeenCalledWith('new query')
  })

  it('does not change its value on input when controlled', () => {
    const handleSearch = jest.fn()
    render(<SearchInput value="initial" onSearch={handleSearch} />)
    
    const input = screen.getByPlaceholderText(/search/i)
    expect((input as HTMLInputElement).value).toBe('initial')

    fireEvent.change(input, { target: { value: 'changed' } })
    
    // The value should not change because it's controlled by the parent prop
    expect((input as HTMLInputElement).value).toBe('initial')
    // The onSearch callback should still be called
    expect(handleSearch).toHaveBeenCalledWith('changed')
  })
}) 