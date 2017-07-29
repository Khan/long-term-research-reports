// @flow
import React from "react";

const numCharFrames = 60;
const startingX = 1160;
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
      backgroundOriginXs: [-760, -760, -760, -760],
    };
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
    const numFrames = (timestamp - (this.lastTimestamp || (timestamp - 1000/60))) / (1000 / 60)
    this.lastTimestamp = timestamp;
    
    this.animationRequest = window.requestAnimationFrame(this.animate);

    const availableWidthFraction = 0.45; // the fraction of the header width unobscured by other content
    const cameraEdgeLeftFraction = 0.45; // in unit screen space, how far along the screen is the line where the camera moves at the same speed as the player?
    const cameraEdgeRightFraction = 0.8; // in unit screen space, how far along the screen is the line where the camera moves at the same speed as the player?
    const cameraEdgeSmoothingSizeFraction = 0.07; // in unit screen space, how wide is the region before cameraEdgeFraction where the camera accelerates?
    const maximumStepSize = 3 * numFrames; // the maximum speed (pts/frame) at which the player can move
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

    if (
      Math.abs(cameraSpeed) >= 1 &&
      (cameraSpeed > 0 ||
        this.state.backgroundOriginXs[
          this.state.backgroundOriginXs.length - 1
        ] < 0)
    ) {
      newState = {
        backgroundOriginXs: this.state.backgroundOriginXs.map(
          (oldOrigin, index) => {
            const planeMovement = map(
              index,
              0,
              this.state.backgroundOriginXs.length - 1,
              Math.sign(cameraSpeed) * 1,
              cameraSpeed,
            );
            return oldOrigin - planeMovement;
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
        playerCel: (this.state.playerCel + Math.round(numFrames)) % numCharFrames,
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
    this.setState({
      targetPlayerX:
        x - this.state.backgroundOriginXs[this.state.backgroundOriginXs.length - 1],
    });
    this.startAnimation();
  };

  onMove = (event: MouseEvent) => {
    this.setMovementTarget(event.nativeEvent.offsetX);
  };

  onTouch = (event: TouchEvent) => {
    const { x } = convertPointFromPageToNode(
      event.target,
      event.changedTouches.item(0).pageX,
      event.changedTouches.item(0).pageY,
    );
    this.setMovementTarget(x);
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
      <div
        style={{
          backgroundColor: "#c7e9f1",
          position: "absolute",
          height: 573,
          width: containerWidth,
        }}
        onMouseDown={this.onMove}
        onTouchStart={this.onTouch}
        onTouchMove={this.onTouch}
      >
        {this.state.backgroundOriginXs.map((origin, index) =>
          <div
            style={{
              ...imageStyle,
              transform: `translate3d(${origin}px, 0px, 0px)`,
            }}
            key={index}
          >
            <img
              src={`/images/long-term-research/early-math/trees${index}.png`}
            />
            {index === this.state.backgroundOriginXs.length - 1
              ? <div>
                  <div
                    style={{
                      ...imageStyle,
                      backgroundImage:
                        "url('/images/long-term-research/early-math/character.png')",
                      backgroundSize: "1000px 1000px",
                      backgroundPosition: `${this.state.playerCel %
                        8 *
                        -imageSize}px ${Math.floor(this.state.playerCel / 8) *
                        -imageSize}px`,
                      width: imageSize,
                      height: imageSize,
                      top: 0,
                      left: 0,
                      transform: `translate3d(${this.state.playerX -
                        imageSize / 2}px, 505px, 0px) ${this.state
                        .playerDirection === "left"
                        ? "scaleX(-1)"
                        : ""}`,
                    }}
                  />
                  <div
                    style={{
                      backgroundImage:
                        "url('/images/long-term-research/early-math/balloon@2x.png')",
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
    );
  }
}
