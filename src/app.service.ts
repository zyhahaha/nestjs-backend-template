import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <form enctype="multipart/form-data" action="/spider/ispa/upload" method="post">
        <input type="file" name="file" id="">
        <input type="submit" value="Submit" />
      </form>
    `;
  }
  getDJH(): string {
    return `
      <form enctype="multipart/form-data" action="/spider/djh/upload" method="post">
        <input type="file" name="file" id="">
        <input type="submit" value="Submit" />
      </form>
    `;
  }
  getJDVSP(): string {
    return `
      <form enctype="multipart/form-data" action="/spider/jdvsp/upload" method="post">
        <input type="file" name="file" id="">
        <input type="submit" value="Submit" />
      </form>
    `;
  }
}
