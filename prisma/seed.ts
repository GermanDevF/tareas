import { db } from "@/lib/prisma";
import { parseArgs } from "node:util";

const options = {
  environment: { type: "string" as const },
};

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options });

  switch (environment) {
    case "development":
      console.log("Seeding development data...");

      break;
    case "test":
      /** data for your test environment */
      break;
    default:
      break;
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
