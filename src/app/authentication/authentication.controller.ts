import { Body, Controller, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserParamsDTO, SignInBody } from './dto/request.dto';
import { createUserResponseDTO, SignInResponseDTO } from './dto/response.dto';
import { Public } from '@/decorators/public-decorator';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post('create-user')
  @Public()
  @ApiOperation({
    summary:
      'Criar um usuário', 
  })
  @ApiResponse({
    status: 200,
    isArray: false,
    type: createUserResponseDTO,
  })
  async createUser(
    @Query() params: createUserParamsDTO
  ): Promise<createUserResponseDTO> {
      try {
        const user = await this.authenticationService.createUser(params)

        return user;
      }
      catch(error) {
        console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  }

  @Post('sign-in')
  @Public()
  @ApiOperation({
    summary:
      'Logar no Sistema', 
  })
  @ApiResponse({
    status: 200,
    isArray: false,
    type: SignInResponseDTO,
  })
  async signIn(
    @Body() body: SignInBody
  ): Promise<SignInResponseDTO> {
      try {
        const { username, password } = body;

        const user = await this.authenticationService.signIn(username, password)

        return user;
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
