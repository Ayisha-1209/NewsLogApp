// News.jsx
import React from "react";
import Loader from "./Loader/Loader";
import NewsItem from "./NewsItem";
import { Col, Row } from "react-bootstrap";
import Container from "./Container";

function News({ articles, loading }) {
  return (
    <>
      {loading ? ( // Display loader component while data is being fetched
        <Loader />
      ) : (
        <>
          <Container>
            <Row className="d-felx">
              {" "}
              {/* Flexbox row for responsive layout */}
              {articles.map(
                (
                  element // Map through articles array to display each news item
                ) => (
                  <Col
                    className="mx-auto md:w-1/3 sm:w-full "
                    key={element.url}
                  >
                    <NewsItem
                      title={element.title ? element.title : ""} // Display title if available
                      description={
                        element.description ? element.description : ""
                      } // Display description if available
                      imageUrl={element.urlToImage} // Pass image URL for the news item
                      newsUrl={element.url}
                    />{" "}
                    {/* Link to the full news article */}
                  </Col>
                )
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default News;
