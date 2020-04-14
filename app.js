const express = require('express')
const app = express()
const port = 3000

// 紀錄 req 的資訊
app.all('*', (req, res, next) => {
  const today = new Date()
  const method = req.method
  const path = req.originalUrl

  // 避免傳送 favicon request
  if (path !== '/favicon.ico') {
    res.locals.startInfo = { today, method, path }
    next('route')
  }
})

// 顯示 req 到 res 的資訊
function showProcessInfo(startInfo) {
  const endMs = Date.now()

  const today = startInfo.today
  const startTime = today.toISOString().substring(0, 10) + ' ' + today.toISOString().substring(11, 19)
  const startMs = today.getTime()

  console.log(`${startTime} | ${startInfo.method} from ${startInfo.path} | total time: ${endMs - startMs} ms`)
}

// 列出全部 Todo
app.get('/', (req, res) => {
  res.send('列出全部 Todo')
  showProcessInfo(res.locals.startInfo)
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
  showProcessInfo(res.locals.startInfo)
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
  showProcessInfo(res.locals.startInfo)
})

// 新增一筆  Todo
app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
  showProcessInfo(res.locals.startInfo)
})

app.delete('/:id/delete', (req, res) => {
  res.send('刪除 Todo')
  showProcessInfo(res.locals.startInfo)
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})