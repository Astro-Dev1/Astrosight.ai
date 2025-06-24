const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs'); // Import the bcryptjs hash function

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await hash('Astro@2098', 10); // Replace with your desired password
    const newUser = await prisma.user.create({
    data: {
      username: 'admin',                // Replace with your desired username
      email: 'admin@astroanswer.co',       // Replace with the user's email
      password: hashedPassword,    // Replace with a hashed password if needed
      role: 'ADMIN',                    // Role (e.g., ADMIN, EDITOR, etc.)
    },
  });

  console.log('User successfully created:', newUser);
}

// Run the script
main()
  .catch((e) => {
    console.error('Error creating user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
