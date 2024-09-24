import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('文件上传')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // OSS上传
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return await this.fileService.createFileOSS(file);
  // }

  // 本地上传
  @Post('/local/upload')
  @UseInterceptors(FileInterceptor('file'))
  async localUploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.createFileLocal(file)
  }
}
