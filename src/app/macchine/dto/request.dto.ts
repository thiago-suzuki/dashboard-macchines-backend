import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMacchineBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cep: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  complement: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  state: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  statusId: number;
}

export class FilterByNameParams {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;
}