import React, { useState } from 'react'
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
  Theme,
  CircularProgress,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import SearchIcon from '@material-ui/icons/Search'
import AddBoxIcon from '@material-ui/icons/AddBox'

interface Authors {
  ID: string
  name: string
  name_kana: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
)

const SearchAuthor = () => {
  const API_URL = process.env.REACT_APP_HEROKU_API
  const [author, setAuthor] = useState('')
  const [message, setMessage] = useState('')
  const [authors, setAuthors] = useState(Array)
  const [isLoading, setIsLoading] = useState(false)

  const searchBooks = async () => {
    if (author.length === 0) {
      alert('検索文字を入力して下さい')
      return
    }
    setIsLoading(true)
    const api = `${API_URL}author/search?name=${author}`
    await axios.get(api).then((res) => {
      const data = res.data
      setAuthors(data)
      if (data === 0) {
        setMessage('検索結果：０件')
      } else {
        setMessage(`検索結果：${data.length}件`)
      }
    })
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'author':
        setAuthor(e.target.value)
        break
    }
  }

  const classes = useStyles()

  const Result = () => {
    if (authors.length === 0) return <></>
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((data: any) => {
              return (
                <TableRow key={data.ID}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>
                    <a href={`/author/edit/${data.ID}`}>
                      <EditIcon />
                    </a>
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
      <Typography variant="h6">Author Search</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="author"
        label="Author"
        required
        onChange={handleChange}
      />
      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={searchBooks}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
        <Button variant="contained" startIcon={<AddBoxIcon />}>
          <a href="/author/new">add</a>
        </Button>
      </div>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Result />
          <p>{message}</p>
        </>
      )}
    </div>
  )
}

export default SearchAuthor
