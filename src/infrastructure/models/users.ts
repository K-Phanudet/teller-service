import { Entity, Column, BeforeInsert, BeforeUpdate, PrimaryColumn, ManyToOne } from "typeorm";
import * as bcrypt from "bcryptjs";

import { v4 as uuidv4 } from 'uuid';
import { User } from "../../domain/entities/user.entity.js";
import { RoleEntity } from "./roles.js";


@Entity("users")
export class UserEntity {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt)
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role!: RoleEntity;

  static fromEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id ?? uuidv4()
    userEntity.username = user.username;
    userEntity.password = user.password;
    userEntity.name = user.name
    userEntity.role = RoleEntity.fromEntity(user.role)

    return userEntity;
  }

  toEntity(): User {
    return new User({
      id: this.id.toString(),
      name: this.name,
      username: this.username,
      password: this.password,
      role: this.role
    });
  }
}
