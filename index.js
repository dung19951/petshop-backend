import session from "express-session";






app.set('trust proxy', 1)
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}))



app.use('/', (req, res) => {
  res.send('abc')
})

