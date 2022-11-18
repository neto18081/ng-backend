import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 } from "uuid"


@Entity("account")
export class Account {

  @PrimaryColumn()
  id: string;

  @Column()
  balance: number;

  constructor() { 
    if (!this.id) {
      this.id = v4();
      this.balance = 100;
    }
  }

}