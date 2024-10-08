import { Injectable } from '@nestjs/common';
import {
  UploadedFile,
} from '@nestjs/common';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { PassThrough } from 'stream';
import * as qiniu from 'qiniu';
import { generateUUID, getFileSuffix } from 'src/utils/index'
import sequelize from 'src/database/sequelize'; // 引入 Sequelize 实例

const config: any = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0; // 空间对应的机房
const accessKey = 'accessKey';
const secretKey = 'secretKey';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: 'nestjs-backend-template',
  expires: 7200,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

@Injectable()
export class FileService {
  createFileOSS(@UploadedFile() file: Express.Multer.File) {
    // console.log('==============>>>', file);
    // 创建一个bufferstream可读流
    const bufferStream = new PassThrough();
    bufferStream.end(file.buffer);
    const suffix = getFileSuffix(file.originalname)
    let fileName = generateUUID('file-', 'xxxxx-xxx-xxxxx')
    if (suffix) fileName = `${fileName}.${suffix}`

    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    const readableStream = bufferStream; // 可读的流
    formUploader.putStream(
      uploadToken,
      fileName,
      readableStream,
      putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode == 200) {
          console.log(respBody);
          this.createDbData(fileName, suffix, file.size)
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      },
    );

    return {
      code: 200,
      msg: '上传成功',
      file_name: fileName
    };
  }

  async createDbData(name, type, size) {
    const registerSQL = `
      INSERT INTO shop_file_map
        (name, type, size)
      VALUES
        ('${name}', '${type}', '${size}')
    `;
    try {
      await sequelize.query(registerSQL, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  // 本地上传
  createFileLocal(@UploadedFile() file: Express.Multer.File) {
    // console.log('==============>>>', file);
    const writeFile = createWriteStream(
      join(__dirname, '../..', 'upload', `${file.originalname}`),
    );
    writeFile.write(file.buffer);
    writeFile.end();

    return {
      code: 200,
      msg: '上传成功',
    };
  }
}
