import { useState } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import Slider from "@mui/material/Slider";

const minDistance = 0;

const ContentFilter = ({ priceRange, setPriceChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // // To set a single parameter:
  // const handleSetParam = () => {
  //   setSearchParams({ paramName: "newValue" });
  // };

  // // To set multiple parameters (overwriting existing ones with the same key):
  // const handleSetMultipleParams = () => {
  //   setSearchParams({ param1: "value1", param2: "value2" });
  // };

  // To update a parameter while preserving others:
  const handleUpdateParam = async (key, value) => {
    const newParams = new URLSearchParams(searchParams); // Create a mutable copy
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
    // filterContents(initialContent);
  };

  const resetFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    setPriceChange([0, 999]);
    newParams.delete("paid");
    newParams.delete("free");
    newParams.delete("view_only");
    setSearchParams(newParams);
  };

  const handlePriceRange = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setPriceChange([
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ]);
    } else {
      setPriceChange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ]);
    }
  };

  return (
    <div className="content-filter">
      <Box
        sx={{
          borderRadius: "8px",
          marginTop: "16px",
          backgroundColor: "#0F0F14",
          padding: "10px 14px",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Typography
            sx={{
              color: "#777783",
              fontSize: "14px",
              p: { xs: 1, md: 0 },
              pr: { xs: 0, md: "24px" },
            }}
          >
            Pricing Option
          </Typography>
          <FormGroup row={true} sx={{ width: { xs: "100%", md: "auto" } }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={searchParams.get("paid") == "true"}
                  onChange={(event) =>
                    handleUpdateParam("paid", event.target.checked)
                  }
                />
              }
              label="Paid"
              sx={{
                color: "#777783",
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                },
                flex: { xs: 1, md: "auto" },
                justifyContent: { xs: "center", md: "auto" },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={searchParams.get("free") == "true"}
                  onChange={(event) =>
                    handleUpdateParam("free", event.target.checked)
                  }
                />
              }
              label="Free"
              sx={{
                color: "#777783",
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                },
                flex: { xs: 1, md: "auto" },
                justifyContent: { xs: "center", md: "auto" },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={searchParams.get("view_only") == "true"}
                  onChange={(event) =>
                    handleUpdateParam("view_only", event.target.checked)
                  }
                />
              }
              label="View Only"
              sx={{
                color: "#777783",
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                },
                flex: { xs: 1, md: "auto" },
                justifyContent: { xs: "center", md: "auto" },
              }}
            />
          </FormGroup>
          <Box
            sx={{
              display: "flex",
              color: searchParams.get("paid") == "true" ? "white" : "grey",
              alignItems: "center",
              pl: { xs: 0, md: 3 },
              pt: { xs: 2, md: 0 },
              pb: { xs: 2, md: 0 },
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>${priceRange[0]}</Typography>
            <Box
              sx={{
                width: 150,
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
              }}
            >
              <Slider
                value={priceRange}
                onChange={handlePriceRange}
                valueLabelDisplay="auto"
                size="small"
                disabled={searchParams.get("paid") != "true"}
                min={0}
                max={999}
                disableSwap
              />
            </Box>
            <Typography sx={{ fontSize: "14px" }}>${priceRange[1]}</Typography>
          </Box>
        </Box>
        <Typography
          onClick={resetFilter}
          sx={{
            color: "#777783",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            cursor: "pointer",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          RESET
        </Typography>
      </Box>
    </div>
  );
};

export default ContentFilter;
