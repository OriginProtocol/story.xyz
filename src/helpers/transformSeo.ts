import { SeoFormatted, MetaSocialRaw } from "../components/types";

const transformSeo = (seoRes: {
  metaDescription: string;
  metaImage: {
    url: string;
  };
  metaTitle: string;
  structuredData: string;
  metaViewport: string;
  canonicalURL: string;
  metaSocial: MetaSocialRaw[];
}) => {
  if (!seoRes) return {};

  const seo: SeoFormatted = {
    metaTitle: seoRes.metaTitle,
    metaDescription: seoRes.metaDescription,
    shareImage: seoRes.metaImage || null,
    metaSocial: {},
  };

  if (seoRes.structuredData) {
    seo.structuredData = JSON.stringify(seoRes.structuredData);
  }

  if (seoRes.metaViewport) {
    seo.metaViewport = seoRes.metaViewport;
  }

  if (seoRes.canonicalURL) {
    seo.canonicalUrl = seoRes.canonicalURL;
  }

  if (seoRes.metaSocial) {
    seoRes.metaSocial.map((metaSoc) => {
      if (metaSoc.socialNetwork.toLowerCase() === "facebook") {
        seo.metaSocial.facebook = metaSoc;
      }
      if (metaSoc.socialNetwork.toLowerCase() === "twitter") {
        seo.metaSocial.twitter = metaSoc;
      }
    });
  }

  return seo;
};

export default transformSeo;
