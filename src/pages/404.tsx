import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function NotFound() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const redirectToSpaEntryScript = `(function(location){
  var normalizedBasePath = ${JSON.stringify(basePath)};
  var withoutBasePath = location.pathname;

  if (normalizedBasePath && withoutBasePath.indexOf(normalizedBasePath) === 0) {
    withoutBasePath = withoutBasePath.slice(normalizedBasePath.length) || '/';
  }

  var encodedSearch = location.search
    ? '&' + location.search.slice(1).replace(/&/g, '~and~')
    : '';

  var target =
    location.protocol +
    '//' +
    location.hostname +
    (location.port ? ':' + location.port : '') +
    normalizedBasePath +
    '/?' +
    withoutBasePath.replace(/^\/?/, '/') +
    encodedSearch +
    location.hash;

  location.replace(target);
})(window.location);`;

  return (
    <Container maxWidth="lg">
      <script dangerouslySetInnerHTML={{ __html: redirectToSpaEntryScript }} />
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Page not found
        </Typography>
      </Box>
    </Container>
  );
}
