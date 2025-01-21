import { ApiProperty } from "@nestjs/swagger";

export class EmployeeDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isActive: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}