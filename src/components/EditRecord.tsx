import React, { useLayoutEffect, useState, useContext } from 'react'
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
  Button,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import Alert from '@material-ui/lab/Alert'
import { AlertType } from '../types/AlertType'
import { AuthorOption } from '../types/AuthorOption'
import { AuthContext } from './Auth'

const useStyles = makeStyles((theme) =>
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

export const EditRecord: React.FC = (props: any) => {
  const { record_id } = useParams()
  const { register, handleSubmit, setValue, control } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { currentUser } = useContext(AuthContext)

  useLayoutEffect(() => {
    currentUser === null && props.history.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useLayoutEffect(() => {
    const f = async () => {
      await getRecord()
    }
    f()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const API_URL = `${process.env.REACT_APP_HEROKU_API}`

  const getRecord = async () => {
    setIsLoading(true)
    const GET_RECORD_URL = `${API_URL}record/edit?id=${record_id}`
    await axios.get(GET_RECORD_URL).then((res) => {
      setIsLoading(false)
      const record = res.data
      if (record.length === 0 || record.ID === 0) {
        setMessage('データ取得に失敗しました')
        setAlertType('error')
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      } else {
        setValue([
          { title: record[0].title },
          { title_kana: record[0].title_kana },
          { evaluation: record[0].evaluation },
          { author: { value: record[0].author_id, label: record[0].name } },
        ])
      }
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
    if (response.Status === 'OK') {
      setMessage('データ更新完了')
      setAlertType('success')
    } else {
      setMessage('データ更新に失敗しました')
      setAlertType('error')
    }
  }

  const getAuthor = async (param: string) => {
    let authors: AuthorOption[] = []
    if (!param) return authors
    const GET_AUTHOR_URL = `${API_URL}author/search?name=${param}`
    await axios.get(GET_AUTHOR_URL).then((res) => {
      const response = res.data
      Array.from(response).forEach((e: any) => {
        const author = {
          value: e.ID,
          label: e.name,
        }
        authors.push(author)
      })
    })
    return authors
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickClose = () => {
    setOpen(false)
  }

  const [alertType, setAlertType] = useState<AlertType>('success')

  const deleteRecord = async () => {
    const DELETE_RECORD_URL = `${API_URL}record/delete`
    let params = new URLSearchParams()
    params.append('id', record_id)
    await axios
      .post(DELETE_RECORD_URL, params)
      .then((res) => {
        if (res.data.Status === 'OK') {
          handleClickClose()
          setMessage('削除が完了しました')
          setAlertType('success')
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        } else {
          handleClickClose()
          setMessage('データ削除に失敗しました')
          setAlertType('error')
        }
      })
      .catch((res) => {
        handleClickClose()
        setMessage('データ削除に失敗しました')
        setAlertType('error')
        console.error(res)
      })
  }

  const classes = useStyles()
  return (
    <>
      <Typography variant="h6">Edit Record</Typography>
      {message && <Alert severity={alertType}>{message}</Alert>}
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="id" value={record_id} ref={register} />
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
            as={<AsyncSelect loadOptions={getAuthor} />}
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
          <div className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              SAVE
            </Button>
            <Button
              variant="contained"
              onClick={handleClickOpen}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
          <Dialog open={open} onClose={handleClickClose}>
            <DialogContent>
              <DialogContentText>レコードを削除します</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose}>Disagree</Button>
              <Button onClick={deleteRecord} color="secondary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      )}
    </>
  )
}

export default EditRecord
