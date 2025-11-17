import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";

const InstagramLayout = () => {
  const data = [
    { image: "/images/fs5_i1.jpg" },
    { image: "/images/fs5_i2.jpg" },
    { image: "/images/fs5_i3.jpg" },
    { image: "/images/fs5_i4.jpg" },
  ];
  return (
    <Box mt={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Follow us On Instagram
        </Typography>
        <Typography>
          Displays an Instagram feed of your photos from your Instagram account on your website.
        </Typography>
      </Box>
      <Grid container spacing={2} mt={4}>
        {data.map((i) => {
          return (
            <Grid key={i.image} size={{ md: 3, xs: 3, lg: 3, sm: 23, xl: 3 }}>
              <CardMedia sx={{ height: "315px" }} image={i.image} />{" "}
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="outlined" color="success">
          Follow Me
        </Button>
      </Box>
    </Box>
  );
};
export default InstagramLayout;
