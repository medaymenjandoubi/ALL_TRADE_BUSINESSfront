import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import { ITEMS_PER_PAGE } from "../../../constants";

export const PaginationControl = ({ totalResults, page, setPage }) => (
  <Stack alignItems="center" mt={4} spacing={1}>
    <Pagination
      page={page}
      onChange={(e, value) => setPage(value)}
      count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
      variant="outlined"
      shape="rounded"
      color="primary"
    />
    <Typography fontSize="0.9rem" color="text.secondary">
      Page {page} / {Math.ceil(totalResults / ITEMS_PER_PAGE)}
    </Typography>
  </Stack>
);