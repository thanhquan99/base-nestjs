import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseControllerCRUD } from 'src/base/base-controller-CRUD';
import { Permissions } from 'src/guards/permissions.decorator';
import { PermissionAction } from 'src/permissions/permission.entity';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { Showtime } from './showtimes.entity';
import { ShowtimesService } from './showtimes.service';

@Controller('showtimes')
export class ShowtimesController extends BaseControllerCRUD<Showtime> {
  constructor(service: ShowtimesService) {
    super(service);
  }

  @Post()
  @Permissions(PermissionAction.CREATE_SHOWTIME)
  @UsePipes(ValidationPipe)
  createOne(@Body() createDto: CreateShowtimeDto): Promise<Showtime> {
    return this.service.createOne(createDto);
  }

  @Patch('/:id')
  @Permissions(PermissionAction.UPDATE_SHOWTIME)
  @UsePipes(ValidationPipe)
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateShowtimeDto,
  ): Promise<Showtime> {
    return this.service.updateOne(id, updateDto);
  }

  @Delete('/:id')
  @Permissions(PermissionAction.DELETE_SHOWTIME)
  deleteOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void | { message: string }> {
    return this.service.deleteOne(id);
  }
}
