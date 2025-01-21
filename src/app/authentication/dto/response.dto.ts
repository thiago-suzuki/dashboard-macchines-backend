import { ApiProperty } from "@nestjs/swagger";

export class EmployeeDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    isActive: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}

export class createUserResponseDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;
}

export class SignInResponseDTO {
    @ApiProperty({ type: EmployeeDTO })
    user: EmployeeDTO;
  
    @ApiProperty()
    token: string;
}