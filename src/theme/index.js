import { createTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    MuiInput: {
      styleOverrides: {
        root: {
          color: "white",
          "&:before": {
            borderBottom: "1px solid white", // default underline
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid white", // hover underline
          },
          "&:after": {
            borderBottom: "2px solid white", // active/focus underline
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            // borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreIcon, // use white arrow icon
      },
      styleOverrides: {
        icon: {
          color: "white",
        },
      },
    },
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
