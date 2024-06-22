import React from 'react';
import News from "./News";
import PaginationComponent from './Pagination'; // Import Pagination component

export default function Main({ articles, loadingArticle, setRequest, request, pages }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-5">
      <News articles={articles} loading={loadingArticle} />

      <div className="mt-4">
        <PaginationComponent pages={pages} request={request} setRequest={setRequest} />
      </div>
    </div>
  );
}
