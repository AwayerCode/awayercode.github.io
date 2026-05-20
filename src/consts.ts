import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Awayer's Blog",
  NUM_POSTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "从私有知识仓中筛选出来的公开文章集合。",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "关于技术、写作和长期思考的公开文章。",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/AwayerCode"
  }
];
