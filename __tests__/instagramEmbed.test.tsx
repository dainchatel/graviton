import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import InstagramEmbed from '@/graviton/components/instagramEmbed'

describe('InstagramEmbed', () => {
  beforeEach(() => {
    // mock the global instgrm object
    window.instgrm = {
      Embeds: {
        process: jest.fn(),
      },
    }
  })

  it('renders valid Instagram embed HTML and calls instgrm.Embeds.process', () => {
    const validHTML = `
      <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/xyz/">
        Instagram content here
      </blockquote>
    `

    render(<InstagramEmbed embedHTML={validHTML} />)

    // Confirm the embed content is rendered
    expect(screen.getByText(/Instagram content here/i)).toBeInTheDocument()

    // Confirm Instagram hydration is triggered
    expect(window.instgrm?.Embeds.process).toHaveBeenCalled()
  })

  it('returns null and warns if embed HTML is invalid', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const invalidHTML = '<div>Not an Instagram post</div>'

    const { container } = render(<InstagramEmbed embedHTML={invalidHTML} />)

    expect(container.firstChild).toBeNull()
    expect(warnSpy).toHaveBeenCalledWith('Invalid Instagram embed detected')

    warnSpy.mockRestore()
  })
})
