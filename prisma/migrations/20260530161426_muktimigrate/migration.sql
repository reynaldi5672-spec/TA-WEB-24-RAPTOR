-- CreateEnum
CREATE TYPE "DestinasiKategori" AS ENUM ('pantai', 'wisata_alam', 'wisata_kota', 'heritage', 'kuliner', 'adventure');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'editor', 'guest');

-- CreateTable
CREATE TABLE "Destinasi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar_url" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "is_viral" BOOLEAN NOT NULL DEFAULT false,
    "kategori" "DestinasiKategori" NOT NULL DEFAULT 'pantai',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destinasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Komentar" (
    "id" SERIAL NOT NULL,
    "destinasi_id" INTEGER NOT NULL,
    "nama_user" TEXT NOT NULL,
    "isi_komentar" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Komentar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Komentar_destinasi_id_idx" ON "Komentar"("destinasi_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Komentar" ADD CONSTRAINT "Komentar_destinasi_id_fkey" FOREIGN KEY ("destinasi_id") REFERENCES "Destinasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
