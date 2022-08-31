import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <form enctype="multipart/form-data" action="/file/upload" method="post">
        <input type="file" name="file" id="">
        <input type="submit" value="Submit" />
      </form>
    `;
  }
}
