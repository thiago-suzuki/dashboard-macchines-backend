import { PG_WRITE_CONNECTION } from '@/config/db/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { MacchineDTO, StatusDTO } from './dto/response.dto';
import camelcaseKeys from 'camelcase-keys';
import { CreateMacchineBody, FilterByNameParams } from './dto/request.dto';
import { PayloadTokenDTO } from '@/auth/dto/auth.dto';


@Injectable()
export class MacchineService {
    constructor(
        @Inject(PG_WRITE_CONNECTION) private conn: Pool
    ) {}

    async getMacchinesByStatus(statusId: number): Promise<MacchineDTO[]> {
        const params = [statusId]

        const query = `
            select m.id, m."name", m.cep, m.address, m.complement, m.neighborhood, 
            m.city, m.state,
            jsonb_build_object(
                'id', s.id,
                'name', s."name",
                'description', s.description,
                'color', s.color 
            ) as status, 
            jsonb_agg(
                jsonb_build_object(
                    'type', mh."type",
                    'user', e."name" 
                ) 
            ) as "history" 
            from macchines m 
            left join macchines_history mh 
            on m.id = mh.macchine_id
            left join status s 
            on m.status_id = s.id
            left join employees e 
            on mh.employee_id = e.id
            where m.status_id = $1 and m.deleted_at is null
            group by m.id, s.id
            order by m.created_at asc
        `

        return await this.conn.query(query, params).then((result) => {
            return camelcaseKeys(result.rows);
        });
    }

    async getMacchinesByName(params: FilterByNameParams): Promise<MacchineDTO[]> {
        let formattedSearch = '';
        let paramsQuery: any[] = []
        
        if(params.name != '' && params.name != null) {
            formattedSearch = 'and m."name" ilike $1'
            paramsQuery.push(`%${params.name}%`)
        }

        const query = `
            select m.id, m."name", m.cep, m.address, m.complement, m.neighborhood, 
            m.city, m.state,
            jsonb_build_object(
                'id', s.id,
                'name', s."name",
                'description', s.description,
                'color', s.color 
            ) as status, 
            jsonb_agg(
                jsonb_build_object(
                    'type', mh."type",
                    'user', e."name" 
                ) 
            ) as "history" 
            from macchines m 
            left join macchines_history mh 
            on m.id = mh.macchine_id
            left join status s 
            on m.status_id = s.id
            left join employees e 
            on mh.employee_id = e.id
            where m.deleted_at is null
            ${formattedSearch}
            group by m.id, s.id
        `

        return await this.conn.query(query, paramsQuery).then((result) => {
            return camelcaseKeys(result.rows);
        });
    }

    async getMacchineStatus(): Promise<StatusDTO[]> {
        const query = `
            SELECT id, name, description, color FROM status ORDER by id asc
        `
        
        return await this.conn.query(query, []).then((result) => {
            return camelcaseKeys(result.rows);
        });
    }

    async createMacchine(body: CreateMacchineBody, user: PayloadTokenDTO) {
        const paramsNewMacchine = [
            body.name,
            body.cep,
            body.address,
            body.complement,
            body.neighborhood,
            body.city,
            body.state,
            body.statusId,
            user.id
        ]

        const queryNewMacchine = `
            INSERT INTO macchines ("name", cep, address, complement, neighborhood, city, state, status_id, created_by, updated_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9)
            RETURNING id
        `

        this.conn
            .query(queryNewMacchine, paramsNewMacchine)
            .then((async result => {
                const macchineId = result.rows[0].id;

                await this.createMacchineHistory(macchineId, 'INSERT', user.id);
            }))
            .catch((error) => {
                throw new Error(error)
            })
    }

    async deleteMacchine(id: string, user: PayloadTokenDTO) {
        const params = [
            id,
            user.id
        ]

        const query = `
            UPDATE macchines
            SET updated_by = $2,
            deleted_at = now(),
            updated_at = now()
            WHERE id = $1
        `

        this.conn
            .query(query, params)
            .then(( async () => {
                await this.createMacchineHistory(id, 'DELETE', user.id);
            }))
            .catch((error) => {
                throw new Error(error)
            })
    }

    
    async updateMacchine(body: CreateMacchineBody, macchineId: string, user: PayloadTokenDTO) {
        const paramsUpdateMacchine = [
            macchineId,
            body.name,
            body.cep,
            body.address,
            body.complement,
            body.neighborhood,
            body.city,
            body.state,
            body.statusId,
            user.id
        ]

        const queryUpdateMacchine = `
            UPDATE macchines
            SET "name" = $2,
            cep = $3,
            address = $4,
            complement = $5,
            neighborhood = $6,
            city = $7,
            state = $8,
            status_id = $9,
            updated_by = $10,
            updated_at = now()
            WHERE id = $1
        `

        this.conn
            .query(queryUpdateMacchine, paramsUpdateMacchine)
            .then((async () => {
                await this.createMacchineHistory(macchineId, 'UPDATE', user.id);
            }))
            .catch((error) => {
                throw new Error(error)
            })
    }

    async createMacchineHistory(macchineId: string, type: string, userId: number) {
        const params = [
            macchineId,
            type,
            userId
        ]

        const query = `
            INSERT INTO macchines_history (macchine_id, type, employee_id)
            VALUES ($1, $2, $3)
        `

        this.conn.query(query, params);
    }
}
