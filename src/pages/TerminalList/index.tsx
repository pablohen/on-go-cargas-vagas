import { Box, Stack, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useState } from "react";
import { TerminalTable } from "../../components/TerminalTable";
import { initialState, PaginationOptions, useOnGo } from "../../hooks/useOnGo";

export function TerminalList() {
  const { getTerminals } = useOnGo();
  const [options, setOptions] = useState<PaginationOptions>(initialState);
  const terminalsQuery = getTerminals(options);

  function handleOnPageChange(pageIndex: number) {
    setOptions({ ...options, pageIndex: pageIndex + 1 });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, pesquisa: "" });
    }

    const pesquisa = filterModel.quickFilterValues.join("");
    setOptions({ ...options, pesquisa });
  }

  return (
    <Box p="1rem">
      <Stack spacing="1rem">
        <Typography variant="h4">Terminais</Typography>

        <TerminalTable
          data={terminalsQuery.data}
          handleOnPageChange={handleOnPageChange}
          handleFilterChange={handleFilterChange}
        />
      </Stack>
    </Box>
  );
}
