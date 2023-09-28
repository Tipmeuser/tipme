import {
  BLUE,
  RED,
  BLUEGRAY,
  GRAY,
  GREEN,
  PURPLE,
  YELLOW,
  ORANGE,
} from "./defaultColors";
const colors = {
  blue: {
    primary: BLUE[900],
    secondary: BLUE[800],
    accent: BLUE[400],
    lightBlue: BLUE[100], // blue[100],
    light: BLUE["a100"],
    bluePrimary: BLUE.A900,
    blueMedium: BLUE.A700,
    blueLight: BLUE.A50,
    border: BLUE.A100,
  },
  blueGray: {
    primary: BLUEGRAY[900],
    mediumDark: BLUEGRAY[600],
    medium: BLUEGRAY[500],
    mediumLight: BLUEGRAY[400],
    lightShade: BLUEGRAY[200],
    light: BLUEGRAY[100],
    pureLight: BLUEGRAY[50],
  },
  gray: {
    secondary: GRAY[700],
    medium: GRAY[600],
    mediumGray: GRAY[500],
    grayMedium: GRAY[400],
    grayLight: GRAY[200],
    light: GRAY[100],
    border: GRAY[300],
    lightAccent: GRAY[50],
  },
  green: {
    primary: GREEN[500],
    medium: GREEN[600],
    mediumLight: GREEN[300],
    mediumDark: GREEN["A700"],
    lightMedium: GREEN.A500,
    light: GREEN.A50,
  },
  white: {
    primary: "#FFF",
  },
  red: {
    primary: RED[500],
    secondary: RED[700],
    light: RED["A100"],
  },
  black: {
    primary: "#000000",
  },
  yellow: {
    primary: YELLOW[800],
  },
  orange: {
    secondary: ORANGE[800],
    medium: ORANGE[600],
    light: ORANGE[50],
  },
  purple: { accent: PURPLE[400], medium: PURPLE[500], light: PURPLE["A100"] },
};
export default colors;
