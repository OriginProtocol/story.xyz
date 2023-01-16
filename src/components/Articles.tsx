/* eslint-disable react/no-unknown-property */
import { Card, Select } from "@originprotocol/origin-storybook";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Article, Meta } from "./types";

const Category = ({
  categories,
  setCategory
}: {
  categories: {
    name: string,
    slug: string
  }[],
  setCategory: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [open, setOpen] = useState(false);
  //const categories = ['All news', 'News', 'Food', 'Nature', 'Tech', 'Story']
  const capitalize = (name: string) => {
    return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
  };

  const categoriesFormatted: {
    id: number | null,
    name: string,
    unavailable: boolean
  }[] = categories.map((category, index) => {
    return {
      id: index,
      name: capitalize(category.name),
      unavailable: false,
    };
  })

  categoriesFormatted.unshift({
    id: null,
    name: "All articles",
    unavailable: false,
  },)

  return (
    <div className="pl-0 w-96 pt-4">
      <Select
        label={''}
        options={categoriesFormatted}
        onSelect={(value) => {
          if (value && value.id) {
            setCategory(value.id.toString());
          }
        }}
      />
    </div>
  );
};

const Articles = ({
  articles,
  meta,
  categories
}: {
  articles: Article[],
  meta: Meta,
  categories: {
    name: string
    slug: string
  }[]
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const [currentCategory, setCurrentCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const articlePages = Math.ceil(
    (currentCategory
      ? articles.filter((article) => article.slug === currentCategory).length
      : meta.pagination.total) / 9
  );
  const currentPageArticles = articles
    ? articles.slice(9 * (page - 1), 9 * page)
    : [];

  useEffect(() => {
    const pages = articlePages;

    let pageNumbers = [1, 2, pages, pages - 1, page, page - 1, page + 1];
    pageNumbers = pageNumbers.filter((number) => number > 0 && number <= pages);
    pageNumbers = [...new Set(pageNumbers)];
    pageNumbers = pageNumbers.sort((a, b) => a - b);
    setPageNumbers(pageNumbers);
  }, [page, articlePages]);

  return (
    <>
      {loaded && currentPageArticles && (
        <section className="stories light px-3">
          <div className="container-fluid max-w-screen-xl mx-auto mt-6 md:mb-28">
            <Category
              categories={categories}
              setCategory={setCurrentCategory}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-11 max-w-screen-xl mx-auto">
              {currentPageArticles.map((a) => {
                if (!currentCategory || currentCategory === a.category.slug) {
                  return (
                    <Card
                      webProperty={"originprotocol"}
                      title={a.title}
                      img={<Image src={ a.cardCover?.url || a.cover?.url || '/images/logos/origin-press.svg'} alt={a.cover?.alternativeText} width='640' height='312' />}
                      body={<Moment format="MMMM D, YYYY">{a.publishBackdate || a.publishedAt}</Moment>}
                      linkText={"Read more"}
                      linkHref={`/${a.slug}`}
                      key={a.title}
                    />
                  );
                }
              })}
            </div>
            <div className="pagination flex justify-center md:mt-16">
              {pageNumbers.map((pageNumber, index) => {
                const isCurrent = pageNumber === page;
                const skippedAPage =
                  index > 0 && pageNumber - pageNumbers[index - 1] !== 1;

                return (
                  <div className="flex" key={pageNumber}>
                    {skippedAPage && (
                      <div className="page-skip flex items-center justify-center">
                        ...
                      </div>
                    )}
                    <div
                      className={`page-number ${
                        isCurrent ? "current" : ""
                      } flex items-center justify-center`}
                      onClick={() => {
                        if (isCurrent) {
                          return;
                        }
                        setPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <style jsx>{`
        .pagination {
          padding: 40px;
          border-radius: 10px;
        }

        .page-number {
          cursor: pointer;
          color: #8293a4;
          min-width: 40px;
          min-height: 40px;
          border-radius: 5px;
          border: solid 1px #cdd7e0;
          margin-right: 10px;
          font-size: 14px;
          cursor: pointer;
          padding-left: 15px;
          padding-right: 15px;
        }

        .page-skip {
          color: #8293a4;
          margin-right: 10px;
          min-width: 40px;
          min-height: 40px;
        }

        .page-number.current,
        .page-number.current:hover {
          background-color: #1a82ff;
          color: white;
        }

        .page-number:hover {
          background-color: #edf2f5;
        }

        @media (max-width: 799px) {
          .container {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-gap: 5vw;
          }
        }
      `}</style>
    </>
  );
};

export default Articles;
