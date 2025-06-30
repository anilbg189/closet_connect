import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const priceOption = {
  0: "paid",
  1: "FREE",
  2: "View Only",
};

const Contents = ({}) => {
  const content = useSelector((state) => state.content.filtered);
  const [page, setPage] = useState(0);
  const [items, setitems] = useState([]);

  useEffect(() => {
    setitems((items) => {
      return [...items, ...content.slice(page * 8, 8 * page + 8)];
    });
  }, [page]);

  useEffect(() => {
    setitems((items) => {
      return [...content.slice(page * 8, 8 * page + 8)];
    });
  }, [content]);

  const handleLoadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="contents">
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={handleLoadMoreData}
        hasMore={items.length < content.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={3}>
          {items.map((item, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <img src={item.imagePath} className="content-pic" />
              <div className="creator-title-price">
                <div className="creator-title">
                  <Typography className="creator">{item.creator}</Typography>
                  <Typography className="title">{item.title}</Typography>
                </div>
                <Typography className="price">
                  {item.pricingOption == 0
                    ? `$${item.price}`
                    : priceOption[item.pricingOption]}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default Contents;
