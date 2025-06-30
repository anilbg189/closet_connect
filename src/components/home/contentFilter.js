import React from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";

const ContentFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialContent = useSelector((state) => state.content.initial);

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
    newParams.delete("paid");
    newParams.delete("free");
    newParams.delete("view_only");
    setSearchParams(newParams);
  };

  // To delete a parameter:
  // const handleDeleteParam = () => {
  //   const newParams = new URLSearchParams(searchParams);
  //   newParams.delete("paramToDelete");
  //   setSearchParams(newParams);
  // };

  // console.log("free params : ", searchParams.get("free"));

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
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ paddingRight: "24px", color: "#777783", fontSize: "14px" }}
          >
            Pricing Option
          </Typography>
          <FormGroup row={true}>
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
              }}
            />
          </FormGroup>
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
          }}
        >
          RESET
        </Typography>
      </Box>
    </div>
  );
};

export default ContentFilter;
