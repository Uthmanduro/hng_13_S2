-- CreateTable
CREATE TABLE "AnalyzedString" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "is_palindrome" BOOLEAN NOT NULL,
    "unique_characters" INTEGER NOT NULL,
    "word_count" INTEGER NOT NULL,
    "sha256_hash" TEXT NOT NULL,
    "character_frequency_map" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyzedString_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalyzedString_value_key" ON "AnalyzedString"("value");

-- CreateIndex
CREATE UNIQUE INDEX "AnalyzedString_sha256_hash_key" ON "AnalyzedString"("sha256_hash");
