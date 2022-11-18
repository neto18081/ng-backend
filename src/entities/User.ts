import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Account } from "./Account";
import { v4 } from "uuid"


@Entity("user")
export class User {

  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  accountId: string;

  @OneToOne(() => Account)
  @JoinColumn({name: "accountId"})
  account: Account;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}