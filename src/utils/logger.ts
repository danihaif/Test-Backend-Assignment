import dayjs from 'dayjs'

const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty'
  },
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()} "`
})

export default logger;