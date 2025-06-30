import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#B3F7FF",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        color: "primary",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            border: "none",
            color: "#777783",
            backgroundColor: "#1E1E23",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1E1E23",
              color: "#777783",
            },
          },
          "& label": {
            color: "#777783",
          },
        },
      },
    },
  },
});

export default theme;
