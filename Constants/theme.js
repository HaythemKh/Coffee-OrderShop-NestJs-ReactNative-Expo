import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();

export const COLORS = {
    Bg_Color : "#f2f1f6",
    White : "#fff",
    black : "#000",
    gray : "#ddd",
    cardBg : "#1F2937",
    primaryRedHex: '#DC3535',
    primaryOrangeHex: '#D17842',
    primaryBlackHex: '#0C0F14',
    primaryDarkGreyHex: '#141921',
    secondaryDarkGreyHex: '#21262E',
    primaryGreyHex: '#252A32',
    secondaryGreyHex: '#252A32',
    primaryLightGreyHex: '#52555A',
    secondaryLightGreyHex: '#AEAEAE',
    primaryWhiteHex: '#FFFFFF',
    primaryBlackRGBA: 'rgba(12,15,20,0.5)',
    secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
    bgLight: '#d4a574',
    bgLightOpacity : 'rgba(212, 165, 116, 0.5)',
    borderLight : 'rgba(172, 125, 76, 0.8)',
    bgDark: '#8c5319',
    text: '#3C2A21',
    darkText : "#626262",
    primary : "#1F41BB",
    gray : "#ECECEC",
    lightPrimary : "#f1f4ff",
    onPrimary : "#fff",
    active : "#1F41BB",
    borderWithOpacity: "#1f41bb",
}

export const FONTS = {
    bold : "InterBold",
    semiBold : "InterSemiBold",
    medium : "InterMedium",
    regular : "InterRegular",
    light : "InterLight",
    PoppinsRegular: "PoppinsRegular",
    PoppinsBold: "PoppinsBold",
    PoppinsSemiBold: "PoppinsSemiBold",
};

export const SIZES = {
    small : 9 * fontScale,
    small2 : 14 * fontScale,
    medium : 14 * fontScale,
    large : 18 * fontScale,
    xLarge : 24 * fontScale,
};
