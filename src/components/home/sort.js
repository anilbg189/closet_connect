import React from "react";
import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Sort = ({ sort, handleSort }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        pt: 3,
      }}
    >
      <Typography
        sx={{ pr: 3, color: "white", fontSize: "14px", fontWeight: "bold" }}
      >
        Sort by
      </Typography>
      <FormControl variant="standard" sx={{ minWidth: 60 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Age"
          onChange={handleSort}
          sx={{ color: "white", fontSize: "14px" }}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"higher_price"}>Higher Price</MenuItem>
          <MenuItem value={"lower_price"}>Lower Price</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
