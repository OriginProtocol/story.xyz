type Collection = {
  id: number,
  attributes: {
    details: {
      id: number,
      Card: {
        id: number,
        title: string,
        description: string,
        linkDisplay: string,
        linkURL: string
      },
      cover: {
        data: {
          attributes: {
            name: string
            alternativeText: string
            caption: string
            width: string
            height: string
            formats: {
              large: {
                url: string
              }
              medium: {
                url: string
              }
              small: {
                url: string
              }
              thumbnail: {
                url: string
              }
            }
            url: string
          }
        }
      }
      thumbnail: {
        data: {
          attributes: {
            name: string
            alternativeText: string
            caption: string
            width: string
            height: string
            formats: {
              thumbnail: {
                url: string
              }
            }
            url: string
          }
        }
      }
    }
  }
}

const transformCollections = (collections: Collection[]) => {
  return collections.map((collection) => {
    return {
      webProperty: 'story',
      title: collection.attributes.details.Card.title,
      body: collection.attributes.details.Card.description,
      linkText: collection.attributes.details.Card.linkDisplay,
      linkHref: collection.attributes.details.Card.linkURL,
      imgSrc: collection.attributes.details.cover.data.attributes.formats.large.url,
      imgAlt: collection.attributes.details.cover.data.attributes.alternativeText,
      thumbnailSrc: collection.attributes.details.thumbnail.data.attributes.formats.thumbnail.url,
      thumbnailAlt: collection.attributes.details.thumbnail.data.attributes.alternativeText
    }
  })
}

export default transformCollections

/*
{
  "id": 1,
  "attributes": {
      "slug": "lucky-ducky-nfts",
      "createdAt": "2022-09-26T15:41:06.700Z",
      "updatedAt": "2022-09-26T15:41:13.435Z",
      "publishedAt": "2022-09-26T15:41:13.429Z",
      "locale": "en",
      "details": {
          "id": 1,
          "Card": {
              "id": 1,
              "title": "Lucky Ducky NFTs",
              "description": "7,777 Lucky Duckies have left the pond and are getting into mischief!",
              "linkDisplay": "Visit luckyducky.xyz/market",
              "linkURL": "https://luckyducky.xyz/market"
          },
          "cover": {
              "data": {
                  "id": 31,
                  "attributes": {
                      "name": "lucky-ducky-nfts.jpg",
                      "alternativeText": "lucky-ducky-nfts.jpg",
                      "caption": "lucky-ducky-nfts.jpg",
                      "width": 1020,
                      "height": 680,
                      "formats": {
                          "large": {
                              "ext": ".jpg",
                              "url": "https://cmsmediaproduction.s3.amazonaws.com/large_lucky_ducky_nfts_9cecbcc92f.jpg",
                              "hash": "large_lucky_ducky_nfts_9cecbcc92f",
                              "mime": "image/jpeg",
                              "name": "large_lucky-ducky-nfts.jpg",
                              "path": null,
                              "size": 113.31,
                              "width": 1000,
                              "height": 667
                          },
                          "small": {
                              "ext": ".jpg",
                              "url": "https://cmsmediaproduction.s3.amazonaws.com/small_lucky_ducky_nfts_9cecbcc92f.jpg",
                              "hash": "small_lucky_ducky_nfts_9cecbcc92f",
                              "mime": "image/jpeg",
                              "name": "small_lucky-ducky-nfts.jpg",
                              "path": null,
                              "size": 43.06,
                              "width": 500,
                              "height": 333
                          },
                          "medium": {
                              "ext": ".jpg",
                              "url": "https://cmsmediaproduction.s3.amazonaws.com/medium_lucky_ducky_nfts_9cecbcc92f.jpg",
                              "hash": "medium_lucky_ducky_nfts_9cecbcc92f",
                              "mime": "image/jpeg",
                              "name": "medium_lucky-ducky-nfts.jpg",
                              "path": null,
                              "size": 75.54,
                              "width": 750,
                              "height": 500
                          },
                          "thumbnail": {
                              "ext": ".jpg",
                              "url": "https://cmsmediaproduction.s3.amazonaws.com/thumbnail_lucky_ducky_nfts_9cecbcc92f.jpg",
                              "hash": "thumbnail_lucky_ducky_nfts_9cecbcc92f",
                              "mime": "image/jpeg",
                              "name": "thumbnail_lucky-ducky-nfts.jpg",
                              "path": null,
                              "size": 13.86,
                              "width": 234,
                              "height": 156
                          }
                      },
                      "hash": "lucky_ducky_nfts_9cecbcc92f",
                      "ext": ".jpg",
                      "mime": "image/jpeg",
                      "size": 118.56,
                      "url": "https://cmsmediaproduction.s3.amazonaws.com/lucky_ducky_nfts_9cecbcc92f.jpg",
                      "previewUrl": null,
                      "provider": "aws-s3",
                      "provider_metadata": null,
                      "createdAt": "2022-09-26T15:39:55.696Z",
                      "updatedAt": "2022-09-26T15:39:55.696Z"
                  }
              }
          },
          "thumbnail": {
              "data": {
                  "id": 32,
                  "attributes": {
                      "name": "lucky-ducky-nfts-thumbnail.jpg",
                      "alternativeText": "lucky-ducky-nfts-thumbnail.jpg",
                      "caption": "lucky-ducky-nfts-thumbnail.jpg",
                      "width": 256,
                      "height": 256,
                      "formats": {
                          "thumbnail": {
                              "ext": ".jpg",
                              "url": "https://cmsmediaproduction.s3.amazonaws.com/thumbnail_lucky_ducky_nfts_thumbnail_7117e3f34a.jpg",
                              "hash": "thumbnail_lucky_ducky_nfts_thumbnail_7117e3f34a",
                              "mime": "image/jpeg",
                              "name": "thumbnail_lucky-ducky-nfts-thumbnail.jpg",
                              "path": null,
                              "size": 3.95,
                              "width": 156,
                              "height": 156
                          }
                      },
                      "hash": "lucky_ducky_nfts_thumbnail_7117e3f34a",
                      "ext": ".jpg",
                      "mime": "image/jpeg",
                      "size": 7.91,
                      "url": "https://cmsmediaproduction.s3.amazonaws.com/lucky_ducky_nfts_thumbnail_7117e3f34a.jpg",
                      "previewUrl": null,
                      "provider": "aws-s3",
                      "provider_metadata": null,
                      "createdAt": "2022-09-26T15:40:29.015Z",
                      "updatedAt": "2022-09-26T15:40:29.015Z"
                  }
              }
          }
      }
  }
}
*/