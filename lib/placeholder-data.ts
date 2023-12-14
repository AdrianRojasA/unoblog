import type { Category, Post } from "@prisma/client";

export const status = "authenticated";

export const categories: Category[] = [
  {
    id: "1",
    title: "JavaScript",
    slug: "javascript",
    color: "#ffb04f45",
  },
  {
    id: "2",
    title: "Prisma",
    slug: "prisma",
    color: "#7fb88133",
  },
  {
    id: "3",
    title: "Next JS",
    slug: "next-js",
    color: "#d1d1d1",
  },
  {
    id: "4",
    title: "Next Auth",
    slug: "next-auth",
    color: "#5e4fff31",
  },
  {
    id: "5",
    title: "MongoDB",
    slug: "mongodb",
    color: "#adf7b6",
  },
  {
    id: "6",
    title: "React JS",
    slug: "react-js",
    color: "#61dafb",
  },
];

export const posts: Post[] = [
  {
    id: "1",
    createdAt: new Date("2021-01-01"),
    slug: "next-js",
    title: "Next JS",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptates.",
    img: "https://res.cloudinary.com/dgjbgcmqm/image/upload/v1702570211/images_q72scy.jpg",
    views: 100,
    catSlug: "next-js",
    userEmail: "p0h5y@example.com",
  },
  {
    id: "2",
    createdAt: new Date("2021-01-01"),
    slug: "next-js-with-prisma",
    title: "Next JS with Prisma",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptates.",
    img: "https://res.cloudinary.com/dgjbgcmqm/image/upload/v1702570212/images_1_cwztpn.jpg",
    views: 100,
    catSlug: "prisma",
    userEmail: "p0h5y@example.com",
  }
];
