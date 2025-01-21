import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { MacchineService } from './macchine.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MacchineDTO, StatusDTO } from './dto/response.dto';
import { CreateMacchineBody, FilterByNameParams } from './dto/request.dto';
import { TokenPayload } from '@/auth/auth.decorator';
import { PayloadTokenDTO } from '@/auth/dto/auth.dto';

@Controller('macchine')
@ApiTags('Macchine')
export class MacchineController {
  constructor(private readonly macchineService: MacchineService) {}

  @Get('filter-by-status/:id')
  @ApiOperation({
    summary:
      'Listar todas as Máquinas por Status', 
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: MacchineDTO,
  })
  async getMacchinesByStatus(
    @Param()
    { id }: { id: number },
  ): Promise<MacchineDTO[]> {
    try {
      const macchines = await this.macchineService.getMacchinesByStatus(id)

      return macchines;
    }
    catch(error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('filter-by-name')
  @ApiOperation({
    summary:
      'Listar todas as Máquinas por Nome', 
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: MacchineDTO,
  })
  async getMacchinesByName(
    @Query() params: FilterByNameParams
  ): Promise<MacchineDTO[]> {
    try {
      const macchines = await this.macchineService.getMacchinesByName(params)

      return macchines;
    }
    catch(error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('status')
  @ApiOperation({
    summary:
      'Listar todos os status da Máquina', 
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: StatusDTO,
  })
  async getMacchineStatus(): Promise<StatusDTO[]> {
    try {
      const status = await this.macchineService.getMacchineStatus()

      return status;
    }
    catch(error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('')
  @ApiOperation({
    summary:
      'Cadastrar uma máquina', 
  })
  @ApiResponse({
    status: 200
  })
  async createMacchine(
    @Body() body: CreateMacchineBody,
    @TokenPayload() user: PayloadTokenDTO
  ) {
    try {
      await this.macchineService.createMacchine(body, user)
    }
    catch(error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('delete/:id')
  @ApiOperation({
    summary:
      'Deletar uma máquina', 
  })
  @ApiResponse({
    status: 200
  })
  async deleteMacchine(
    @Param()
    { id }: { id: string },
    @TokenPayload() user: PayloadTokenDTO
  ) {
    try {
      await this.macchineService.deleteMacchine(id, user)
    }
    catch(error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
