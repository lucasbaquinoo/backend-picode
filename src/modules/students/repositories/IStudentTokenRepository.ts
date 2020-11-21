import StudentToken from '../infra/typeorm/entities/StudentToken';

export default interface IUserTokenRepository {
  generate(student_id: string): Promise<StudentToken>;
  findByToken(token: string): Promise<StudentToken | undefined>;
}
