import React, { useState, useEffect } from 'react';

interface Book {
  id: string
  title: string
  name: string
  evaluation: string
}

function App() {
  const API_URL = process.env.REACT_APP_HEROKU_API
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [books, setBooks] = useState(Array)
  useEffect(() => {
    //document.title = `clicked ${count} times`
  })

  const searchBooks = async () => {
    if (title.length === 0) {
      alert('検索文字を入力して下さい')
      return
    }
    const api = `${API_URL}record/search-title?title=${title}`
    const response = await fetch(api)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return JSON.stringify(myJson);
    })
    const res = JSON.parse(response)
    setBooks(res);
    if (res === 0) {
      setMessage('検索結果：０件')
    } else {
      setMessage(`検索結果：${res.length}件`)
    }
  }

  const handleChange = (e : any) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value)
        break
    }
  }

  const Result = () => {
    return (
      <table>
        <tr><th>title</th><th>name</th><th>eval</th><th></th></tr>
      { books.map((data: any) => {
        return (
          <tr>
            <td>{data.title}</td>
            <td>{data.name}</td>
            <td>{data.evaluation}</td>
            <td><a href="/record/edit">edit</a> <a href="/record/delete">delete</a></td>
          </tr>
        )
      })}
      </table>
    )
  }
  
  return (
    <div>
      <h2>search title</h2>
      <input type="text" name="title" value={title} onChange={handleChange}/>
      <button onClick={searchBooks}>search</button>
      <button onClick={searchBooks}>new</button>
      { books.length !== 0 && <Result/>}
      <p>{message}</p>
    </div>
  );
}

export default App;
