import { defineConfig, type Collection, type TinaField } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

/* Reusable field groups */
const sectionHead = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    { type: "string", name: "eyebrow", label: "Small label above the heading" },
    { type: "string", name: "title", label: "Heading", required: true },
    { type: "string", name: "text", label: "Intro text", ui: { component: "textarea" } },
  ],
});

const cta = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    { type: "string", name: "label", label: "Button label" },
    { type: "string", name: "href", label: "Link (e.g. /book-a-fit)" },
  ],
});

const singleton = { allowedActions: { create: false, delete: false } };

/* Collections */
const settings: Collection = {
  name: "settings",
  label: "Site settings",
  path: "content/settings",
  format: "json",
  ui: singleton,
  fields: [
    { type: "string", name: "siteName", label: "Site name", required: true },
    { type: "string", name: "tagline", label: "Tagline (used in search results and the footer)", ui: { component: "textarea" } },
    { type: "string", name: "email", label: "Contact email" },
    {
      type: "object",
      name: "address",
      label: "Address",
      fields: [
        { type: "string", name: "line1", label: "Line 1" },
        { type: "string", name: "line2", label: "Line 2" },
      ],
    },
    {
      type: "object",
      name: "nav",
      label: "Navigation",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        { type: "string", name: "label", label: "Label" },
        { type: "string", name: "href", label: "Link" },
      ],
    },
    cta("bookCta", "Book button"),
    {
      type: "object",
      name: "footerFits",
      label: "Footer: fits column",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        { type: "string", name: "label", label: "Label" },
        { type: "string", name: "href", label: "Link" },
      ],
    },
    {
      type: "object",
      name: "footerStudio",
      label: "Footer: studio column",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        { type: "string", name: "label", label: "Label" },
        { type: "string", name: "href", label: "Link" },
      ],
    },
    {
      type: "object",
      name: "legalLinks",
      label: "Footer: legal links",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        { type: "string", name: "label", label: "Label" },
        { type: "string", name: "href", label: "Link" },
      ],
    },
  ],
};

const home: Collection = {
  name: "home",
  label: "Home page",
  path: "content/pages",
  format: "json",
  match: { include: "home" },
  ui: singleton,
  fields: [
    {
      type: "object",
      name: "hero",
      label: "Hero",
      fields: [
        { type: "string", name: "eyebrow", label: "Small label" },
        { type: "string", name: "title", label: "Headline", required: true },
        { type: "string", name: "text", label: "Supporting text", ui: { component: "textarea" } },
        { type: "image", name: "image", label: "Background photo" },
        cta("primaryCta", "Primary button"),
        cta("secondaryCta", "Secondary button"),
      ],
    },
    {
      type: "object",
      name: "intro",
      label: "Intro (photo and text)",
      fields: [
        { type: "string", name: "eyebrow", label: "Small label" },
        { type: "string", name: "title", label: "Heading" },
        { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
        { type: "image", name: "image", label: "Photo" },
        { type: "string", name: "caption", label: "Photo caption" },
        {
          type: "object",
          name: "forks",
          label: "Choice tiles",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            { type: "string", name: "title", label: "Title" },
            { type: "string", name: "text", label: "Text" },
            { type: "string", name: "href", label: "Link" },
            { type: "boolean", name: "primary", label: "Orange (primary) tile" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "symptoms",
      label: "Symptoms section",
      fields: [
        { type: "string", name: "eyebrow", label: "Small label" },
        { type: "string", name: "title", label: "Heading" },
        { type: "string", name: "text", label: "Intro text", ui: { component: "textarea" } },
        {
          type: "object",
          name: "items",
          label: "Symptoms",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            { type: "string", name: "title", label: "Title" },
            { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
          ],
        },
        { type: "string", name: "note", label: "Closing note", ui: { component: "textarea" } },
      ],
    },
    sectionHead("finder", "Fit finder section"),
    {
      type: "object",
      name: "process",
      label: "Process section",
      fields: [
        { type: "string", name: "eyebrow", label: "Small label" },
        { type: "string", name: "title", label: "Heading" },
        { type: "string", name: "text", label: "Intro text", ui: { component: "textarea" } },
        {
          type: "object",
          name: "steps",
          label: "Steps",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            { type: "string", name: "time", label: "Timing (e.g. 20 minutes)" },
            { type: "string", name: "title", label: "Title" },
            { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
          ],
        },
        { type: "string", name: "analogy", label: "Pull quote", ui: { component: "textarea" } },
      ],
    },
    {
      type: "object",
      name: "faq",
      label: "FAQ section",
      fields: [
        { type: "string", name: "eyebrow", label: "Small label" },
        { type: "string", name: "title", label: "Heading" },
        {
          type: "object",
          name: "items",
          label: "Questions",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.question }) },
          fields: [
            { type: "string", name: "question", label: "Question" },
            { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
          ],
        },
      ],
    },
  ],
};

const technology: Collection = {
  name: "technology",
  label: "Fitting Technology page",
  path: "content/pages",
  format: "json",
  match: { include: "technology" },
  ui: singleton,
  fields: [
    sectionHead("head", "Page heading"),
    {
      type: "object",
      name: "tools",
      label: "Tools",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        { type: "string", name: "title", label: "Title" },
        {
          type: "string",
          name: "icon",
          label: "Icon",
          options: ["capture", "power", "fitbike", "measure"],
        },
        { type: "string", name: "text", label: "Short description", ui: { component: "textarea" } },
        { type: "string", name: "tellsUs", label: "Tells us", ui: { component: "textarea" } },
        { type: "string", name: "whyItMatters", label: "Why it matters", ui: { component: "textarea" } },
      ],
    },
    { type: "string", name: "note", label: "Note under the tools", ui: { component: "textarea" } },
    {
      type: "object",
      name: "rules",
      label: "Principles",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
      ],
    },
    {
      type: "object",
      name: "takehome",
      label: "What you take home",
      fields: [
        { type: "string", name: "eyebrow", label: "Small label" },
        { type: "string", name: "title", label: "Heading" },
        { type: "string", name: "text", label: "Intro text", ui: { component: "textarea" } },
        {
          type: "object",
          name: "items",
          label: "Items",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            { type: "string", name: "icon", label: "Icon", options: ["report", "coords", "clock", "check"] },
            { type: "string", name: "title", label: "Title" },
            { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
          ],
        },
        {
          type: "object",
          name: "guarantee",
          label: "Follow-up promise",
          fields: [
            { type: "string", name: "stamp", label: "Stamp text" },
            { type: "string", name: "title", label: "Title" },
            { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
          ],
        },
        {
          type: "object",
          name: "report",
          label: "Sample report",
          fields: [
            { type: "string", name: "title", label: "Title" },
            { type: "string", name: "subtitle", label: "Subtitle" },
            {
              type: "object",
              name: "rows",
              label: "Rows",
              list: true,
              ui: { itemProps: (item) => ({ label: item?.label }) },
              fields: [
                { type: "string", name: "label", label: "Measurement" },
                { type: "string", name: "value", label: "Value" },
                { type: "string", name: "delta", label: "Change note (e.g. was 758)" },
              ],
            },
            { type: "string", name: "footnote", label: "Footnote", ui: { component: "textarea" } },
          ],
        },
      ],
    },
    sectionHead("cta", "Closing call to action"),
  ],
};

const fits: Collection = {
  name: "fits",
  label: "Fits and pricing page",
  path: "content/pages",
  format: "json",
  match: { include: "fits" },
  ui: singleton,
  fields: [
    sectionHead("head", "Page heading"),
    { type: "string", name: "touchpointTitle", label: "Touchpoint sessions heading" },
    {
      type: "object",
      name: "included",
      label: "Every full fit includes",
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "text", label: "Subtitle" },
        { type: "string", name: "items", label: "Items", list: true },
      ],
    },
    sectionHead("cta", "Closing call to action"),
  ],
};

const book: Collection = {
  name: "book",
  label: "Book a fit page",
  path: "content/pages",
  format: "json",
  match: { include: "book" },
  ui: singleton,
  fields: [
    sectionHead("head", "Page heading"),
    { type: "string", name: "days", label: "Days offered (buttons)", list: true },
    { type: "string", name: "slotsHint", label: "Hint under the days" },
    { type: "string", name: "notesLabel", label: "Label for the notes box" },
    { type: "string", name: "notesPlaceholder", label: "Placeholder for the notes box" },
    { type: "string", name: "submitLabel", label: "Submit button label" },
    { type: "string", name: "paymentNote", label: "Note under the button" },
    { type: "string", name: "successTitle", label: "Success title" },
    { type: "string", name: "successText", label: "Success text", ui: { component: "textarea" } },
    {
      type: "object",
      name: "cards",
      label: "Side cards",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "lines", label: "Lines", list: true },
        { type: "string", name: "note", label: "Note under the lines" },
        { type: "boolean", name: "bulleted", label: "Show lines as bullets" },
      ],
    },
    { type: "image", name: "photo", label: "Studio photo" },
    { type: "string", name: "photoCaption", label: "Photo caption" },
  ],
};

const services: Collection = {
  name: "services",
  label: "Fit services",
  path: "content/services",
  format: "json",
  ui: {
    filename: {
      slugify: (values) => (values?.title || "service").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    },
  },
  fields: [
    { type: "string", name: "title", label: "Name", isTitle: true, required: true },
    { type: "string", name: "group", label: "Group", options: ["full", "touchpoint"], required: true },
    { type: "number", name: "order", label: "Sort order" },
    { type: "string", name: "badge", label: "Badge (optional)" },
    { type: "string", name: "duration", label: "Duration" },
    { type: "string", name: "bikeNote", label: "Bike note (e.g. Your bike)" },
    { type: "string", name: "disciplines", label: "Disciplines" },
    { type: "string", name: "bestFor", label: "Best for", ui: { component: "textarea" } },
    { type: "string", name: "includes", label: "What's included", list: true },
    { type: "string", name: "price", label: "Price (e.g. $395)" },
    { type: "string", name: "priceNote", label: "Price note" },
    { type: "string", name: "bookLabel", label: "Book button label" },
    { type: "boolean", name: "featured", label: "Featured (orange button)" },
  ],
};

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [settings, home, technology, fits, book, services],
  },
});
