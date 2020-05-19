import React, { useState } from 'react';
import axios from 'axios'

interface Book {
  id: string
  title: string
  name: string
  evaluation: string
}

const SearchTitle = () => {
  const API_URL = process.env.REACT_APP_HEROKU_API
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [books, setBooks] = useState(Array)

  const searchBooks = async () => {
    if (title.length === 0) {
      alert('検索文字を入力して下さい')
      return
    }
    const api = `${API_URL}record/search-title?title=${title}`
    const response = await axios.get(api)
      .then((res) => {
        return res.data
      })
    setBooks(response)
    if (response === 0) {
      setMessage('検索結果：０件')
    } else {
      setMessage(`検索結果：${response.length}件`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value)
        break
    }
  }

  const Result = () => {
    return (
      <table>
        <thead>
          <tr><th>title</th><th>name</th><th>eval</th><th></th></tr>
        </thead>
        <tbody>
      { books.map((data: any) => {
        return (
            <tr key={data.ID}>
              <td>{data.title}</td>
              <td>{data.name}</td>
              <td>{data.evaluation}</td>
              <td><a href={`/record/edit/${data.ID}`}>edit</a> <a href="/record/delete">delete</a></td>
            </tr>
        )
      })}
       </tbody>
      </table>
    )
  }
  
  return (
    <div>
      <h2>search title</h2>
      <input type="text" name="title" value={title} onChange={handleChange}/>
      <button onClick={searchBooks}>search</button>
      <a href="/new">add</a>
      { books.length !== 0 && <Result/>}
      <p>{message}</p>
    </div>
  );
}

export default SearchTitle;
