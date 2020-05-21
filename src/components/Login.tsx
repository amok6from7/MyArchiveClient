import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import auth from '../firebase/base'
import {
  Container,
  Link,
  FormControl,
  TextField,
  Button,
  Typography,
} from '@material-ui/core'
import { AuthContext } from './Auth'

const Login = (props: any) => {
  const { currentUser } = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    currentUser && props.history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <>
      <Container>
        <Typography variant="h6" style={{ marginTop: '0.5em' }}>
          Login
        </Typography>
        <FormControl margin="normal" fullWidth>
          <TextField
            style={{ marginTop: '0.5em' }}
            name="email"
            label="E-mail"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value)
            }}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            style={{ marginBottom: '0.5em' }}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value)
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <Button
            fullWidth
            style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
            onClick={async () => {
              try {
                await auth.signInWithEmailAndPassword(email, password)
                const HEALTH_CHECK_URL = `${process.env.REACT_APP_HEROKU_API}healthCheck`
                axios.get(HEALTH_CHECK_URL)
                props.history.push('/')
              } catch (error) {
                alert(error)
              }
            }}
          >
            Login
          </Button>
          <Typography align="center">
            <Link href="/signup">to signup</Link>
          </Typography>
        </FormControl>
      </Container>
    </>
  )
}

export default Login
