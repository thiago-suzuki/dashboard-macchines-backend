import { PG_WRITE_CONNECTION } from '@/config/db/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { EmployeeDTO } from './dto/response.dto';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class UserService {
    constructor(
        @Inject(PG_WRITE_CONNECTION) private conn: Pool
    ) {}

    async findByLogin(login: string): Promise<EmployeeDTO> {
        const params = [
            login
        ]

        const query = `
            SELECT * FROM employees WHERE username = $1
        `

        return await this.conn.query(query, params).then((result) => {
            return camelcaseKeys(result.rows[0]);
        });
    }
}
