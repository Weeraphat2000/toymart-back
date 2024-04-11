import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { UpdateWatchListDto } from './dto/update-watch-list.dto';
import { CustomRequest } from 'src/middleware/authendicate.service';

@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}

  @Get() // ✅
  getAllWatchList(@Request() req: CustomRequest) {
    return this.watchListService.findAllByUserId(req.user.id);
  }

  @Patch('/:productId') // ✅
  async list(
    @Request() req: CustomRequest,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const find = await this.watchListService.findProductByUserIdAndProductId(
      req.user.id,
      productId,
    );
    console.log(find, '*****');
    if (!find) {
      return this.watchListService.cteateWatchList(req.user.id, productId);
    }
    return this.watchListService.deleteWatchList(find.id);
  }
}
