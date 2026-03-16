import { Tldraw, createTLStore, defaultShapeUtils, loadSnapshot } from 'tldraw'
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import 'tldraw/tldraw.css'

interface Props {
  slug: string | undefined
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; snapshot: unknown; title: string }

export default function CanvasFullscreen({ slug }: Props) {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    if (!slug) {
      setLoadState({ status: 'error', message: 'No slug provided' })
      return
    }

    let cancelled = false

    supabase
      .from('canvases')
      .select('snapshot, title')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return
        if (error || !data) {
          setLoadState({ status: 'error', message: error?.message ?? 'Canvas not found' })
          return
        }
        setLoadState({ status: 'ready', snapshot: data.snapshot, title: data.title })
      })

    return () => { cancelled = true }
  }, [slug])

  const store = useMemo(() => {
    if (loadState.status !== 'ready') return null
    const s = createTLStore({ shapeUtils: defaultShapeUtils })
    loadSnapshot(s, loadState.snapshot as any)
    return s
  }, [loadState])

  if (loadState.status === 'loading') {
    return (
      <div style={centerStyle}>
        <span style={{ color: '#888', fontSize: '14px' }}>Loading canvas…</span>
      </div>
    )
  }

  if (loadState.status === 'error') {
    return (
      <div style={centerStyle}>
        <span style={{ color: '#dc2626', fontSize: '14px' }}>
          {loadState.message}
        </span>
      </div>
    )
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Tldraw
        store={store!}
        hideUi
        onMount={editor => {
          editor.updateInstanceState({ isReadonly: true }); 
          editor.zoomToFit();
        }}
      />
      <div style={backButtonStyle}>
        <button
          onClick={() => history.back()}
          style={buttonStyle}
        >
          ← Back
        </button>
        <span style={{ color: '#555', fontSize: '13px', fontWeight: 500 }}>
          {loadState.title}
        </span>
      </div>
    </div>
  )
}

const centerStyle: React.CSSProperties = {
  width: '100vw', height: '100vh',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

const backButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px', left: '12px',
  display: 'flex', alignItems: 'center', gap: '10px',
  background: 'rgba(255,255,255,0.92)',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  padding: '6px 12px',
  backdropFilter: 'blur(4px)',
  zIndex: 1000,
}

const buttonStyle: React.CSSProperties = {
  background: 'none', border: 'none',
  color: '#7c3aed', fontSize: '13px',
  cursor: 'pointer', fontWeight: 500, padding: 0,
}