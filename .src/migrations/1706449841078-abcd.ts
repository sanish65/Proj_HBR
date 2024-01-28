import { MigrationInterface, QueryRunner } from "typeorm";

export class Abcd1706449841078 implements MigrationInterface {
    name = 'Abcd1706449841078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lead" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lead_name" text NOT NULL, "email" text NOT NULL, "lead_status" character varying NOT NULL DEFAULT 'New', "source" character varying, "added_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, CONSTRAINT "PK_ca96c1888f7dcfccab72b72fffa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lead"`);
    }

}
