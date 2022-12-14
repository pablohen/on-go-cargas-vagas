import { createTheme } from "@mui/material";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR as dataGridPtBr } from "@mui/x-data-grid";

export const appTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: { main: "#fdc800" },
      secondary: { main: "#fdc800" },
      text: { primary: "#f5f5f1" },
    },
    typography: {
      fontFamily: "'Alexandria', sans-serif",
    },
    components: {
      MuiButton: {
        defaultProps: {
          size: "small",
        },
      },
      MuiButtonGroup: {
        defaultProps: {
          size: "small",
        },
      },
      MuiCheckbox: {
        defaultProps: {
          size: "small",
        },
      },
      MuiFab: {
        defaultProps: {
          size: "small",
        },
      },
      MuiFormControl: {
        defaultProps: {
          size: "small",
          margin: "dense",
        },
      },
      MuiFormHelperText: {
        defaultProps: {
          margin: "dense",
        },
      },
      MuiIconButton: {
        defaultProps: {
          size: "small",
        },
      },
      MuiInputBase: {
        defaultProps: {
          margin: "dense",
        },
      },
      MuiInputLabel: {
        defaultProps: {
          margin: "dense",
        },
      },
      MuiRadio: {
        defaultProps: {
          size: "small",
        },
      },
      MuiSwitch: {
        defaultProps: {
          size: "small",
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
          margin: "dense",
        },
      },
      MuiList: {
        defaultProps: {
          dense: true,
        },
      },
      MuiMenuItem: {
        defaultProps: {
          dense: true,
        },
      },
      MuiTable: {
        defaultProps: {
          size: "small",
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
  },
  corePtBR,
  dataGridPtBr
);
