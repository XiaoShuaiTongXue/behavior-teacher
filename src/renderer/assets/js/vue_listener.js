function startlisten (this_) {
  const net = require('net')
  // 1 引入模块
  var srcstr = null
  function analysis (str_) {
    let getstr = JSON.parse(str_)
    if (getstr['command'] === 'imgshow') {
      srcstr = 'data:image/jpg;base64,' + getstr['img']
      var element = document.getElementById('show')
      element.setAttribute('src', srcstr)
    } else if (getstr['command'] === 'sf') {
      alert('here')
      this_.seen_ = false
    } else if (getstr['command'] === 'addone') {
      alert('sadfgds')
    } else if (getstr['command'] === 'dangerous_act') {
      this_.seen_ = true
    }
    return 'got it, ' + str_
  }
  // 2 创建服务器
  let clientArr = []
  const server = net.createServer()
  // 3 绑定链接事件
  server.on('connection', (person) => {
    console.log(clientArr.length)
    // 记录链接的进程
    person.id = clientArr.length
    clientArr.push(person)
    person.setEncoding('utf8')
    // 客户socket进程绑定事件
    person.on('data', (chunk) => {
      clientArr.forEach((val) => {
        // 数据写入全部客户进程中
        // 数据在这里处理
        val.write(analysis(chunk))
      })
    })
    person.on('close', (p1) => {
      clientArr[p1.id] = null
    })
    person.on('error', (p1) => {
      clientArr[p1.id] = null
    })
  })
  server.listen(801)
}
export {startlisten}
