import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

const stringField = (name: string, label?: string, group?: string, required = false) => ({
  name,
  label: label || name,
  type: "string",
  required,
  group,
});

const textField = (name: string, label?: string, group?: string, required = false) => ({
  name,
  label: label || name,
  type: "text",
  required,
  group,
});

const imageField = (name: string, label?: string, group?: string) => ({
  name,
  label: label || name,
  type: "image",
  group,
});

const booleanField = (name: string, label?: string, group?: string) => ({
  name,
  label: label || name,
  type: "boolean",
  group,
});

const objectField = (name: string, label: string, fields: any[], group?: string) => ({
  name,
  label,
  type: "object",
  fields,
  group,
});

const listField = (name: string, label: string, fields: any[] | null, group?: string) => ({
  name,
  label,
  type: "list",
  group,
  items: fields ? { type: "object", fields } : { type: "string" },
});

const mediaFields = [
  imageField("image", "Image"),
  stringField("alt", "Alt text"),
];

const serviceFields = [
  stringField("short", "Short label"),
  stringField("title", "Title"),
  textField("text", "Text"),
  imageField("image", "Image"),
  stringField("videoUrl", "Video URL"),
];

const cardFields = [
  stringField("title", "Title"),
  textField("text", "Text"),
  imageField("image", "Image"),
];

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "20",
  devCommand: "npx serve . --listen {PORT}",
  experimental: {
    ssg: {
      name: "Static HTML",
      logPatterns: {
        up: ["Accepting connections"],
      },
    },
  },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["."],
      assetsConfig: {
        referenceType: "static",
        staticDir: "assets",
        uploadDir: "uploads",
        publicPath: "/assets",
      },
      models: [
        {
          name: "WebsiteContent",
          label: "AimAze Website Content",
          type: "page",
          urlPath: "/",
          filePath: "content.json",
          fieldGroups: [
            { name: "brand", label: "Brand", icon: "user" },
            { name: "design", label: "Design", icon: "palette" },
            { name: "pages", label: "Pages", icon: "page" },
            { name: "media", label: "Media", icon: "image" },
            { name: "conversion", label: "Forms", icon: "form" },
          ],
          fields: [
            objectField("site", "Site / Brand", [
              stringField("title", "Browser title"),
              textField("description", "SEO description"),
              stringField("domain", "Domain"),
              imageField("logo", "Logo"),
              imageField("ogImage", "Social share image"),
              stringField("email", "Contact email"),
              stringField("footerText", "Footer text"),
            ], "brand"),
            objectField("theme", "Theme Colors", [
              stringField("cyan", "Cyan"),
              stringField("blue", "Blue"),
              stringField("orange", "Orange"),
              stringField("purple", "Purple"),
              stringField("ink", "Dark text"),
              stringField("text", "Body text"),
              stringField("muted", "Muted text"),
              stringField("soft", "Soft background"),
            ], "design"),
            objectField("typography", "Typography / Fonts", [
              stringField("googleFontUrl", "Google Font CSS URL"),
              stringField("bodyFont", "Body font family"),
              stringField("headingFont", "Heading font family"),
              stringField("bodySize", "Base body size"),
              stringField("topStripSize", "Top strip size"),
              stringField("navSize", "Navigation size"),
              stringField("eyebrowSize", "Small label size"),
              stringField("heroTitleMin", "Hero title minimum"),
              stringField("heroTitleMax", "Hero title maximum"),
              stringField("heroCopySize", "Hero paragraph size"),
              stringField("pageTitleMin", "Page title minimum"),
              stringField("pageTitleMax", "Page title maximum"),
              stringField("sectionTitleMin", "Section heading minimum"),
              stringField("sectionTitleMax", "Section heading maximum"),
              stringField("paragraphSize", "Paragraph size"),
              stringField("cardTitleSize", "Card title size"),
              stringField("cardTextSize", "Card text size"),
              stringField("tagSize", "Tag / pill size"),
              stringField("statsValueMin", "Stats number minimum"),
              stringField("statsValueMax", "Stats number maximum"),
              stringField("statsLabelSize", "Stats label size"),
              stringField("buttonSize", "Button size"),
              stringField("formSize", "Form size"),
              stringField("footerSize", "Footer size"),
            ], "design"),
            objectField("sections", "Section Visibility", [
              booleanField("about", "Show About"),
              booleanField("problems", "Show Operational Challenges"),
              booleanField("platform", "Show Odoo Platform"),
              booleanField("stats", "Show Stats"),
              booleanField("services", "Show Services"),
              booleanField("industries", "Show Industries"),
              booleanField("process", "Show Process"),
              booleanField("video", "Show Video"),
              booleanField("gallery", "Show Gallery"),
              booleanField("testimonials", "Show Testimonials"),
              booleanField("caseStudies", "Show Case Studies"),
              booleanField("blog", "Show Blog"),
              booleanField("faq", "Show FAQ"),
              booleanField("contact", "Show Contact"),
              booleanField("customSections", "Show Custom Sections"),
            ], "pages"),
            objectField("topStrip", "Top Strip", [
              stringField("text", "Text"),
              stringField("linkText", "Link text"),
              stringField("linkHref", "Link URL"),
            ], "pages"),
            listField("navigation", "Navigation", [
              stringField("label", "Label"),
              stringField("href", "Link URL"),
            ], "pages"),
            objectField("hero", "Hero", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              textField("copy", "Copy"),
              listField("points", "Points", null),
              objectField("primaryButton", "Primary button", [
                stringField("label", "Label"),
                stringField("href", "Link URL"),
              ]),
              objectField("secondaryButton", "Secondary button", [
                stringField("label", "Label"),
                stringField("href", "Link URL"),
              ]),
              imageField("image", "Hero image"),
              imageField("backgroundImage", "Hero background image"),
              stringField("imageAlt", "Hero image alt text"),
              stringField("cardTitle", "Card title"),
              stringField("cardText", "Card text"),
              stringField("videoUrl", "Hero video URL"),
              listField("gallery", "Extra hero images", mediaFields),
            ], "media"),
            objectField("about", "About", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              listField("paragraphs", "Paragraphs", null),
            ], "pages"),
            objectField("problems", "Operational Challenges", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              textField("copy", "Copy"),
              listField("items", "Items", [
                stringField("number", "Number"),
                stringField("title", "Title"),
                textField("text", "Text"),
              ]),
            ], "pages"),
            objectField("platform", "Odoo Platform", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              textField("copy", "Copy"),
              listField("bullets", "Bullets", null),
              stringField("guideEyebrow", "Guide eyebrow"),
              stringField("guideTitle", "Guide title"),
              listField("guideItems", "Guide items", [
                stringField("title", "Title"),
                stringField("text", "Text"),
              ]),
            ], "pages"),
            listField("stats", "Stats", [
              stringField("value", "Value"),
              stringField("label", "Label"),
            ], "pages"),
            objectField("services", "Services", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              textField("copy", "Copy"),
              listField("items", "Service cards", serviceFields),
            ], "pages"),
            objectField("industries", "Industries", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              listField("items", "Industries", null),
            ], "pages"),
            objectField("process", "Process", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              listField("items", "Steps", [
                stringField("title", "Title"),
                textField("text", "Text"),
              ]),
            ], "pages"),
            objectField("video", "Video Section", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              textField("copy", "Copy"),
              stringField("videoUrl", "Video URL"),
              imageField("posterImage", "Poster image"),
            ], "media"),
            objectField("gallery", "Gallery / Portfolio", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              textField("copy", "Copy"),
              listField("items", "Gallery items", cardFields),
            ], "media"),
            objectField("testimonials", "Testimonials", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              listField("items", "Testimonials", [
                textField("quote", "Quote"),
                stringField("name", "Name"),
                stringField("role", "Role / company"),
                imageField("image", "Photo"),
              ]),
            ], "pages"),
            objectField("caseStudies", "Case Studies", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              listField("items", "Case studies", [
                stringField("title", "Title"),
                stringField("industry", "Industry"),
                textField("summary", "Summary"),
                stringField("result", "Result"),
                imageField("image", "Image"),
              ]),
            ], "pages"),
            objectField("blog", "Blog / News", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              listField("items", "Posts", [
                stringField("title", "Title"),
                stringField("date", "Date"),
                stringField("category", "Category"),
                textField("excerpt", "Excerpt"),
                imageField("image", "Image"),
                stringField("link", "Read more link"),
              ]),
            ], "pages"),
            objectField("faq", "FAQ", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              listField("items", "Questions", [
                stringField("question", "Question"),
                textField("answer", "Answer"),
              ]),
            ], "pages"),
            listField("customSections", "Custom Sections", [
              booleanField("enabled", "Enabled"),
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              textField("copy", "Copy"),
              imageField("image", "Image"),
              stringField("videoUrl", "Video URL"),
              listField("items", "Items", [
                stringField("title", "Title"),
                textField("text", "Text"),
              ]),
            ], "pages"),
            objectField("contact", "Contact", [
              stringField("eyebrow", "Eyebrow"),
              stringField("title", "Title"),
              textField("copy", "Copy"),
              stringField("formButton", "Form button"),
            ], "conversion"),
          ],
        },
      ],
    }),
  ],
});
