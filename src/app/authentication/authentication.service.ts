import { PG_WRITE_CONNECTION } from '@/config/db/constants';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Pool } from 'pg';
import { createUserParamsDTO } from './dto/request.dto';
import * as bcrypt from 'bcrypt';
import camelcaseKeys from 'camelcase-keys';
import { createUserResponseDTO, EmployeeDTO, SignInResponseDTO } from './dto/response.dto';
import { UserService } from '@/app/user/user.service';
import { isPasswordValid } from '@/utils/is-password-valid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        @Inject(PG_WRITE_CONNECTION) private conn: Pool,
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async createUser(user: createUserParamsDTO): Promise<createUserResponseDTO> {
        const passwordEncrypted = await bcrypt.hash(user.password, 10);

        const params = [
            user.name,
            user.username,
            passwordEncrypted
        ]

        const query = `
            INSERT INTO employees (
                "name",
                "username",
                "password"
            )
            VALUES ($1, lower($2), $3)
            RETURNING *;
        `

        return await this.conn.query(query, params).then((result) => {
            return camelcaseKeys(result.rows[0]);
        });
    }

    async signIn(username: string, password: string): Promise<SignInResponseDTO> {
        const user = await this.userService.findByLogin(username);

        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isMatch = await isPasswordValid(password, user.password);

        if (!isMatch) throw new UnauthorizedException("Invalid credentials");

        const token = await this.generateToken(user);

        const { password: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token
        };
    }

    async generateToken(user: EmployeeDTO): Promise<string> {
        const secret = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBK"
    
        const token = await this.jwtService.signAsync(
          {
            id: user.id,
            name: user.name,
            username: user.username
          },
          {
            privateKey: secret,
            algorithm: "HS256",
          },
        );
    
        return token;
    }
    
}
