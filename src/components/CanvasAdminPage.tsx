import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { signIn, signOut } from '../lib/auth'
import CanvasEditor from './CanvasEditor'

type AuthState =
  | { status: 'checking' }
  | { status: 'unauthenticated' }
  | { status: 'authenticated'; email: string }

export default function CanvasAdminPage() {
  const [authState, setAuthState] = useState<AuthState>({ status: 'checking' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthState({ status: 'authenticated', email: session.user.email ?? '' })
      } else {
        setAuthState({ status: 'unauthenticated' })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuthState({ status: 'authenticated', email: session.user.email ?? '' })
      } else {
        setAuthState({ status: 'unauthenticated' })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError('')

    const { error } = await signIn(email, password)
    if (error) {
      setLoginError(error.message)
    }
    setIsLoggingIn(false)
  }

  async function handleSignOut() {
    await signOut()
  }

  if (authState.status === 'checking') {
    return (
      <div style={centerStyle}>
        <p style={{ color: '#888', fontSize: '14px' }}>Checking session…</p>
      </div>
    )
  }

  if (authState.status === 'unauthenticated') {
    return (
      <div style={centerStyle}>
        <div style={cardStyle}>
          <h1 style={{ margin: '0 0 24px', fontSize: '18px', color: '#111', fontWeight: 500 }}>Canvas Editor</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            {loginError && (
              <p style={{ color: '#f87171', fontSize: '13px', margin: 0 }}>{loginError}</p>
            )}
            <button type="submit" disabled={isLoggingIn} style={buttonStyle}>
              {isLoggingIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={toolbarStyle}>
        <span style={{ color: '#555', fontSize: '13px' }}>{authState.email}</span>
        <button onClick={handleSignOut} style={ghostButtonStyle}>Sign out</button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <CanvasEditor />
      </div>
    </div>
  )
}

const centerStyle: React.CSSProperties = {
  width: '100vw', height: '100vh',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#f6f6f6',
}

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '12px',
  padding: '32px',
  width: '320px',
  border: '1px solid #e5e5e5',
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
}

const inputStyle: React.CSSProperties = {
  background: '#f9f9f9',
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
  padding: '10px 12px',
  color: '#111',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

const buttonStyle: React.CSSProperties = {
  background: '#7c3aed',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '10px 12px',
  fontSize: '14px',
  cursor: 'pointer',
  fontWeight: 500,
  width: '100%',
}

const toolbarStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '8px 16px',
  background: '#ffffff',
  borderBottom: '1px solid #e5e5e5',
  height: '44px', flexShrink: 0,
}

const ghostButtonStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
  color: '#555',
  padding: '4px 10px',
  fontSize: '13px',
  cursor: 'pointer',
}