export type RGBColor = {
  r: string;
  g: string;
  b: string;
};

export type RGBAColor = {
  r: string;
  g: string;
  b: string;
  a: string;
};

const getColor = (hex: string): any => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
};
const hexToRgba = (hex: string): RGBAColor | undefined => {
  return getColor(hex)
    ? {
        r: `${parseInt(getColor(hex)[1], 16)}`,
        g: `${parseInt(getColor(hex)[2], 16)}`,
        b: `${parseInt(getColor(hex)[3], 16)}`,
        a: "1",
      }
    : undefined;
};
const hexToRgb = (hex: string): RGBColor | undefined => {
  return getColor(hex)
    ? {
        r: `${parseInt(getColor(hex)[1], 16)}`,
        g: `${parseInt(getColor(hex)[2], 16)}`,
        b: `${parseInt(getColor(hex)[3], 16)}`,
      }
    : undefined;
};

export const convertHexToRgbString = (hexaColor: string) => {
  const rgb = hexToRgb(hexaColor);
  return generateRgbString(rgb);
};
export const convertHexToRgbaString = (hexaColor: string) => {
  const rbga = hexToRgba(hexaColor);

  return generateRgbaString(rbga);
};

export const generateRgbString = (color?: RGBColor) => {
  if (color) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  } else {
    return `rgb(${0}, ${0}, ${0})`;
  }
};

export const generateRgbaString = (color?: RGBAColor) => {
  if (color) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  } else {
    return `rgba(${0}, ${0}, ${0}, ${1})`;
  }
};
