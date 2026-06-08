-- CreateTable
CREATE TABLE "destinasi" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "lokasi" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar_url" TEXT NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 4.5,
    "is_viral" BOOLEAN DEFAULT false,
    "kategori" VARCHAR(50) DEFAULT 'pantai',

    CONSTRAINT "destinasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "komentar" (
    "id" SERIAL NOT NULL,
    "destinasi_id" INTEGER NOT NULL,
    "nama_user" VARCHAR(100) NOT NULL DEFAULT 'Anonim',
    "isi_komentar" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "komentar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "role" VARCHAR(20) DEFAULT 'admin',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "komentar" ADD CONSTRAINT "fk_destinasi" FOREIGN KEY ("destinasi_id") REFERENCES "destinasi"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
