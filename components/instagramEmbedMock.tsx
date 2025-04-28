import Image from 'next/image'

const InstagramEmbedMock = () => {
  return (
    <div style={
      {
        background: '#fef6fb',
        border: '1px solid #f2d4e8',
        borderRadius: 12,
        padding: 16,
        maxWidth: 500,
        marginTop: 24,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        fontFamily: 'sans-serif',
      }
    }>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <div style={
          {
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#ffb3d9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#fff',
            marginRight: 10,
          }
        }>IG</div>
        <div>
          <div style={{ fontWeight: 'bold' }}>@mockstay</div>
          <div style={{ fontSize: 12, color: '#999' }}>Mock Stay</div>
        </div>
      </div>
      <Image
        src={'/assets/hotel.jpg'}
        alt="Mock Instagram Post"
        width='400'
        height='400'
        style={{ width: 500, borderRadius: 8, objectFit: 'cover' }}
      />
      <p style={{ fontSize: 14, color: '#333', marginTop: 12 }}>
        Woke up feeling mocky 🌞 #MockStayLife #PastelViews
      </p>
    </div>
  )
}

export default InstagramEmbedMock