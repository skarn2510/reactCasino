import { Avatar, Card, CardActions, CardContent, Modal, TextField } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CasinoIcon from '@material-ui/icons/Casino'
import React, { useEffect, useState } from 'react'
import TableResults from './Table'
import './index.css'

const usdConvert = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://casinoweb.com/">Casino Website</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  const classes = useStyles()
  const [userLogin, setLogin] = useState(false)
  const [user, setUser] = useState('')
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [balance, setBalance] = useState(localStorage.getItem('balance'))
  const [slot1, setSlot1] = useState(1)
  const [slot2, setSlot2] = useState(2)
  const [slot3, setSlot3] = useState(3)
  const [games, setGames] = useState([])

  useEffect(() => {
    localStorage.setItem('balance', 100)
    setBalance(parseFloat(localStorage.getItem('balance')))
    //eslint-disable-next-line
  }, []);

  /////Handlers/////
  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };
  
  const handleOpenLogin = () => {
    setOpenLogin(true)
  };

  const handleCloseLogin = () => {
    setOpenLogin(false)
  };

  const handleName = (value) => {
    setUser(value)
  }

  const handleLogin = () => {
    localStorage.setItem('userName', user)
    handleClose()
    setUser(user)
    setLogin(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('userName')
    setUser('')
    setLogin(false)
    handleCloseLogin()
  }
  /////////=============/////////

  const playButton = () => {
    const s1 = random()
    const s2 = random()
    const s3 = random()
    verifyResults(s1, s2, s3)
    setSlot1(s1)
    setSlot2(s2)
    setSlot3(s3)
    setGames(games.concat({id: games.length, slots: `${s1},${s2},${s3}`, time: getFormattedTime(new Date())}))
  }

  const random = () => {
    return Math.floor(
        Math.random() * (9 - 1) + 1
    )
  }

  function getFormattedTime(date) {
    let hours = normaliseDateToken(date.getHours())
    let minutes = normaliseDateToken(date.getMinutes())
    let seconds = normaliseDateToken(date.getSeconds())
    return `${hours}:${minutes}:${seconds}`
  }

  function normaliseDateToken(dateToken) {
    return dateToken < 10 ? `0${dateToken}` : `${dateToken}`
  }

  const verifyResults = (slot1, slot2, slot3) => {
    if (slot1 === slot2 || slot2 === slot3) {
      localStorage.setItem('balance', (balance - 0.5))
      setBalance((balance - 0.5))
      return;
    }
    if (slot1 === slot2 === slot3) {
      localStorage.setItem('balance', (balance + 4))
      setBalance((balance + 4))
      return;
    }
    if (slot1 + slot2 + slot3 === 777) {
      localStorage.setItem('balance', (balance + 9))
      setBalance((balance + 9))
      return;
    }
    localStorage.setItem('balance', (balance - 2));
    setBalance(balance - 2);
  }

  const fake777 = () => {
      setSlot1(7)
      setSlot2(7)
      setSlot3(7)
      localStorage.setItem('balance', balance + 10)
      setBalance((balance + 10))
      setGames(games.concat({id: games.length, slots: `7,7,7`, time: getFormattedTime(new Date())}))
  }

  const loginPaper = (
    <div style={modalStyle} className={classes.paper}>
        <Typography>Please type your name</Typography>
        <TextField 
              id="standard-basic" 
              label="name" 
              onChange={(e) => handleName(e.target.value)}
            />
        <br></br>
        <Button onClick={handleLogin} type="button" color="secondary">
        LogIn
      </Button>
        <Button onClick={handleCloseLogin} type="button" color="secondary">
        Cancel
      </Button>
    </div>
  )
  
  const gamePaper = (
    <div style={modalStyle} className={classes.paper}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
                {/* Card 1  */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography>{slot1}</Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
                {/* Card 2  */}
                <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography>{slot2}</Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
              {/* Card 3  */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography>{slot3}</Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            <Grid item xs={12} align="center" className={classes.avatar}>
                    <Button className={classes.button} size="small" variant='contained' color="primary" onClick={() => playButton()}>
                      PLAY
                    </Button>
                    <Button className={classes.button}size="small" variant='contained' color="secondary" onClick={() => fake777()}>
                      LUCKY 7
                    </Button>
                    <Button className={classes.button} size="small" variant='outlined' color="primary" onClick={handleClose}>
                      CLOSE
                    </Button>
                    </Grid>
          </Grid>
        </Container>
    </div>
  )

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        <Grid container direction='row' alignItems='center'>
          <Grid item container direction='row' alignItems='center' xs={4} >
              <CasinoIcon />
                <Typography variant="h6" color="inherit" noWrap>
                  onLine Casino
                </Typography>
          </Grid>
          <Grid item container direction='row' xs={8} justify='flex-end' alignItems='center'>
              {userLogin ? (
              <>
              <Typography>Hi {user}</Typography>
               <Avatar className={classes.avatar} alt="Avatar" src="/static/images/avatar/1.jpg" />
               <Button
               className={classes.avatar}
                      type="button"
                      variant="contained"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
              </>
             ) :
             <Grid item className={classes.avatar}>
                   <Button
                      type="button"
                      variant="contained"
                      onClick={handleOpenLogin}
                    >
                      Login
                    </Button>
                    <Modal
                      open={openLogin}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {loginPaper}
                    </Modal>
                </Grid>
            }
              <Typography>Balance: {usdConvert.format(balance)}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.content}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Let's Gamble
            </Typography>
            <Grid item align="center">
                   <Button
                      type="button"
                      variant="contained"
                      onClick={handleOpen}
                    >
                      Begin
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {gamePaper}
                    </Modal>
            </Grid>    
            <TableResults games={games} setGames={setGames}/>       
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          onLine Casino
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Some info about de app
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    minHeight: '72.9vh'
  },
  button: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default App;