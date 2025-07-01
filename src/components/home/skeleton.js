import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const SkeletonUI = (props) => {
  const { loading = false } = props;

  return (
    // <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, height: "350px" }}>
    <Box>
      <Skeleton variant="rectangular" height="300px" />
      <Box sx={{ pt: 2 }}>
        <Skeleton height="30px" />
        <Skeleton height="30px" />
      </Box>
    </Box>
  );
};

export default SkeletonUI;
