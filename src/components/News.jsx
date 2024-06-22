// News.jsx
import React from 'react';
import Loader from './Loader/Loader';
import NewsItem from './NewsItem';
import { Col, Row } from "react-bootstrap";
import Container from './Container';

function News({ articles, loading }) {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Row className='d-felx'>
              {articles.map((element) => (
                <Col className='mx-auto md:w-1/3 sm:w-full ' key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default News;
