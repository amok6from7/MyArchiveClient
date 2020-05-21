import React, { useLayoutEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {
  Typography,
  TextField,
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

export const EditAuthor: React.FC = (props: any) => {
  const { author_id } = useParams()
  const { register, handleSubmit, setValue } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { currentUser } = useContext(AuthContext)

  useLayoutEffect(() => {
    currentUser === null && props.history.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useLayoutEffect(() => {
    const f = async () => {
      await getAuthor()
    }
    f()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const API_URL = `${process.env.REACT_APP_HEROKU_API}`

  const getAuthor = async () => {
    setIsLoading(true)
    const GET_AUTHOR_URL = `${API_URL}author/edit?id=${author_id}`
    await axios.get(GET_AUTHOR_URL).then((res) => {
      setIsLoading(false)
      const author = res.data
      if (author.ID === 0) {
        setMessage('データ取得に失敗しました')
        setAlertType('error')
        setTimeout(() => {
          window.location.href = '/author/search'
        }, 1000)
      }
      setValue([{ name: author.name }, { name_kana: author.name_kana }])
    })
  }

  const onSubmit = async (data: any) => {
    let params = new URLSearchParams()
    params.append('id', author_id)
    params.append('name', data.name)
    params.append('name_kana', data.name_kana)
    const API_URL = `${process.env.REACT_APP_HEROKU_API}author/update`
    const response = await axios.post(API_URL, params).then((res) => {
      return res.data
    })
    if (response.Status === 'OK') {
      setMessage('データ更新完了')
      setAlertType('success')
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } else {
      setMessage('データ更新に失敗しました')
      setAlertType('error')
    }
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickClose = () => {
    setOpen(false)
  }

  const [alertType, setAlertType] = useState<AlertType>('success')

  const deleteAuthor = async () => {
    const DELETE_AUTHOR_URL = `${API_URL}author/delete`
    let params = new URLSearchParams()
    params.append('id', author_id)
    await axios
      .post(DELETE_AUTHOR_URL, params)
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
      <Typography variant="h6">Edit Author</Typography>
      {message && <Alert severity={alertType}>{message}</Alert>}
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="id" value={author_id} ref={register} />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="name"
            label="Name"
            required
            inputRef={register({ required: true })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="name_kana"
            label="NameKana"
            required
            inputRef={register}
          />
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
              <DialogContentText>作者を削除します</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose}>Disagree</Button>
              <Button onClick={deleteAuthor} color="secondary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      )}
    </>
  )
}

export default EditAuthor
