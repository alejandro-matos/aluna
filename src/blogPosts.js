const postFiles = import.meta.glob("./blog/*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const parseFrontmatter = (source) => {
  const match = source.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: source.trim() };
  }

  const data = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [key, ...valueParts] = line.split(":");
        const value = valueParts.join(":").trim().replace(/^"|"$/g, "");
        return [key.trim(), value];
      })
  );

  return { data, content: match[2].trim() };
};

const markdownToBlocks = (content) =>
  content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return { type: "heading", text: block.replace(/^##\s+/, "") };
      }

      return { type: "paragraph", text: block };
    });

const pathParts = (path) => {
  const parts = path.split("/");
  const fileName = parts.pop();

  return {
    language: parts.pop(),
    slug: fileName.replace(/\.md$/, ""),
  };
};

export const blogPosts = Object.entries(postFiles)
  .map(([path, source]) => {
    const { data, content } = parseFrontmatter(source);
    const { language, slug } = pathParts(path);

    return {
      language,
      slug,
      translationKey: data.translationKey || slug,
      title: data.title,
      text: data.summary,
      date: data.date,
      blocks: markdownToBlocks(content),
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getBlogPosts = (language) =>
  blogPosts.filter((post) => post.language === language);

export const getBlogPost = (language, slug) =>
  blogPosts.find((post) => post.language === language && post.slug === slug);

export const getBlogPostByKey = (language, translationKey) =>
  blogPosts.find(
    (post) =>
      post.language === language && post.translationKey === translationKey
  );
