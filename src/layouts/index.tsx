import React from 'react'
import { Outlet } from 'umi'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import AddCardIcon from '@mui/icons-material/AddCard'
import LineAxisRoundedIcon from '@mui/icons-material/LineAxisRounded'
import Paper from '@mui/material/Paper'
import styles from './index.less'

const darkTheme = createTheme({
  palette: { mode: 'light' },
})

export default function Layout() {
  const [value, setValue] = React.useState(0)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={styles.navs}>
        <Outlet />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
          >
            <BottomNavigationAction label="清单" icon={<AccountBalanceWalletOutlinedIcon />} />
            <BottomNavigationAction label="记账" icon={<AddCardIcon />} />
            <BottomNavigationAction label="趋势" icon={<LineAxisRoundedIcon />} />
          </BottomNavigation>
        </Paper>
      </div>
    </ThemeProvider>
  )
}
