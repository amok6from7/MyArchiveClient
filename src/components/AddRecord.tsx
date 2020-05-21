import React, { useState } from 'react'
import { useForm, Controller, ErrorMessage } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import axios from 'axios'
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  makeStyles,
  createStyles,
  Button,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import Alert from '@material-ui/lab/Alert'
import { AlertType } from '../types/AlertType'
import { AuthorOption } from '../types/AuthorOption'

const useStyles = makeStyles((theme) =>
  createStyles({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
)

export const AddRecord: React.FC = () => {
  const { register, handleSubmit, control, errors } = useForm()
  const [message, setMessage] = useState('')

  const API_URL = `${process.env.REACT_APP_HEROKU_API}`

  const onSubmit = async (data: any) => {
    let params = new URLSearchParams()
    params.append('title', data.title)
    params.append('title_kana', data.title_kana)
    params.append('evaluation', data.evaluation)
    params.append('author_id', data.author.value)
    const API_URL = `${process.env.REACT_APP_HEROKU_API}record/new`
    await axios
      .post(API_URL, params)
      .then((res) => {
        if (res.data.Status === 'OK') {
          setMessage('データ登録完了')
          setAlertType('success')
        } else {
          setMessage('データ登録に失敗しました')
          setAlertType('error')
        }
      })
      .catch((res) => {
        setMessage('データ登録に失敗しました')
        setAlertType('error')
        console.error(res)
      })
  }

  const getAuthor = async (param: string) => {
    let authors: AuthorOption[] = []
    if (!param) return authors
    const GET_AUTHOR_URL = `${API_URL}author/search?name=${param}`
    await axios.get(GET_AUTHOR_URL).then((res) => {
      const response = res.data
      console.log(response)
      Array.from(response).forEach((e: any) => {
        const author = {
          value: e.ID,
          label: e.Name,
        }
        authors.push(author)
      })
    })
    return authors
  }

  const [alertType, setAlertType] = useState<AlertType>('success')

  const classes = useStyles()
  return (
    <>
      <Typography variant="h6">Add Record</Typography>
      {message && <Alert severity={alertType}>{message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="title"
          label="Title"
          required
          inputRef={register({ required: true })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="title_kana"
          label="TitleKana"
          required
          inputRef={register}
        />
        <Typography>Author</Typography>
        <Controller
          as={
            <AsyncSelect loadOptions={getAuthor} placeholder="search Author" />
          }
          name="author"
          rules={{ required: true }}
          control={control}
        />
        <ErrorMessage
          errors={errors}
          name="author"
          message="Author is required"
        />
        <Typography>Eval</Typography>
        <Controller
          as={
            <Select>
              <MenuItem value="0">-</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          }
          control={control}
          name="evaluation"
          defaultValue={0}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          startIcon={<DoneIcon />}
        >
          Register
        </Button>
      </form>
    </>
  )
}

export default AddRecord
