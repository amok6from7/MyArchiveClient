import React, { useState } from 'react';
import axios from 'axios'

export const AddRecord: React.FC = () => {
  const [title, setTitle] = useState('')
  const [title_kana, setTitleKana] = useState('')
  const [evaluation, setEvaluation] = useState(0)
  const [author, setAuthor] = useState('')
  const [author_id, setAuthorId] = useState(0)

  // const options = [
  //   {value: 'atest1', label: 'atest1'},
  //   {value: 'btest1', label: 'btest1'},
  //   {value: 'ctest1', label: 'ctest1'},
  // ]

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log('in handleSubmit')
    const API_URL = `${process.env.REACT_APP_HEROKU_API}record/new`
    const data = {
      title: {title},
      title_kana: {title_kana},
      evaluation: {evaluation},
      author_id: {author_id}
    }

    const response = await axios.post(API_URL, data).then((res: any) => {
      return res.data
    })
    console.log(response)
  }

  return (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/><br/>
          <input type="text" name="title_kana" value={title_kana} onChange={e => setTitleKana(e.target.value)}/><br/>
          <input type="text" name="evaluation" value={evaluation} onChange={e => setEvaluation(Number(e.target.value))}/><br/>
          <input type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)}/><br/>
          <input type="hidden" name="author_id" value={author_id}/><br/>
          {/* <Select options={options}/> */}
          <input type="submit" value="登録"/>
      </form>
  )
}

export default AddRecord
