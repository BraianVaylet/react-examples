import { useState } from 'react'

// import api from '~/common/api'
// Mock
const api: any = {}

const ConnectedLoginForm = () => {
  const handleSubmit = async (email: string, password: string) => {
    await api.login(email, password)
  }
  return (
    <LoginForm onSubmit={handleSubmit} />
  )
}

type Props = {
  onSubmit: (email: string, password: string) => Promise<void>
}

const LoginForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (evt: any) => {
    evt.preventDefault()
    await onSubmit(email, password)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  )
}