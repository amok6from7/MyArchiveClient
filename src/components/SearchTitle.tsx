import React, { useState } from 'react';
import axios from 'axios'
import { 
  Typography, 
  TextField, 
  Button, 
  TableContainer, 
  TableCell, 
  TableRow, 
  TableHead, 
  Paper, 
  Table, 
  TableBody, 
  makeStyles, 
  createStyles, 
  Theme 
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import SearchIcon from '@material-ui/icons/Search'
import AddBoxIcon from '@material-ui/icons/AddBox'

interface Book {
  id: string
  title: string
  name: string
  evaluation: string
}

const useStyles = makeStyles((theme: Theme) => 
createStyles({
  button: {
    '& > *': {
      margin: theme.spacing(1),
    }
  }
})
)

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

  const classes = useStyles()

  const Result = () => {
    return (
      <TableContainer component={Paper}>
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Eval</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { books.map((data: any) => {
            return (
              <TableRow key={data.ID}>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.evaluation}</TableCell>
                <TableCell>
                  <a href={`/record/edit/${data.ID}`}><EditIcon/></a>
                </TableCell>
              </TableRow>
            )
          })}
          </TableBody>
          
        </Table>
      </TableContainer>
    )
  }
  
  return (
    <div>
      <Typography variant="h6">Search Title</Typography>
      <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="title"
            label="Title"
            required
            onChange={handleChange}
          />
      <div className={classes.button}>
        <Button 
          variant="contained"
          color="primary"
          onClick={searchBooks}
          startIcon={<SearchIcon/>}
        >
          Search
        </Button>
        <Button
         variant="contained"
         startIcon={<AddBoxIcon/>}>
          <a href="/record/new">add</a>
        </Button>
      </div>
      { books.length !== 0 && <Result/>}
      <p>{message}</p>
    </div>
  );
}

export default SearchTitle;
