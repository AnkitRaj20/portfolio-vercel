"use client";
import React, { useState } from "react";

const DEVICON_MAP: Record<string, string> = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "react.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  vue: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  nuxt: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  html5: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  css3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  express: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  fastify: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  kafka: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
};

export const DevIcon = ({ name, className = "w-5 h-5", size = 20 }: { name: string; className?: string; size?: number }) => {
  const [hasError, setHasError] = useState(false);
  const normalizedKey = name.trim().toLowerCase();
  const iconUrl = DEVICON_MAP[normalizedKey];

  if (!iconUrl || hasError) {
    return (
      <span
        className={`inline-flex items-center justify-center font-mono font-bold text-xs uppercase bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded ${className}`}
        style={{ width: size, height: size }}
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={iconUrl}
      alt={name}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};
