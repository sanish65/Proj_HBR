import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLead1706464206245 implements MigrationInterface {
  name = 'CreateTableLead1706464206245';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lead" ("lead_id" SERIAL NOT NULL, "lead_name" text NOT NULL, "email" text NOT NULL, "lead_status" character varying NOT NULL DEFAULT 'New', "source" character varying, "added_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, CONSTRAINT "PK_491ed05f22984fa1bf35323f37b" PRIMARY KEY ("lead_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lead"`);
  }
}
