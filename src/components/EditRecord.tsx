import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import axios from 'axios'
import { 
  Typography,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  makeStyles,
  createStyles,
  Button 
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => 
createStyles({
  loading: {
    display: 'flex',
    justifyContent: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
})
)

export const EditRecord: React.FC = () => {
  const { record_id } = useParams()
  const { register, handleSubmit, setValue, control } = useForm()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ message, setMessage ] = useState('')

  useLayoutEffect(() => {
    const f = async () => {
      await getRecord()
    }
    f()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const API_URL = `${process.env.REACT_APP_HEROKU_API}`
  //const API_URL = 'http://localhost:8080/api/'

  const getRecord = async () => {
    setIsLoading(true)
    const GET_RECORD_URL = `${API_URL}record/edit?id=${record_id}`
    await axios.get(GET_RECORD_URL).then(res => {
      setIsLoading(false)
      const record = res.data
      setValue([
        { title: record[0].title }, 
        { title_kana: record[0].title_kana }, 
        { evaluation: record[0].evaluation }, 
        { author: { value: record[0].author_id, label: record[0].name } },
      ])
    })
  }

  const onSubmit = async (data: any) => {
    let params = new URLSearchParams()
    params.append('id', record_id)
    params.append('title', data.title)
    params.append('title_kana', data.title_kana)
    params.append('evaluation', data.evaluation)
    params.append('author_id', data.author.value)
    const API_URL = `${process.env.REACT_APP_HEROKU_API}record/update`
    const response = await axios.post(API_URL, params).then((res) => {
      return res.data
    })
    if (response.Status === "OK") {
      setMessage("データ更新完了")
    } else {
      setMessage("データ更新に失敗しました")//TODO Alertの出しわけ
    }
  }

  type authorOption = {
    value: string,
    label: string
  }

  const getAuthor = async (param: string) => {
    let authors: authorOption[] = []
    if (!param) return authors
    const GET_AUTHOR_URL = `${API_URL}author/search?name=${param}`
    await axios.get(GET_AUTHOR_URL).then(res => {
      const response = res.data
      console.log(response)
      Array.from(response).forEach((e: any) => {
        const author = {
          value: e.ID,
          label: e.Name
        }
        authors.push(author)
      });
    })
    return authors
  }

  const classes = useStyles()
  return (
    <>
      <Typography variant="h6">Edit Record</Typography>
      { message && <Alert severity="success">{message}</Alert> }
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="id" value={record_id} ref={register}/>
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
            as={<AsyncSelect loadOptions={getAuthor}/>}
            name="author"
            control={control}
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
          >
            Update
          </Button>
        </form>
      )}
    </>
  )
}

export default EditRecord
