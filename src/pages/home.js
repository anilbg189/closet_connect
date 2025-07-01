import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ContentFilter from "../components/home/contentFilter";
import Sort from "../components/home/sort";
import Contents from "../components/home/contents";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitialContent, setFilteredContent } from "../redux/contentSlice";
import { getApiContents } from "../apis/content";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setsearch] = useState(searchParams.get("search" || ""));
  const dispatch = useDispatch();
  const initialContent = useSelector((state) => state.content.initial);
  const filteredContent = useSelector((state) => state.content.filtered);
  const [sort, setsort] = useState("name");
  const [loading, setloading] = useState(true);
  const [priceRange, setPriceChange] = useState([0, 999]);

  const sortFilteredContents = (data) => {
    let sortedContents = [...data];

    switch (sort) {
      case "name":
        sortedContents = sortedContents.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        break;

      case "higher_price":
        let paid1 = sortedContents
          .filter((item) => !item.pricingOption)
          .sort((a, b) => b.price - a.price);
        let nonpaid1 = sortedContents.filter((item) => item.pricingOption);
        sortedContents = [...paid1, ...nonpaid1];
        break;

      case "lower_price":
        let paid2 = sortedContents
          .filter((item) => !item.pricingOption)
          .sort((a, b) => a.price - b.price);
        let nonpaid2 = sortedContents.filter((item) => item.pricingOption);
        sortedContents = [...paid2, ...nonpaid2];
        break;

      default:
        break;
    }

    return sortedContents;
  };

  const handleSort = (e) => {
    setsort(e.target.value);
    let data = [...sortFilteredContents(filteredContent)];
    dispatch(setFilteredContent(data));
  };

  useEffect(() => {
    if (initialContent.length) {
      setloading(true);
      let data = filterContents(initialContent);
      data = sortFilteredContents(data);
      dispatch(setFilteredContent(data));
      setloading(false);
    }
  }, [searchParams, priceRange]);

  useEffect(() => {
    if (filteredContent.length) {
      let data = [...sortFilteredContents(filteredContent)];
      dispatch(setFilteredContent(data));
    }
  }, [sort]);

  const filterContents = (data) => {
    let filteredContent = [...data];

    if (
      searchParams.get("paid") == "true" ||
      searchParams.get("free") == "true" ||
      searchParams.get("view_only") == "true"
    ) {
      filteredContent = data.filter((item) => {
        return (
          (item.pricingOption == 0 && searchParams.get("paid") == "true") ||
          (item.pricingOption == 1 && searchParams.get("free") == "true") ||
          (item.pricingOption == 2 && searchParams.get("view_only") == "true")
        );
      });
    }

    if (searchParams.get("search")) {
      filteredContent = filteredContent.filter((item) => {
        return (
          item.creator
            ?.toLowerCase()
            .includes(searchParams.get("search").toLowerCase()) ||
          item.title
            ?.toLowerCase()
            .includes(searchParams.get("search").toLowerCase())
        );
      });
    }

    if (searchParams.get("paid")) {
      filteredContent = filteredContent.filter(
        (item) =>
          item.pricingOption != 0 ||
          (item.price >= priceRange[0] && item.price <= priceRange[1])
      );
    }

    return filteredContent;
  };

  const getContents = async () => {
    try {
      const result = await getApiContents();
      dispatch(setInitialContent(result));
      let data = filterContents(result);
      data = sortFilteredContents(data);
      dispatch(setFilteredContent(data));
      setloading(false);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  const searchByKeyword = (e) => {
    const newParams = new URLSearchParams(searchParams); // Create a mutable copy
    if (e.target.value) {
      newParams.set("search", e.target.value);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
    setsearch(e.target.value);
  };

  return (
    <div className="home">
      <TextField
        fullWidth
        value={search}
        onChange={searchByKeyword}
        label="Find the items you're looking for"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
      />
      <ContentFilter priceRange={priceRange} setPriceChange={setPriceChange} />
      <Sort sort={sort} handleSort={handleSort} />
      {loading ? "loading..." : <Contents />}
    </div>
  );
};

export default Home;
