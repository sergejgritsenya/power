import { PrismaClient } from "@prisma/client"
import { passwordHashing } from "../src/api/util/password-hashing"
import { inputPromt } from "./input-prompt"

const prisma = new PrismaClient()
const seed = async () => {
  try {
    const email = await inputPromt("Enter email: ")
    const name = await inputPromt("Enter name: ")
    const password = await inputPromt("Enter password: ")
    if (!email || !name || !password) {
      throw new Error("Incorrect input")
    }
    const hash_pass = passwordHashing(password)
    await prisma.admin.create({
      data: {
        email,
        name,
        password: {
          create: { password: hash_pass.hash },
        },
        salt: { create: { salt: hash_pass.salt } },
      },
    })
    console.log("Successfully created")
  } catch (e) {
    console.error(e)
  }
  await prisma.disconnect()
}

seed().finally(async () => {
  await prisma.disconnect()
})
