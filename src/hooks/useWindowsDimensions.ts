import { useState, useEffect } from 'react'

type WidthType = number
type heightType = number

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window
    let widthType: WidthType = width
    let heightType: heightType = height
    return {
      width: widthType,
      height: heightType,
    }
  } else {
    return {
      width: 0,
      height: 0,
    }
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )
  const [hasMounted, setHasMounted] = useState(false) // <-- add this
  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [hasMounted])

  return windowDimensions
}
