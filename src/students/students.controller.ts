import { CreateStudentDto, UpdateStudentDto } from './dto/index';
import { IdParam } from './../base/params/index';
import { QueryParams } from './../base/dto/query-params.dto';
import { User, Student } from 'src/db/models';
import { GetUser } from './../auth/get-user.decorator';
import { ROLE } from './../constant/index';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Role } from 'src/guards/role.decorator';

@Controller('students')
export class StudentsController {
  public readonly service = new StudentsService();

  @Get('/me')
  @ApiBearerAuth()
  @Role(ROLE.CUSTOMER)
  @UsePipes(ValidationPipe)
  getMe(@GetUser() user: User): Promise<Student> {
    return this.service.getMe(user.id);
  }

  @Get()
  @UsePipes(ValidationPipe)
  getMany(@Query() query: QueryParams): Promise<{ results: Student[]; total }> {
    if (query.filter) {
      query.filter = JSON.parse(query.filter);
    }
    if (query.orderBy) {
      query.orderBy = JSON.parse(query.orderBy);
    }
    query.page = query.page || 1;
    query.perPage = query.perPage || 10;
    return this.service.getMany(query);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  getOne(@Param() params: IdParam): Promise<Student> {
    return this.service.getOne(params.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @Role(ROLE.CUSTOMER)
  createOne(@Body() payload: CreateStudentDto, @GetUser() user: User) {
    return this.service.createStudent(payload, user.id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateOne(
    @Body() payload: UpdateStudentDto,
    @Param() params: IdParam,
  ): Promise<Student> {
    return this.service.updateOne(params.id, payload);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deleteOne(@Param() params: IdParam): Promise<{ message: string }> {
    return this.service.deleteOne(params.id);
  }
}