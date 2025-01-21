import { ApiProperty } from "@nestjs/swagger";

export class StatusDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    color: string;
}

export class HistoryDTO {
    @ApiProperty()
    type: string;

    @ApiProperty()
    user: string;
}

export class MacchineDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    cep: string;
    
    @ApiProperty()
    address: string;

    @ApiProperty()
    complement: string;

    @ApiProperty()
    neighborhood: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    status: StatusDTO;

    @ApiProperty()
    history: HistoryDTO[];
}