import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./card/Card";
import { CardBodyComponent } from "./card/CardBody";

const Card = {
  baseStyle: {
    py: "8px",
    px: "20px",
    display: "flex",
    height: "50px",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    minWidth: "0px",
    wordWrap: "break-word",
    backgroundClip: "border-box",
  },
  variants: {
    panel: (props) => ({
      bg: props.colorMode === "dark" ? "gray.700" : "white",
      width: "100%",
      boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      borderRadius: "15px",
    }),
  },
  defaultProps: {
    variant: "panel",
  },
};

const CardBody = {
  baseStyle: {
    display: "flex",
    width: "100%",
  },
};

const CardHeader = {
  baseStyle: {
    display: "flex",
    width: "100%"
  },
};

// import { mode } from "@chakra-ui/theme-tools";
export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181b23",
      "800": "#1f2029",
      "700": "#353646",
      "600": "#4b4d63",
      "500": "#616480",
      "400": "#797d9a",
      "300": "#9699b0",
      "200": "#b3b5c6",
      "100": "#d1d2dc",
      "50": "#eeeef2",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.50",
      },
    },
  },
  components: {Card,CardBody,CardHeader}
  
});
