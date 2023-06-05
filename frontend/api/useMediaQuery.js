import { create } from 'zustand'

const useMediaQuery = create((set, get) => ({
  mql: undefined,
  mobile: undefined,
  matches: undefined,
  init: (theme) => {
    const mediaQuery = theme?.components?.In4UILibs?.breakpoint ?? '@media screen and (max-width: 0px)'
    const mql = window.matchMedia(mediaQuery.substring(6))
    set({
      mql,
      mobile: mediaQuery,
      matches: mql.matches
    })
    mql.addEventListener('change', get().judge)
  },
  judge: () => {
    const matches = get().mql.matches
    set({
      matches
    })
  }
}))

export default useMediaQuery
