import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInteraction1706456917761 implements MigrationInterface {
  name = 'CreateTableInteraction1706456917761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "interaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "interaction_type" character varying, "interaction_date" TIMESTAMP NOT NULL DEFAULT now(), "details" jsonb, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "leadIdId" uuid, CONSTRAINT "PK_9204371ccb2c9dab5428b406413" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "interaction" ADD CONSTRAINT "FK_32f2cd2473c3d9b9a40c1d7f978" FOREIGN KEY ("leadIdId") REFERENCES "lead"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "interaction" DROP CONSTRAINT "FK_32f2cd2473c3d9b9a40c1d7f978"`,
    );
    await queryRunner.query(`DROP TABLE "interaction"`);
  }
}
