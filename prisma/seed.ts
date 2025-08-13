import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Cria roles iniciais
  await prisma.role.deleteMany();

  await prisma.role.createMany({
    data: [
      { name: "ADMIN" },
      { name: "GERENTE" },
      { name: "JURIDICO" },
      { name: "CLIENTE" },
      { name: "FINANCEIRO" },
      { name: "FUNCIONARIO" },
      { name: "CONVIDADO" },
    ],
    skipDuplicates: true,
  });

  // Busca a role ADMIN
  const adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });
  if (!adminRole) throw new Error("Role ADMIN não encontrada");

  // Dados do admin (pode vir do .env)
  const adminEmail = process.env.ADMIN_EMAIL || "admin@empresa.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  // Verifica se admin já existe
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Cria usuário admin
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        password: hashedPassword,
        roleId: adminRole.id,
      },
    });

    console.log(`Usuário ADMIN criado: ${adminEmail}`);
  } else {
    console.log(`Usuário ADMIN já existe: ${adminEmail}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
