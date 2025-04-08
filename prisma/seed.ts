import { db } from "@/lib/prisma";
import { parseArgs } from "node:util";
import { seedAmbientes, seedEstados, seedTiposDeTarea } from "./data-seed";

const options = {
  environment: { type: "string" as const },
};

const ENVIRONMENTS = {
  DEVELOPMENT: "development",
  TEST: "test",
};

const MESSAGES = {
  SEEDING_DEVELOPMENT: "Seeding development data...",
};

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options });

  try {
    switch (environment) {
      case ENVIRONMENTS.DEVELOPMENT:
        console.log(MESSAGES.SEEDING_DEVELOPMENT);
        await seedTiposDeTarea();
        await seedAmbientes();
        await seedEstados();
        break;
      case ENVIRONMENTS.TEST:
        // Data for your test environment
        break;
      default:
        console.warn("No valid environment specified.");
        break;
    }
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await db.$disconnect();
  }
}

main().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(1);
});
