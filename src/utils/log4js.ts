import * as Path from 'path';
import * as StackTrace from 'stacktrace-js';

const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new ElasticsearchTransport({
      level: 'debug',
      clientOpts: {
        node: 'http://43.143.122.98:9222',
        // auth: {
        //   username: '用户名',
        //   password: '密码'
        // }
      },
      index: 'nestjs',  
    }),
  ],
});

export class Logger {
  static debug(logMsg) {
    const msg = `${Logger.getStackTrace()}${logMsg}`
    logger.debug(msg);
  }

  static log(logMsg) {
    const msg = `${Logger.getStackTrace()}${logMsg}`
    logger.info(msg);
  }

  static info(logMsg) {
    const msg = `${Logger.getStackTrace()}${logMsg}`
    logger.info(msg);
  }

  static warn(logMsg) {
    const msg = `${Logger.getStackTrace()}${logMsg}`
    logger.warn(msg);
  }

  static error(logMsg) {
    const msg = `${Logger.getStackTrace()}${logMsg}`
    logger.error(msg);
  }

  static access(logMsg) {
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
