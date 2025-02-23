import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

export const fetchFromGoogleAPI = async (): Promise<GoogleSpreadsheet> => {
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const doc = new GoogleSpreadsheet(process.env.SHEET_ID ?? '', auth)

  await doc.loadInfo()
  return doc
}