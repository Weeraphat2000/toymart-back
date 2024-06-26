import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: { userId: number; role: string }) {
    return this.jwtService.sign(payload);
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }
}
