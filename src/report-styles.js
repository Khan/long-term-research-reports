import globalStyles from "webapp/shared-styles-package/global-styles";
import mediaQueries from "webapp/shared-styles-package/media-queries";

// These styles are shared across reports.
export default {
  outerClip: { position: "relative", overflow: "hidden" },
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 96,

    [mediaQueries.smOrSmaller]: {
      marginLeft: 16,
      marginRight: 16,
    },
    [mediaQueries.mdOrLarger]: {
      width: 728,
    },
    [mediaQueries.lgOrLarger]: {
      width: 984,
    },
    [mediaQueries.xlOrLarger]: {
      width: 1166,
    },
    marginBottom: 128,
  },

  lede: {
    fontSize: 20,
    lineHeight: 1.5,
    margin: "40px auto",
    display: "block",

    [mediaQueries.smOrSmaller]: {
      marginTop: 20,
    },
    [mediaQueries.mdOrLarger]: {
      width: 512,
    },
    [mediaQueries.lgOrLarger]: {
      width: 722,
    },
  },

  heading: {
    marginTop: 39,
    marginBottom: 26,
    color: globalStyles.colors.gray17,
    ...globalStyles.typography.conceptHeadingDesktop,
    [mediaQueries.smOrSmaller]: {
      ...globalStyles.typography.conceptHeadingMobile,
    },
  },

  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 1.5,
    marginTop: 47,
  },

  noTopMargin: {
    marginTop: 0,
  },

  noBottomMargin: {
    marginBottom: 0,
  },

  body: {
    ...globalStyles.typography.bodyLarge,
    [":first-of-type"]: {
      marginTop: 0,
    },
  },

  wideParagraph: {
    [mediaQueries.lgOrLarger]: {
      width: 781,
    },
    [mediaQueries.xlOrLarger]: {
      width: 945,
    },
  },

  prototypeExample: {
    marginTop: 32,
    [":first-of-type"]: {
      marginTop: 50,
    },
    display: "flex",
    [mediaQueries.smOrSmaller]: {
      flexDirection: "column",
    },
  },

  leftColumn: {
    [mediaQueries.smOrSmaller]: {
      order: 1,
    },
    [mediaQueries.mdOrLarger]: {
      width: 352,
    },
    [mediaQueries.lgOrLarger]: {
      width: 478,
    },
    [mediaQueries.xlOrLarger]: {
      width: 568,
    },
  },

  prototypeVideo: {
    [mediaQueries.smOrSmaller]: {
      order: 0,
      width: "100%",
      marginBottom: 22,
    },
    [mediaQueries.mdOrLarger]: {
      marginLeft: "auto",
      width: 352,
    },
    [mediaQueries.lgOrLarger]: {
      width: 478,
    },
    [mediaQueries.xlOrLarger]: {
      width: 568,
    },
  },

  bodyAndSidebar: {
    display: "flex",
    position: "relative",
  },

  sidebarBody: {
    ...globalStyles.typography.bodyXsmall,
    [":first-of-type"]: {
      marginTop: 0,
    },
    fontStyle: "normal",
    color: globalStyles.colors.gray41,
    [mediaQueries.smOrSmaller]: {
      marginLeft: 64,
    },
  },

  sidebarItem: {
    [mediaQueries.smOrSmaller]: {
      marginTop: 24,
    },
    [mediaQueries.mdOrLarger]: {
      position: "absolute",
      left: 375,
      width: 352,
    },
    [mediaQueries.lgOrLarger]: {
      left: 608,
      width: 376,
    },
    [mediaQueries.xlOrLarger]: {
      left: 721,
      width: 446,
    },
  },

  hairline: {
    marginTop: 40,
    marginBottom: 37,
    backgroundColor: globalStyles.colors.gray41, // TODO: Maybe we want a lighter color here for non-retina users?
    width: "100%",
    height: 1,

    "@media (-webkit-min-device-pixel-ratio: 2.0)": {
      // Unfortunately, only Safari respects fractional border
      // widths. Chrome is still working on it.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=623495
      height: 0.5,
    },
  },

  furtherReadingList: {
    listStyle: "disc outside",
    [mediaQueries.mdOrSmaller]: {
      listStyle: "disc inside",
    },
  },

  furtherReadingItem: {
    ...globalStyles.typography.bodyLarge,
    marginBottom: 24,
  },

  hideOnMobile: {
    [mediaQueries.smOrSmaller]: {
      display: "none",
    },
  },

  hideUnlessMobile: {
    [mediaQueries.mdOrLarger]: {
      display: "none",
    },
  },

  carouselArrow: {
    position: "absolute",
    cursor: "pointer",
    outline: "none",
    zIndex: 10,
    opacity: 0.7,
    transition: `opacity ${globalStyles.standardTransition}`,
    filter: "drop-shadow(0px 0px 2px black)",
    ":hover": {
      opacity: 1,
      textDecoration: "none",
    },
    ":focus": {
      opacity: 1,
    },
    height: 20,
    [mediaQueries.smOrSmaller]: {
      top: "calc((100vw - (31px)*2) * 3 / 4 / 2)",
    },
    [mediaQueries.mdOrLarger]: {
      top: 131,
    },
    [mediaQueries.lgOrLarger]: {
      top: 216,
    },
    [mediaQueries.xlOrLarger]: {
      top: 258,
    },
  },

  carouselItem: {
    padding: "0px 15px",
  },

  blockQuote: {
    [mediaQueries.smOrSmaller]: {
      borderLeft: `2px solid ${globalStyles.colors.gray76}`,
      paddingLeft: 16,
    },
    [mediaQueries.mdOrLarger]: {
      marginLeft: 40,
    },
  },

  placeholder: {
    backgroundColor: "#D8D8D8",
    color: "magenta",
    padding: 10,
  },
};
