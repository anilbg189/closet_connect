import { useState, useEffect, useLayoutEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ContentFilter from "../components/home/contentFilter";
import Contents from "../components/home/contents";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitialContent, setFilteredContent } from "../redux/contentSlice";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setsearch] = useState(searchParams.get("search" || ""));
  const [content, setcontent] = useState([]);
  const dispatch = useDispatch();
  const initialContent = useSelector((state) => state.content.initial);

  useEffect(() => {
    filterContents(initialContent);
  }, [searchParams]);

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

    console.log("searchParams.get(search) : ", searchParams.get("search"));

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

    console.log("filteredContent : ", filteredContent);
    dispatch(setFilteredContent(filteredContent));
    return filteredContent;
  };

  const getContents = async () => {
    try {
      const response = await fetch(
        "https://closet-recruiting-api.azurewebsites.net/api/data"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      dispatch(setInitialContent(result));

      const filtered = filterContents(result);
    } catch (err) {
      // setError(err);
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
      <ContentFilter filterContents={filterContents} />
      <Contents />
    </div>
  );
};

export default Home;
