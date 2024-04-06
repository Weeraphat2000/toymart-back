import * as bcrypt from 'bcrypt';

export class BcryptService {
  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  compareSync(password: string, hasdPassword: string) {
    return bcrypt.compareSync(password, hasdPassword);
  }
}
