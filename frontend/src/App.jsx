import React from 'react'
import {Button, ThemeProvider} from "@mui/material"
import { CustomerTheme } from './theme/CustomerTheme'
import Home from './customer/pages/Home'

const App = () => {
  return (
    <ThemeProvider theme={CustomerTheme}>
      <Home/>
    </ThemeProvider>
  )
}

export default App
