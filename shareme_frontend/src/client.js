import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Since Sanity Query Does Not Return Updated Data Consistently, we are using 'useCdn: false'.
// More info - https://stackoverflow.com/questions/74214001/sanity-query-does-not-return-updated-data-consistently
// More info - https://www.sanity.io/docs/api-cdn#da702944cd86
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: false,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
