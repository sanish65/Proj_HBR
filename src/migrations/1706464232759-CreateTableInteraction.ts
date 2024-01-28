import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInteraction1706464232759 implements MigrationInterface {
  name = 'CreateTableInteraction1706464232759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "interaction" ("interaction_id" SERIAL NOT NULL, "email" text NOT NULL, "interaction_type" character varying, "interaction_date" TIMESTAMP NOT NULL DEFAULT now(), "details" jsonb, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "leadIdLeadId" integer, CONSTRAINT "PK_6e54295edad28f6fcb7e0e4caf1" PRIMARY KEY ("interaction_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "interaction" ADD CONSTRAINT "FK_dc4e13f6a1f2976d5044a6437e0" FOREIGN KEY ("leadIdLeadId") REFERENCES "lead"("lead_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "interaction" DROP CONSTRAINT "FK_dc4e13f6a1f2976d5044a6437e0"`,
    );
    await queryRunner.query(`DROP TABLE "interaction"`);
  }
}
