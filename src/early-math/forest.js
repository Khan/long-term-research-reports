// @flow
import React from "react";
import { StyleSheet, css } from "aphrodite";

import mediaQueries from "webapp/shared-styles-package/media-queries";

const numCharFrames = 60;
const startingX = 1460;
const cameraOffset = -1000;
const imageSize = 125;

// Polyfill adapted from https://gist.github.com/Yaffle/1145197.
const { convertPointFromPageToNode, convertPointFromNodeToPage } = (() => {
  var I = new WebKitCSSMatrix();

  function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  Point.prototype.transformBy = function(matrix) {
    var tmp = matrix.multiply(I.translate(this.x, this.y, this.z));
    return new Point(tmp.m41, tmp.m42, tmp.m43);
  };

  function getTransformationMatrix(element) {
    var transformationMatrix = I;
    var x = element;

    while (x != undefined && x !== x.ownerDocument.documentElement) {
      var computedStyle = window.getComputedStyle(x, undefined);
      var transform = computedStyle.transform || "none";
      var c = transform === "none" ? I : new WebKitCSSMatrix(transform);
      transformationMatrix = c.multiply(transformationMatrix);
      x = x.parentNode;
    }

    var w = element.offsetWidth;
    var h = element.offsetHeight;
    var i = 4;
    var left = +Infinity;
    var top = +Infinity;
    while (--i >= 0) {
      var p = new Point(
        i === 0 || i === 1 ? 0 : w,
        i === 0 || i === 3 ? 0 : h,
        0,
      ).transformBy(transformationMatrix);
      if (p.x < left) {
        left = p.x;
      }
      if (p.y < top) {
        top = p.y;
      }
    }
    var rect = element.getBoundingClientRect();
    transformationMatrix = I.translate(
      window.pageXOffset + rect.left - left,
      window.pageYOffset + rect.top - top,
      0,
    ).multiply(transformationMatrix);

    return transformationMatrix;
  }

  const convertPointFromPageToNode = function(element, pageX, pageY) {
    return new Point(pageX, pageY, 0).transformBy(
      getTransformationMatrix(element).inverse(),
    );
  };

  const convertPointFromNodeToPage = function(element, offsetX, offsetY) {
    return new Point(offsetX, offsetY, 0).transformBy(
      getTransformationMatrix(element),
    );
  };

  return { convertPointFromPageToNode, convertPointFromNodeToPage };
})();

const imageStyle = {
  position: "absolute",
  pointerEvents: "none",
};

const clip = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const map = (
  value: number,
  fromA: number,
  fromB: number,
  toA: number,
  toB: number,
) => (value - fromA) / (fromB - fromA) * (toB - toA) + toA;

type State = {
  playerX: number,
  playerDirection: "left" | "right",
  targetPlayerX: number,
  playerStepSize: number,
  playerCel: number,
  backgroundOriginXs: number[],
};

type Props = {};

const containerWidth = 1708; // TODO: extract

export default class Forest extends React.Component {
  state: State;
  props: Props;

  animationRequest: number;

  constructor(props: Props) {
    super(props);
    this.animationRequest = 0;
    this.state = {
      playerX: startingX,
      playerDirection: "right",
      targetPlayerX: startingX,
      playerStepSize: 0,
      playerCel: 0,
      backgroundOriginXs: new Array(4)
        .fill(cameraOffset)
        .map((initial, i) => initial + i * -30),
      hasTargetedYet: false,
      lastFrameCameraSpeed: 0,
    };

    this.images = [];
    this.imageLoadTime = null;
  }

  startAnimation = () => {
    if (!this.animationRequest) {
      this.animationRequest = window.requestAnimationFrame(this.animate);
    }
  };

  stopAnimation = () => {
    if (this.animationRequest) {
      window.cancelAnimationFrame(this.animationRequest);
      this.animationRequest = 0;
      this.lastTimestamp = 0;
    }
  };

  animate = (timestamp: number) => {
    this.animationRequest = window.requestAnimationFrame(this.animate);

    if (!Object.keys(this.images).every(k => this.images[k].complete)) {
      return;
    } else if (!this.imageLoadTime) {
      this.imageLoadTime = timestamp;
      return;
    } else if ((timestamp - this.imageLoadTime) < 750) {
      return;
    }

    const numFrames =
      (timestamp - (this.lastTimestamp || timestamp - 1000 / 60)) / (1000 / 60);
    this.lastTimestamp = timestamp;

    const availableWidthFraction = 0.45; // the fraction of the header width unobscured by other content
    const cameraEdgeLeftFraction = 0.45; // in unit screen space, how far along the screen is the line where the camera moves at the same speed as the player?
    const cameraEdgeRightFraction = 0.8; // in unit screen space, how far along the screen is the line where the camera moves at the same speed as the player?
    const cameraEdgeSmoothingSizeFraction = 0.1; // in unit screen space, how wide is the region before cameraEdgeFraction where the camera accelerates?
    const maximumStepSize = (this.state.hasTargetedYet ? 3 : 1.25) * numFrames; // the maximum speed (pts/frame) at which the player can move
    const maximumCameraSpeed = maximumStepSize; // pts/frame
    const minimumCameraSpeed = 0; // pts/frame

    const effectiveContainerWidth = containerWidth * availableWidthFraction;

    const playerScreenX =
      this.state.playerX +
      this.state.backgroundOriginXs[this.state.backgroundOriginXs.length - 1];
    const cameraRightDelta =
      playerScreenX - effectiveContainerWidth * cameraEdgeRightFraction;
    let cameraSpeed = clip(
      map(
        cameraRightDelta,
        -effectiveContainerWidth * cameraEdgeSmoothingSizeFraction,
        0,
        0,
        maximumCameraSpeed,
      ),
      0,
      maximumCameraSpeed,
    );
    if (cameraSpeed === 0) {
      // Try the left edge.
      const cameraLeftDelta =
        effectiveContainerWidth * (1.0 - cameraEdgeLeftFraction) -
        playerScreenX;
      cameraSpeed = clip(
        map(
          cameraLeftDelta,
          -effectiveContainerWidth * cameraEdgeSmoothingSizeFraction,
          0,
          0,
          -maximumCameraSpeed,
        ),
        -maximumCameraSpeed,
        0,
      );
    }

    let newState = {};

    if (!this.hasTargetedYet) {
      const alpha = 0.3;
      cameraSpeed =
        this.state.lastFrameCameraSpeed * alpha + cameraSpeed * (1 - alpha);
      newState.lastFrameCameraSpeed = cameraSpeed;
    }

    if (
      Math.abs(cameraSpeed) >= 0.05 &&
      (cameraSpeed > 0 ||
        this.state.backgroundOriginXs[
          this.state.backgroundOriginXs.length - 1
        ] < 0)
    ) {
      newState = {
        backgroundOriginXs: this.state.backgroundOriginXs.map(
          (oldOrigin, index) => {
            return (
              oldOrigin -
              (index + 1) * cameraSpeed / this.state.backgroundOriginXs.length
            );
          },
        ),
      };
    }

    // Move the character towards its target.
    const dx = this.state.targetPlayerX - this.state.playerX;
    if (Math.abs(dx) > maximumStepSize) {
      const playerStepSize = clip(
        this.state.playerStepSize + Math.sign(dx) / (7 / numFrames),
        Math.sign(dx) === 1 ? 0 : -maximumStepSize,
        Math.sign(dx) === 1 ? maximumStepSize : 0,
      );
      newState = {
        ...newState,
        playerX: this.state.playerX + playerStepSize,
        playerDirection: dx > 0 ? "right" : "left",
        playerStepSize,
        playerCel:
          (this.state.playerCel + Math.round(numFrames)) % numCharFrames,
      };
    } else {
      newState = {
        ...newState,
        playerStepSize: 0,
        playerCel: 0,
      };
    }

    this.setState(newState);
  };

  setMovementTarget = (x: number) => {
    console.log(        x -
          this.state.backgroundOriginXs[
            this.state.backgroundOriginXs.length - 1
          ],
        -cameraOffset,
        startingX + 95 * 24,
)
    this.setState({
      hasTargetedYet: true,
      targetPlayerX: clip(
        x -
          this.state.backgroundOriginXs[
            this.state.backgroundOriginXs.length - 1
          ],
        -cameraOffset,
        startingX + 95 * 24,
      ),
    });
    this.startAnimation();
  };

  onMove = (event: MouseEvent) => {
    // This lazy hack relies on the fact that the hit-testing node is the older sibling of the main forest node.
    const { x } = convertPointFromPageToNode(
      event.target.nextSibling,
      event.pageX,
      event.pageY,
    );
    this.setMovementTarget(x);
  };

  onTouch = (event: TouchEvent) => {
    // This lazy hack relies on the fact that the hit-testing node is the older sibling of the main forest node.
    const { x } = convertPointFromPageToNode(
      event.target.nextSibling,
      event.changedTouches.item(0).pageX,
      event.changedTouches.item(0).pageY,
    );
    this.setMovementTarget(x);
  };

  componentDidMount = () => {
    setTimeout(() => {
      if (!this.state.hasTargetedYet) {
        this.startAnimation();
      }
    }, 0);
  };

  componentWillUnmount = () => {
    this.stopAnimation();
  };

  componentWillUpdate = (nextProps: Props, nextState: State) => {
    const withinEpsilon = (a, b) => Math.abs(a - b) < 0.01;
    if (
      this.animationRequest &&
      withinEpsilon(this.state.playerX, nextState.playerX) &&
      this.state.targetPlayerX === nextState.targetPlayerX &&
      this.state.playerCel === nextState.playerCel &&
      this.state.playerDirection === nextState.playerDirection &&
      this.state.backgroundOriginXs.every((a, index) =>
        withinEpsilon(a, nextState.backgroundOriginXs[index]),
      )
    ) {
      this.stopAnimation();
    }
  };

  render() {
    return (
      <div>
        <div
          className={css(styles.forestFlatBackground)}
          onMouseDown={this.onMove}
          onTouchStart={this.onTouch}
          onTouchMove={this.onTouch}
        />
        <div className={css(styles.forestContainer)}>
          <div
            style={{
              backgroundColor: "#c7e9f1",
              position: "absolute",
              height: 768,
              width: containerWidth,
            }}
          >
            {this.state.backgroundOriginXs.map((origin, index) =>
              <div
                style={{
                  ...imageStyle,
                  transform: `translate3d(${origin}px, 0px, 0px)`,
                }}
                key={index}
              >
                <img src="/images/long-term-research/reports/early-math/character.png" style={{display: "none"}} ref={(image) => {this.images["character"] = image}} />
                <img
                  src={`/images/long-term-research/reports/early-math/trees${index}.png`}
                  ref={(image) => {this.images[index] = image}}
                />
                {index === this.state.backgroundOriginXs.length - 1
                  ? <div>
                      <div
                        style={{
                          ...imageStyle,
                          backgroundImage:
                            "url('/images/long-term-research/reports/early-math/character.png')",
                          backgroundSize: "1000px 1000px",
                          backgroundPosition: `${this.state.playerCel %
                            8 *
                            -imageSize}px ${Math.floor(
                            this.state.playerCel / 8,
                          ) * -imageSize}px`,
                          width: imageSize,
                          height: imageSize,
                          top: 0,
                          left: 0,
                          transform: `translate3d(${this.state.playerX -
                            imageSize / 2}px, 575px, 0px) ${this.state
                            .playerDirection === "left"
                            ? "scaleX(-1)"
                            : ""}`,
                        }}
                      />
                      <div
                        style={{
                          backgroundImage:
                            "url('/images/long-term-research/reports/early-math/balloon@2x.png')",
                          backgroundSize: "142px 48px",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: "#106173",
                          fontFamily: "'Proxima Nova', sans-serif",
                          fontSize: 22,
                          boxSizing: "border-box",
                          padding: "15px 7px 15px 0px",
                          width: 142,
                          height: 48,
                          textAlign: "center",
                          transform: `translate3d(${this.state.playerX -
                            165}px, 680px, 0px)`,
                        }}
                      >
                        {`x = ${Math.round(
                          (this.state.playerX - startingX) / 24 + 4,
                        )}, y = 0`}
                      </div>
                    </div>
                  : null}
              </div>,
            )}
          </div>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  forestFlatBackground: {
    backgroundColor: "#c7e9f1",
    position: "absolute",
    left: 0,
    height: 615,
    [mediaQueries.smOrSmaller]: {
      height: 322,
      maxHeight: "100vh",
    },
    width: "100%",
  },

  forestContainer: {
    transform: "scale(0.8)",
    transformOrigin: "0 0",
    marginLeft: -24,
    userSelect: "none",
    pointerEvents: "none",
    [mediaQueries.smOrSmaller]: {
      transform: "scale(0.42)",
    },
  },
});
