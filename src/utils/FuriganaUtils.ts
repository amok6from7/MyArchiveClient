import axios from 'axios'

const FuriganaUtils = {
  getFurigawa: async (target: string) => {
    if (!target) return ''
    const FURIGANA_API_URL = `${process.env.REACT_APP_FURIGANA_API_URL}`
    let params = new URLSearchParams()
    params.append('sentence', target)
    params.append('app_id', `${process.env.REACT_APP_FURIGANA_API_ID}`)
    params.append('output_type', 'hiragana')
    let furigana = ''
    await axios
      .post(FURIGANA_API_URL, params)
      .then((res) => {
        const data = res.data.converted.replace(/\s/g, '')
        furigana = data
      })
      .catch((e) => {
        console.error(e)
      })
    return furigana
  },
}

export default FuriganaUtils
