-- AlterTable
CREATE SEQUENCE "public".alarm_id_seq;
ALTER TABLE "public"."Alarm" ALTER COLUMN "id" SET DEFAULT nextval('"public".alarm_id_seq'),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE "public".alarm_id_seq OWNED BY "public"."Alarm"."id";
