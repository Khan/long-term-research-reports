import { StyleSheet, css } from "aphrodite";
import React from "react";

import globalStyles from "webapp/shared-styles-package/global-styles";
import mediaQueries from "webapp/shared-styles-package/media-queries";

import sharedReportStyles from "../report-styles";

const Breadcrumb = ({ color }) =>
  <a
    className={css(styles.breadcrumb)}
    style={{ color }}
    href="/"
  >
    <span className={css(styles.breadcrumbArrow)}>
      <div
        className={css(styles.hideOnMobile)}
        style={{
          height: 10,
          lineHeight: "10px",
          display: "inline-block",
        }}
      >
        <svg focusable="false" width="10" height="10" viewBox="0 0 10 10">
          <path
            fill={color}
            d="M6.7,8.8L3,5l3.6-3.8c0.3-0.3,0.2-0.7,0-1c-0.2-0.3-0.7-0.2-1,0l-4,4.3c-0.2,0.3-0.2,0.7,0,0.9l4.1,4.3c0.3,0.3,0.7,0.3,1,0C7,9.5,7,9.1,6.7,8.8z"
          />
        </svg>
      </div>
      <div
        className={css(styles.hideUnlessMobile)}
        style={{ height: 8, lineHeight: "8px", display: "inline" }}
      >
        <svg focusable="false" width="8" height="8" viewBox="0 0 10 10">
          <path
            fill={color}
            d="M6.7,8.8L3,5l3.6-3.8c0.3-0.3,0.2-0.7,0-1c-0.2-0.3-0.7-0.2-1,0l-4,4.3c-0.2,0.3-0.2,0.7,0,0.9l4.1,4.3c0.3,0.3,0.7,0.3,1,0C7,9.5,7,9.1,6.7,8.8z"
          />
        </svg>
      </div>
    </span>
    Research
  </a>;

export default Breadcrumb;

const styles = StyleSheet.create({
  hideOnMobile: sharedReportStyles.hideOnMobile,
  hideUnlessMobile: sharedReportStyles.hideUnlessMobile,

  breadcrumb: {
    fontFamily: "inherit",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: "19px",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    textDecoration: "none",

    display: "inline-block",
    opacity: 0.7,
    paddingBottom: 6,

    pointerEvents: "auto",

    ":hover": {
      textDecoration: "underline",
    },

    [mediaQueries.smOrSmaller]: {
      fontSize: 12,
      lineHeight: "13px",
      paddingBottom: 4,
    },
  },

  breadcrumbArrow: {
    [mediaQueries.smOrSmaller]: {
      marginRight: 2,
    },
    [mediaQueries.mdOrLarger]: {
      position: "absolute",
      left: -14,
    },
  },
});
