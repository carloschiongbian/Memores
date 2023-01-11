import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useBlocker } from './useBlocker'

// https://dev.to/bangash1996/detecting-user-leaving-page-with-react-router-dom-v602-33ni
export function useCallbackPrompt(when ) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPrompt, setShowPrompt] = useState(false)
  const [lastLocation, setLastLocation] = useState(null)
  const [confirmedNavigation, setConfirmedNavigation] = useState(false)

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false)
    setLastLocation(null)
  }, [])

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback((nextLocation) => {
      // in if condition we are checking next location and current location are equals or not
      if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
        setShowPrompt(true)
        setLastLocation(nextLocation)
        return false
      }
      return true
    },
    [confirmedNavigation, location]
  )

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false)
    setConfirmedNavigation(true)
  }, [])

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Remove the backdrop of the modal
      document.querySelector('.modal-backdrop')?.classList.remove('fade')
      document.querySelector('.modal-backdrop')?.classList.remove('show')
      document.querySelector('.modal-backdrop')?.remove()

      navigate(lastLocation.location?.pathname)

      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedNavigation, lastLocation])

  useBlocker(handleBlockedNavigation, when)

  return [showPrompt, confirmNavigation, cancelNavigation]
}