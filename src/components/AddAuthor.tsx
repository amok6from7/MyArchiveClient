import React, { useState, useContext, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {
  Typography,
  TextField,
  makeStyles,
  createStyles,
  Button,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import Alert from '@material-ui/lab/Alert'
import { AlertType } from '../types/AlertType'
import { AuthContext } from './Auth'

const useStyles = makeStyles((theme) =>
  createStyles({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
)

export const AddAuthor: React.FC = (props: any) => {
  const { register, handleSubmit } = useForm()
  const [message, setMessage] = useState('')
  const { currentUser } = useContext(AuthContext)

  useLayoutEffect(() => {
    currentUser === null && props.history.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const onSubmit = async (data: any) => {
    let params = new URLSearchParams()
    params.append('name', data.name)
    params.append('name_kana', data.name_kana)
    const API_URL = `${process.env.REACT_APP_HEROKU_API}author/new`
    await axios
      .post(API_URL, params)
      .then((res) => {
        if (res.data.Status === 'OK') {
          setMessage('データ登録完了')
          setAlertType('success')
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
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

  const [alertType, setAlertType] = useState<AlertType>('success')

  const classes = useStyles()
  return (
    <>
      <Typography variant="h6">Add Author</Typography>
      {message && <Alert severity={alertType}>{message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
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

export default AddAuthor
