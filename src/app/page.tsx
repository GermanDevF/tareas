"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen flex items-center">
      <div className="grid max-w-screen-xl px-6 mx-auto lg:gap-16 xl:gap-20 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl dark:text-white">
            Experimento con next
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Este es un experimento con Next.js y Tailwind CSS. Aquí puedes
            aprender a crear aplicaciones web modernas y escalables utilizando
            estas tecnologías.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/login"
              className="px-6 py-3 text-white bg-blue-600 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md">
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 shadow-md">
              Registrarse
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:flex lg:col-span-5 justify-center">
          <Image
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="Mockup"
            width={500}
            height={500}
            className="drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
