import { Tldraw, createTLStore, defaultShapeUtils, loadSnapshot } from 'tldraw'
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import 'tldraw/tldraw.css'

interface Props {
  slug: string
  height?: string
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; snapshot: unknown }

export default function CanvasEmbed({ slug, height = '500px' }: Props) {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function fetchCanvas() {
      const { data, error } = await supabase
        .from('canvases')
        .select('snapshot')
        .eq('slug', slug)
        .maybeSingle() 

      if (cancelled) return

      if (error || !data) {
        setLoadState({ status: 'error', message: error?.message ?? 'Canvas not found' })
        return
      }

      setLoadState({ status: 'ready', snapshot: data.snapshot })
    }

    fetchCanvas()
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
      <div style={{ width: '100%', height, minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--sl-color-gray-5)', borderRadius: '8px' }}>
        <span style={{ color: 'var(--sl-color-gray-3)', fontSize: '14px' }}>Loading canvas…</span>
      </div>
    )
  }

  if (loadState.status === 'error') {
    return (
      <div style={{ width: '100%', height: 'auto', padding: '16px', border: '1px solid var(--sl-color-red)', borderRadius: '8px' }}>
        <span style={{ color: 'var(--sl-color-red)', fontSize: '14px' }}>Failed to load canvas: {loadState.message}</span>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
    <div style={{ width: '100%', height, borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--sl-color-gray-5)' }}>
      <Tldraw
        store={store!}
        hideUi
        onMount={editor => {
          editor.updateInstanceState({ isReadonly: true }); 
          editor.zoomToFit();
        }}
      />
    </div>
    <a
      href={`/canvas/${slug}`}
      style={fullscreenLinkStyle}
      title="Open fullscreen"
    >
      ⤢
    </a>
  </div>
  )
}

const fullscreenLinkStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '10px', right: '10px',
  background: 'rgba(255,255,255,0.92)',
  border: '1px solid #e5e5e5',
  borderRadius: '6px',
  width: '28px', height: '28px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '16px', color: '#555',
  textDecoration: 'none',
  backdropFilter: 'blur(4px)',
  zIndex: 10,
}