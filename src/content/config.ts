import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      duration: z.string().optional(),
      image: image().optional(),
      date: z
        .string()
        .or(z.date())
        .transform((val: string | number | Date) =>
          new Date(val).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        ),
      draft: z.boolean().default(false).optional(),
      tag: z.string().optional().optional(),
      link: z.string().optional(),
    }),
});

export const collections = { projects };
