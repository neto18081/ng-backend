import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Account } from "./Account";
import { User } from "./User";


@Entity("transaction")
export class Transaction {
  
  @PrimaryColumn()
  id: string;

  @Column()
  debitedAccountId: string;

  // @ManyToOne(() => Account, (a) => a.id)
  // debitedAccount: Account;
  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn({ name: "debitedAccountId" })
  debitedAccount: User;

  @Column()
  creditedAccountId: string;

  // @ManyToOne(() => Account, (a) => a.id)
  // creditedAccount: Account;
  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn({ name: "creditedAccountId" })
  creditedAccount: User;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }

}