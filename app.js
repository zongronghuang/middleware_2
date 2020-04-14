const express = require('express')
const app = express()
const port = 3000

// 顯示所有
app.all('*', (req, res, next) => {
  const now = new Date()
  const today = now.toISOString()
  const time = today.substring(0, 10) + ' ' + today.substring(11, 19)
  const milliseconds = Date.now()

  const method = req.method
  const path = req.originalUrl

  // 避免顯示 favicon request
  if (path !== '/favicon.ico') {
    res.locals.reqInfo = { time, milliseconds, method, path }
    next('route')
  }
})

function showReqResInfo(reqInfo) {
  const resInfoMilliseconds = Date.now()

  console.log(`
    ${reqInfo.time} | 
    ${reqInfo.method} ${reqInfo.path} | 
    total: ${resInfoMilliseconds - reqInfo.milliseconds} ms
    `
  )
}


// 列出全部 Todo
app.get('/', (req, res) => {
  // console.log('res.locals', res.locals.reqInfo)
  res.send('列出全部 Todo')
  showReqResInfo(res.locals.reqInfo)
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
  showReqResInfo(res.locals.reqInfo)
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
  showReqResInfo(res.locals.reqInfo)
})

// 新增一筆  Todo
app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
  showReqResInfo(res.locals.reqInfo)
})

app.delete('/:id/delete', (req, res) => {
  res.send('刪除 Todo')
  showReqResInfo(res.locals.reqInfo)
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})