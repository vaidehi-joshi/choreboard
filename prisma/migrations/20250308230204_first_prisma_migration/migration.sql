-- CreateTable
CREATE TABLE "Chore" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_to" JSONB,
    "chore_name" VARCHAR NOT NULL,
    "day" VARCHAR NOT NULL,
    "is_complete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Chore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonInfo" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "profile_pic" BYTEA,
    "points" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "PersonInfo_pkey" PRIMARY KEY ("id")
);
