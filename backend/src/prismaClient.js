import {PrismaClient} from "../generated/prisma/index.js";
// const { PrismaClient } = pkg;

console.log("Initializing Prisma client...");
const prisma = new PrismaClient();
console.log("Prisma client initialized!");

export {prisma};