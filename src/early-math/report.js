import { StyleSheet, css } from "aphrodite";
import React from "react";
import Slider from "react-slick";
import VisibilitySensor from "react-visibility-sensor";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "babel-polyfill";

import angleBracketLeftIcon from "webapp/shared-styles-package/icon.angleBracketLeft.js";
import globalStyles from "webapp/shared-styles-package/global-styles";
import mediaQueries from "webapp/shared-styles-package/media-queries";
import sharedReportStyles from "../report-styles";

import Breadcrumb from "../components/breadcrumb";
import Figure from "../components/figure";
import Forest from "./forest";

const Icon = props => {
  const { color, pathClassName, className } = props;
  let { icon, size } = props;
  let units = "";

  // If the raw path was passed in, wrap it in the format that we expect.
  if (typeof icon === "string") {
    icon = {
      path: icon,
      width: 10,
      height: 10,
    };
  }

  // `size` defaults to 1em to mirror the behavior of Font Awesome.
  if (typeof size !== "number") {
    size = 1;
    units = "em";
  }

  const height = size;
  const width = height / icon.height * icon.width;

  // NOTE: We assume that the viewBox is cropped and aligned to (0, 0),
  //       but icons can be defined differently. At some point we might
  //       want to add these attributes to icon-paths.js, but for now
  //       this is a fairly safe assumption.
  const xMin = 0;
  const yMin = 0;

  return (
    <svg
      className={className}
      focusable={!!props.focusable}
      width={width + units}
      height={height + units}
      viewBox={`${xMin} ${yMin} ${icon.width} ${icon.height}`}
    >
      <path className={pathClassName} fill={color} d={icon.path} />
    </svg>
  );
};

const Authors = () => (
  <h2 className={css(styles.authors)}>
    <div className={css(styles.authorLine)}>
      <strong>Report:</strong> Scott Farrar, May-Li Khoe, Andy Matuschak.{" "}
    </div>
    <div className={css(styles.authorLine)}>
      <strong>Research:</strong> Jason Brennan, May-Li Khoe, Andy Matuschak.{" "}
    </div>
    <div className={css(styles.authorLine)}>
      <strong>Illustrations:</strong> Natalie Fitzgerald, May-Li Khoe.{" "}
    </div>
    <div className={css(styles.authorLine)}>
      (authors listed alphabetically in sections)
    </div>
  </h2>
);

const HeroHeader = () => (
  <div>
    <div className={css(styles.heroContainer)}>
      <Forest />
      <div className={css(styles.heroGradient)} />
      <div
        style={{
          position: "relative",
          pointerEvents: "none",
          userSelect: "none",
        }}
        className={css(styles.heroTextContainer)}
      >
        <Breadcrumb color="white" />
        <h1 className={css(styles.title)}>
          Playful worlds of creative math: an exploration
        </h1>
        <div className={css(styles.hideOnMobile)}>
          <Authors />
        </div>
      </div>
    </div>
    <div className={css(styles.hideUnlessMobile)}>
      <Authors />
    </div>
  </div>
);

const Hairline = () => <div className={css(styles.hairline)} />;

const Body = ({ children, noBottomMargin, noTopMargin, wide }) => (
  <p
    className={css(
      styles.body,
      noBottomMargin ? styles.noBottomMargin : undefined,
      noTopMargin ? styles.noTopMargin : undefined,
      wide ? styles.wideParagraph : undefined,
    )}
  >
    {children}
  </p>
);

const Heading = ({ children }) => (
  <h2 className={css(styles.heading)}>{children}</h2>
);

const Subheading = ({
  children,
  noTopMargin,
  hideOnMobile,
  hideUnlessMobile,
}) => (
  <h3
    className={css(
      styles.subheading,
      noTopMargin ? styles.noTopMargin : undefined,
      hideOnMobile ? styles.hideOnMobile : undefined,
      hideUnlessMobile ? styles.hideUnlessMobile : undefined,
    )}
  >
    {children}
  </h3>
);

const BodyAndSidebar = ({ children }) => (
  <div className={css(styles.bodyAndSidebar)}>
    <div className={css(styles.leftColumn)}>{children}</div>
  </div>
);

const SidebarItem = ({ children, top }) => (
  <div className={css(styles.sidebarItem)} style={{ top: top || 0 }}>
    {children}
  </div>
);

class AudibleVideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: true,
      isVisible: false,
    };
  }

  onToggleAudio = () => {
    this.setState({ muted: !this.state.muted });
  };

  onVisibilityChange = isVisible => {
    if (isVisible !== this.state.isVisible) {
      this.setState({ isVisible });
      if (isVisible) {
        this.videoRef.play();
      } else {
        this.videoRef.pause();
      }
    }
  };

  render = () => (
    <VisibilitySensor partialVisibility onChange={this.onVisibilityChange}>
      <div>
        <video
          ref={videoRef => (this.videoRef = videoRef)}
          src="/videos/long-term-research/reports/early-math/2-sing-through-touch.mp4"
          muted={this.state.muted}
          loop
          playsInline
          preload
          style={{ width: "100%" }}
        />
        <button
          style={{
            width: 44,
            height: 44,
            position: "absolute",
            borderRadius: 22,
            bottom: 20,
            left: 15,
            border: "2px solid white",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            paddingTop: 5,
          }}
          onClick={this.onToggleAudio}
        >
          {this.state.muted ? (
            <svg width="28px" height="22px" viewBox="0 0 28 22" version="1.1">
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="noun_1122767_cc" fill-rule="nonzero" fill="#ffffff">
                  <g id="Group">
                    <path
                      d="M20.5541401,6.2307159 C20.177854,5.89512914 19.5820676,5.92563703 19.2371387,6.32223956 C18.8922097,6.6883342 18.9235669,7.26798405 19.3312102,7.60357081 C20.4914258,8.57982319 21.1499265,10.0136939 21.1499265,11.5085803 C21.1499265,13.0034668 20.4914258,14.4068296 19.3312102,15.4135899 C18.9549241,15.7491766 18.8922097,16.3288265 19.2371387,16.6949211 C19.4252817,16.9084763 19.6761391,17 19.9269966,17 C20.1464968,17 20.3659971,16.9389842 20.5541401,16.7559369 C22.0906418,15.4135899 23,13.491593 23,11.5085803 C23,9.52556769 22.121999,7.54255504 20.5541401,6.2307159 Z"
                      id="Shape"
                    />
                    <path
                      d="M24.584997,3.24436072 C24.202006,2.89352665 23.5956037,2.92542066 23.2445286,3.30814874 C22.8934535,3.69087681 22.9253694,4.29686294 23.3083604,4.64769701 C25.0956517,6.27429135 26.116961,8.60255384 26.116961,10.9946043 C26.116961,13.3866548 25.0956517,15.7149173 23.3083604,17.3415117 C22.9253694,17.6923457 22.8934535,18.2983319 23.2445286,18.6810599 C23.4360241,18.872424 23.6913514,19 23.9466787,19 C24.1700901,19 24.4254175,18.904318 24.584997,18.7448479 C26.7552793,16.7674195 28,13.9288529 28,10.9946043 C28,8.06035572 26.7552793,5.22178913 24.584997,3.24436072 Z"
                      id="Shape"
                    />
                    <path
                      d="M17.2194884,0.211012433 C16.7006337,-0.0703374778 16.0844939,-0.0703374778 15.5980676,0.211012433 L6.55053984,5.33783304 L2.5942732,5.33783304 C1.16742294,5.33783304 2.99760217e-15,6.46323268 2.99760217e-15,7.83872114 L2.99760217e-15,14.1847247 C2.99760217e-15,15.5602131 1.16742294,16.6856128 2.5942732,16.6856128 L6.55053984,16.6856128 L15.5656392,21.7811723 C15.8250665,21.9374778 16.1169223,22 16.3763496,22 C16.6682053,22 16.9276327,21.9374778 17.18706,21.7811723 C17.7059146,21.4998224 17.9977704,20.9683837 17.9977704,20.4369449 L17.9977704,1.55523979 C18.0301988,0.992539964 17.7059146,0.492362345 17.2194884,0.211012433 Z M2,14.308642 L2,7.65843621 C2,7.2962963 2.3,7 2.66666667,7 L6,7 L6,15 L2.66666667,15 C2.3,14.9670782 2,14.7037037 2,14.308642 Z M16,20 L8,15.254833 L8,6.74516696 L16,2 L16,20 Z"
                      id="Shape"
                    />
                    <path
                      d="M9.10779907,9.43138986 C9.26057148,9.7867712 9.59667076,10 9.93277005,10 C10.0855425,10 10.2077604,9.96446187 10.3605328,9.8933856 L13.5076443,8.0098645 C13.9659615,7.72555943 14.1187339,7.08587302 13.9048525,6.58833914 C13.6604167,6.05526713 13.110436,5.84203833 12.6826733,6.1263434 L9.5355618,8.0098645 C9.04669011,8.29416957 8.86336323,8.93385598 9.10779907,9.43138986 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </svg>
          ) : (
            <svg width="28px" height="23px" viewBox="0 0 23 23" version="1.1">
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="noun_1122767_cc"
                  transform="translate(-2.150000, -27.100000)"
                  fill-rule="nonzero"
                  fill="#ffffff"
                >
                  <g id="Group" transform="translate(0.000000, 27.000000)">
                    <path
                      d="M2.25402504,17 L2.83363148,17 C3.38103757,17 3.79964222,16.5874942 3.79964222,16.0480635 C3.79964222,15.5086328 3.38103757,15.0961269 2.83363148,15.0961269 L2.25402504,15.0961269 C2.0608229,15.0961269 1.93202147,14.9692021 1.93202147,14.7788147 L1.93202147,7.6075595 C1.93202147,7.41717219 2.0608229,7.29024732 2.25402504,7.29024732 L5.7960644,7.29024732 L5.7960644,11.7008866 C5.7960644,12.2403173 6.21466905,12.6528231 6.76207513,12.6528231 C7.30948122,12.6528231 7.72808587,12.2403173 7.72808587,11.7008866 L7.72808587,6.94120392 L16.0679785,2.1180588 L16.0679785,2.68922072 C16.0679785,3.22865142 16.4865832,3.64115726 17.0339893,3.64115726 C17.5813953,3.64115726 18,3.22865142 18,2.68922072 L18,1.57862809 C18,1.00746617 17.6779964,0.468035464 17.1949911,0.214185721 C16.6797853,-0.0713952403 16.0679785,-0.0713952403 15.5849732,0.214185721 L6.56887299,5.44983668 L2.25402504,5.44983668 C0.998211091,5.44983668 6.66133815e-16,6.43350443 6.66133815e-16,7.67102193 L6.66133815e-16,14.810546 C6.66133815e-16,15.984601 1.03041145,17 2.25402504,17 Z"
                      id="Shape"
                    />
                    <path
                      d="M17.0225156,11 C16.4686078,11 16.0450313,11.4148936 16.0450313,11.9574468 L16.0450313,20.8617021 L9.39813757,17.7021277 C8.90939539,17.4787234 8.32290477,17.6702128 8.09482508,18.1489362 C7.8667454,18.6276596 8.06224227,19.2021277 8.55098445,19.4255319 L15.6214547,22.8085106 C15.8495344,22.9361702 16.1101969,23 16.3708594,23 C16.6641047,23 16.95735,22.9361702 17.2180125,22.7765957 C17.7067547,22.4893617 18,21.9787234 18,21.4042553 L18,11.9574468 C18,11.4468085 17.5764234,11 17.0225156,11 Z"
                      id="Shape"
                    />
                    <path
                      d="M22.7629323,1.31136406 C22.4225689,0.92464247 21.8346686,0.89241567 21.4633632,1.24691046 L0.298951955,21.3242064 C-0.0723535046,21.6787012 -0.103295626,22.2910104 0.237067712,22.677732 C0.422720442,22.8710928 0.670257416,23 0.917794389,23 C1.13438924,23 1.35098409,22.9033196 1.53663682,22.7421856 L22.701048,2.66488963 C23.0723535,2.31039484 23.1032956,1.69808565 22.7629323,1.31136406 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </svg>
          )}
        </button>
      </div>
    </VisibilitySensor>
  );
}

const PrototypeExample = ({ heading, children, figure }) => (
  <div className={css(styles.prototypeExample)}>
    <Subheading noTopMargin hideUnlessMobile>
      {heading}
    </Subheading>
    <div className={css(styles.leftColumn)}>
      <Subheading noTopMargin hideOnMobile>
        {heading}
      </Subheading>
      {children}
    </div>
    <div className={css(styles.prototypeVideo)}>
      <Figure>{figure}</Figure>
    </div>
  </div>
);

const StoryboardElement = ({ storyboardElementNumber, children }) => (
  <div className={css(styles.storyboardElement)}>
    <div className={css(styles.storyboardFigure)}>
      <Figure>
        <img
          src={`/images/long-term-research/reports/early-math/5-storyboard/${storyboardElementNumber}.png`}
          style={{ width: "100%" }}
        />
      </Figure>
    </div>
    <div className={css(styles.storyboardBody)}>
      <span className={css(styles.storyboardElementNumber)}>
        {storyboardElementNumber}.
      </span>
      {children}
    </div>
  </div>
);

const Principle = ({ children }) => (
  <span className={css(styles.principleTitle)}>{children}</span>
);

const FurtherReadingItem = ({ children }) => (
  <li className={css(styles.furtherReadingItem, styles.wideParagraph)}>
    {children}
  </li>
);

const CarouselArrow = ({ className, style, onClick, isNext }) => (
  <div
    className={css(styles.carouselArrow)}
    style={{
      transform: `translate(0, -50%)${isNext ? " scaleX(-1)" : ""}`,
      right: isNext ? 10 : undefined,
      left: isNext ? undefined : 10,
    }}
    onClick={onClick}
  >
    <Icon icon={angleBracketLeftIcon} size={20} color="#fff" />
  </div>
);

const CarouselNextArrow = props => <CarouselArrow {...props} isNext />;

const CarouselPrevArrow = props => <CarouselArrow {...props} />;

export default class Report extends React.Component {
  componentDidMount = () => {
    // Aphrodite interferes with the initial sizing of our carousel. This is a hack to work around that.
    setTimeout(() => this.slider.innerSlider.onWindowResized(), 0);
  };

  render = () => (
    <div className={css(styles.outerClip)}>
      <div className={css(styles.container)}>
        <HeroHeader />
        <div className={css(styles.lede)}>
          <Body>
            Plenty of grown-up artists, scientists, and engineers find math
            tremendously empowering. How might we enable that feeling earlier in
            learners' lives? We envisioned a world where kids can create,
            explore, and remix by playing with the mathematical properties of
            the elements within it. You can't visit that world yet, but we hope
            to inspire other creators of educational worlds through our
            sketches, design principles, and snippets from learning theory.
          </Body>
        </div>
        <Hairline />
        <Heading>Early sketches and prototypes</Heading>
        <Figure caption="A small taste of dozens of interaction sketches we completed.">
          <video
            src="/videos/long-term-research/reports/early-math/1-small-multiples.mp4"
            muted
            autoPlay
            loop
            playsInline
            style={{ width: "100%" }}
          />
        </Figure>
        <p className={css(styles.body, styles.wideParagraph)}>
          We began this project with background research—talking to experts,
          surveying the landscape, reading associated research, and conducting
          interviews. We formed our design principles through that background
          research, but they'll make more sense through the lens of some
          sketches they inspired. Let's look at a few of those first!
        </p>
        <PrototypeExample
          heading="Singing through touch"
          figure={<AudibleVideoPlayer />}
        >
          <Body>
            What are all the ways a child might input a number? If you ask a kid
            their age, they often hold up their fingers as an answer. This
            inspired us to prototype ways we might connect multiple fingers on a
            screen to symbolic quantities.
          </Body>
          <Body>
            As we played with our prototype, we realized we could assign each
            number to a note. With this interaction, a child's simple
            gesture—holding up some fingers to indicate a number—becomes a
            musical instrument!
          </Body>
        </PrototypeExample>
        <PrototypeExample
          heading="Altering the world through handwritten numbers"
          figure={
            <img
              src="/images/long-term-research/reports/early-math/2-early-sketches/2-alter-your-world.png"
              style={{ width: "100%" }}
            />
          }
        >
          <Body>
            Handwriting is another natural input method. It's also important
            because it lets students use the symbolic representation of
            numbers—digits. Separately, we observed that many kids’ apps don’t
            provide agency; they often instruct kids narrowly what to do.
          </Body>
          <Body>
            What if, instead of asking students to handwrite a response
            correctly to a fixed prompt – we turned things upside down and let
            them modify the scene with whatever numbers they can write?
          </Body>
          <Body>
            Want to see what thirty-three birds looks like? Just handwrite 33!
          </Body>
        </PrototypeExample>
        <PrototypeExample
          heading="Altering the world through digital manipulatives"
          figure={
            <img
              src="/images/long-term-research/reports/early-math/2-early-sketches/2-place-value-cards.png"
              style={{ width: "100%" }}
            />
          }
        >
          <Body>
            Our background research helped us get familiar with existing
            manipulatives for early learning, such as{" "}
            <a href="http://www.lakeshorelearning.com/product/productDet.jsp?productItemID=1%2C689%2C949%2C371%2C919%2C753&ASSORTMENT%3C%3East_id=1408474395181113&bmUID=1504047177209">
              place-value cards
            </a>. In the digital medium, these “tens-place” and “ones-place”
            cards can be played with or stacked on top of each other to
            represent a single two-digit number. The cards’ interactions
            implicitly illustrate decomposition in the base-ten number
            system—that 27 is the same as 20 + 7.
          </Body>
          <Body>
            Again we thought: what if students could see the impact of their own
            manipulations play out in visual quantity? Want to see what it’s
            like when you add ten birds at a time? Play with the tens card!
          </Body>
        </PrototypeExample>
        <PrototypeExample
          heading="Digital manipulatives for subtraction"
          figure={
            <img
              src="/images/long-term-research/reports/early-math/2-early-sketches/2-subtraction.gif"
              style={{ width: "100%" }}
            />
          }
        >
          <Body>
            What other manipulatives could we create that might
            <a href="http://klr.tumblr.com/post/153279790133/whats-so-great-about-the-digital-medium-again">
              <em>only</em> be possible in the dynamic medium?
            </a>
          </Body>
          <Body>
            Digital objects can disappear into thin air! We played with that
            observation to illustrate{" "}
            <a href="https://vimeo.com/157768846">
              different ways of thinking about of subtraction
            </a>. How might you make stairs out of a rectangular chunk of
            blocks? Carve away positive blocks using negative, fixed-quantity
            “ghost blocks”!
          </Body>
        </PrototypeExample>
        <Subheading>And more!</Subheading>
        <Body wide>
          We brainstormed, sketched, and prototyped. Some experiments focused on
          specific interactions; others refined our principles or broader
          architecture. Here’s a peek at other sketches and process.
        </Body>
        <Slider
          ref={slider => (this.slider = slider)}
          dots
          infinite
          slidesToShow={1}
          centerMode
          centerPadding="223px"
          dots={false}
          nextArrow={<CarouselNextArrow />}
          prevArrow={<CarouselPrevArrow />}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                centerPadding: "188px",
              },
            },
            {
              breakpoint: 1024,
              settings: {
                centerPadding: "176px",
              },
            },
            {
              breakpoint: 768,
              settings: {
                centerMode: false,
                autoplay: true,
                autoplaySpeed: 5000,
              },
            },
          ]}
        >
          <div className={css(styles.carouselItem)}>
            <Figure>
              <img
                src="/images/long-term-research/reports/early-math/3-carousel/3-color-mixer.png"
                style={{ width: "100%" }}
              />
            </Figure>
            <Body>
              Could children start to learn about ratios using a color mixer
              that only takes numerical quantities of color as input?
            </Body>
          </div>
          <div className={css(styles.carouselItem)}>
            <Figure>
              <video
                src="/videos/long-term-research/reports/early-math/3-connecting-to-sensors.mp4"
                style={{ width: "100%" }}
                loop
                muted
                autoPlay
                playsInline
              />
            </Figure>
            <Body>
              Playing with sensors is fun! And it’s always fun to connect the
              digital back into the physical world. Could we connect movement or
              sensors to numbers? We also played with the idea of kids being
              able to measure or count objects in the real world through the
              camera.
            </Body>
          </div>
          <div className={css(styles.carouselItem)}>
            <Figure>
              <img
                src="/images/long-term-research/reports/early-math/3-carousel/3-multiplier.png"
                style={{ width: "100%" }}
              />
            </Figure>
            <Body>
              What if multiplication were a superpower you could find in the
              world—and once found, you could tap on anything to multiply it?
              Want 6 of everything? Use your multiply-by-6 tool to tap on things
              and get six of them!
            </Body>
          </div>
          <div className={css(styles.carouselItem)}>
            <Figure>
              <img
                src="/images/long-term-research/reports/early-math/3-carousel/3-gallery-of-numbers.png"
                style={{ width: "100%" }}
              />
            </Figure>
            <Body>
              [motivation, social aspects of learning together, self-reflection
              on own quality of work]
            </Body>
          </div>
          <div className={css(styles.carouselItem)}>
            <Figure>
              <img
                src="/images/long-term-research/reports/early-math/3-carousel/3-associations-with-3.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
            <Body>
              [maybe link to associations with the number 7 in cantor?]
            </Body>
          </div>
          <div className={css(styles.carouselItem)}>
            <Figure>
              <img
                src="/images/long-term-research/reports/early-math/3-carousel/3-drawing-with-numbers.png"
                style={{ width: "100%" }}
              />
            </Figure>
            <Body>
              [early Cantor]
            </Body>
          </div>
        </Slider>
        <Heading>Design principles</Heading>
        <Body wide>
          Our background research and early prototyping inspired us to form
          design principles which continue to color our research today. We’ll
          share them with you here, in the hopes that you might join us in
          imagining digital mathematical experiences for kids that feel more
          like an open-ended adventure!
        </Body>
        <Subheading>Learning through discovery</Subheading>
        <BodyAndSidebar>
          <Body>
            If you move to a new city where you don’t speak the language, you’ll
            pick it up. As you engage with your new city, your life becomes
            entangled with it. Interacting more deeply with your surroundings{" "}
            <em>means</em> interacting more deeply with the language and
            culture. How might we build a “city” whose objects and interactions
            are entangled with mathematical concepts in the same way?
          </Body>
          <SidebarItem>
            <p className={css(styles.sidebarBody)}>
              This metaphor comes from Seymour Papert, whose 1980 manifesto on
              empowering children through technology,{" "}
              <a href="https://mindstorms.media.mit.edu">
                <em>Mindstorms</em>
              </a>, remains a foundational text for anyone interested in
              learning and technology.
            </p>
            <Figure caption="The space alien theme might taste like chocolate at first, but it's covering the same old broccoli!">
              <img
                src="/images/long-term-research/reports/early-math/4-principles/1-broccoli.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
            <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
              {/* Note that this paragraph is duplicated below for mobile */}
              Plenty of evidence suggests that shallow extrinsic motivations{" "}
              <a href="http://psycnet.apa.org/record/1974-10497-001">
                can squash burgeoning intrinsic motivation
              </a>{" "}
              and{" "}
              <a href="http://people.whitman.edu/~herbrawt/classes/390/Amabile.pdf">
                narrow creative thought
              </a>.
            </p>
          </SidebarItem>
          <Body>
            But many learning games often feel bolted onto their subjects like
            chocolate-covered broccoli, adding game mechanics like badges or
            scoreboards to a dull task. These extrinsic motivators could
            incentivize any random task; they're disconnected from the meaning
            of the activity. Learning language in a city is constantly motivated
            by rich interactions inextricable from daily life. How might we
            build a “city” where learning math is as intrinsically motivating as
            learning language in a foreign city?
          </Body>
          <SidebarItem />
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            <Principle>Entanglement.</Principle> That's been our goal for this
            world: when children manipulate their environment, they manipulate
            mathematics. If they improve at manipulating their environment, they
            improve at manipulating mathematics. We believe the world doesn't
            need a trophy system: the desire to explore, interact, and create is
            motivation enough.
          </Body>
          <SidebarItem>
            <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
              {/* Note that this paragraph is duplicated below for mobile */}
              Plenty of evidence suggests that shallow extrinsic motivations{" "}
              <a href="http://psycnet.apa.org/record/1974-10497-001">
                can squash burgeoning intrinsic motivation
              </a>{" "}
              and{" "}
              <a href="http://people.whitman.edu/~herbrawt/classes/390/Amabile.pdf">
                narrow creative thought
              </a>.
            </p>
          </SidebarItem>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            <Principle>Creativity.</Principle> A focus on creative freedom and
            exploration can deliver a wider variety of learning paths. One child
            might construct a mathematical concept through a generative
            painting; another might form the same idea making digital music.{" "}
            <a href="https://en.wikipedia.org/wiki/Constructivism_(philosophy_of_education)">
              To learn, we build new ideas from preexisting ones.
            </a>{" "}
            If children have agency in choosing their methods and goals for a
            mathematical activity, they'll find learning paths from their own
            entry points. We can still prescribe experiences in the design of
            our world, but ultimately, each learner's paths forges their own
            path.
          </Body>
          <SidebarItem>
            <Figure
              caption={
                <span>
                  <p className={css(styles.sidebarBody)}>
                    <a href="http://n-e-r-v-o-u-s.com/kinematicsHome/">
                      These 3D-printed bracelets
                    </a>{" "}
                    express creativity through geometry. (Photo ©2017 Go-3D
                    Print)
                  </p>
                  <p
                    className={css(styles.sidebarBody, styles.hideOnMobile)}
                    style={{ paddingTop: 16 }}
                  >
                    {/* Note that this paragraph is duplicated below for mobile */}
                    The{" "}
                    <a href="http://www.nctm.org/">
                      National Council of Teachers of Mathematics
                    </a>{" "}
                    lists “too much focus on learning procedures without any
                    connection to meaning, understanding, or the applications
                    that require these procedures” as{" "}
                    <a href="http://www.nctm.org/uploadedFiles/Standards_and_Positions/PtAExecutiveSummary.pdf">
                      one of the most pressing problems in math education
                    </a>. They suggest that we reverse the situation: “build
                    procedural fluency from conceptual understanding.”
                  </p>
                </span>
              }
            >
              <img
                src="/images/long-term-research/reports/early-math/4-principles/2-creativity.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
          <Body noBottomMargin>
            <Principle>Conceptual understanding.</Principle> Because children
            are uncovering that learning path themselves,{" "}
            <a href="http://math.ucsd.edu/~jrabin/publications/ProblemFreeActivity.pdf">
              it’s more likely that they’ll understand <em>why</em> the
              entangled mathematical ideas behave as they do
            </a>—not just how to perform an algorithm. We worry that students
            with procedural understanding find themselves stuck as soon as they
            fall off a path they recognize. With conceptual understanding,
            students can correct their own errors and combine ideas in creative
            ways. That creativity leads to yet more learning paths and yet more
            understanding: the cycle continues.
          </Body>
          <SidebarItem>
            <p
              className={css(
                styles.sidebarBody,
                styles.hideUnlessMobile,
                styles.noBottomMargin,
              )}
            >
              {/* Note that this paragraph is duplicated above for non-mobile */}
              The{" "}
              <a href="http://www.nctm.org/">
                National Council of Teachers of Mathematics
              </a>{" "}
              lists “too much focus on learning procedures without any
              connection to meaning, understanding, or the applications that
              require these procedures” as{" "}
              <a href="http://www.nctm.org/uploadedFiles/Standards_and_Positions/PtAExecutiveSummary.pdf">
                one of the most pressing problems in math education
              </a>. They suggest that we reverse the situation: “build
              procedural fluency from conceptual understanding.”
            </p>
          </SidebarItem>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Subheading>Emotional connectedness</Subheading>
          <SidebarItem top={47}>
            <Figure
              caption={
                <span>
                  This classic photo from Papert's{" "}
                  <a href="https://mindstorms.media.mit.edu">
                    <em>Mindstorms</em>
                  </a>{" "}
                  paints a playful relationship with learning we'd love to see
                  every child experience.
                </span>
              }
            >
              <img
                src="/images/long-term-research/reports/early-math/4-principles/3-emotional-connectedness.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
          <Body>
            When thinking about education, it's easy to focus on cognition and
            lose sight of students' emotions. But by intentionally creating the
            space for emotional connections to form, we pave the way for a deep,
            enduring relationship between a child and learning.
          </Body>
          <Body>
            <Principle>Creative ownership.</Principle> We’ve discussed how
            creativity helps children connect new ideas to old ones when
            learning. That creative mindset also makes the activity personally
            relevant to the child,{" "}
            <a href="http://life-slc.org/docs/barron-self-sustainedlearning.pdf">
              forming an emotional bond that can inspire their involvement
              without outside coercion
            </a>.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            <Principle>Curiosity.</Principle> We believe art direction plays a
            major role in setting the stage for curiosity. For instance, in the
            forest at the top of this report, we’ve deliberately added lots of
            depth and occlusion that hints at hidden structure. The child’s
            entering a whole new world, but we’re leaving space for their
            imagination, a feeling of possibility and a sense of adventure. We
            suspect that a child’s imagination, combined with a carefully
            art-directed environment, evokes much more than we could have
            rendered ourselves.
          </Body>
          <SidebarItem>
            <Figure caption="Artists have long used depth and occlusion to capture imaginations. These trees occlude what might be behind them, creating a sense of possibility and mystery. The figures in the foreground give us a sense of scale, which increases the sense of adventure.">
              <img
                src="/images/long-term-research/reports/early-math/4-principles/4-art-direction-for-curiosity-1.jpg"
                style={{ width: "100%" }}
                className={css(fourImageCrossFadeStyle.one)}
              />
              <img
                src="/images/long-term-research/reports/early-math/4-principles/4-art-direction-for-curiosity-2.jpg"
                style={{ width: "100%" }}
                className={css(fourImageCrossFadeStyle.two)}
              />
              <img
                src="/images/long-term-research/reports/early-math/4-principles/4-art-direction-for-curiosity-3.jpg"
                style={{ width: "100%" }}
                className={css(fourImageCrossFadeStyle.three)}
              />
              <img
                src="/images/long-term-research/reports/early-math/5-storyboard/1.png"
                style={{ width: "100%" }}
                className={css(fourImageCrossFadeStyle.four)}
              />
            </Figure>
            <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
              {/* WARNING repeated for mobile */}
              For more on the value of conversation in math education, see "<a href="https://ka-hivemind.herokuapp.com/?entry=MPm4fWnuAN3T37NSp">
                Identity, Agency, and Knowing in Mathematical Worlds
              </a>" by Jo Boaler and James Greeno.
            </p>
          </SidebarItem>
          <Body noBottomMargin>
            <Principle>Interpersonal connectedness.</Principle> Interpersonal
            interactions can prompt their own rich emotional connections. As
            children create and discover in this world, we can empower them to
            share their inventions and experiences with loved ones. Creative
            mathematical adventures can lead to laughter, oohs and ahhs, traded
            stories, and—yes—more learning from great conversation.
          </Body>
          <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
            {/* WARNING repeated for non-mobile */}
            For more on the value of conversation in math education, see "<a href="https://ka-hivemind.herokuapp.com/?entry=MPm4fWnuAN3T37NSp">
              Identity, Agency, and Knowing in Mathematical Worlds
            </a>" by Jo Boaler and James Greeno.
          </p>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Subheading>Empowerment, not condescension</Subheading>
          <SidebarItem top={47}>
            <Figure caption="TODO NEEDS SOURCE">
              <img
                src="/images/long-term-research/reports/early-math/4-principles/5-empowerment.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
            <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
              {/* WARNING repeated for mobile */}
              For more on how to use technology to unlock creative learning, see
              Mitch Resnick's{" "}
              <em>
                <a href="https://mitpress.mit.edu/books/lifelong-kindergarten">
                  Lifelong Kindergarten
                </a>
              </em>.
            </p>
          </SidebarItem>
          <Body>
            Mathematical ideas are deeply empowering! Can we create activities
            which reflect that power—which we’re genuinely and personally
            excited to share? Let's not make tasks we
            <em>pretend</em> are interesting so that kids will learn “what's
            good for them”!
          </Body>
          <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
            {/* WARNING repeated for non-mobile */}
            For more on how to use technology to unlock creative learning, see
            Mitch Resnick's{" "}
            <em>
              <a href="https://mitpress.mit.edu/books/lifelong-kindergarten">
                Lifelong Kindergarten
              </a>
            </em>.
          </p>
          <Body>
            <Principle>Empowerment.</Principle> In this project, we focused on
            building contexts where mathematical concepts authentically empower
            the student. We believe that genuine interest will follow from
            empowerment, and successful learning will follow from genuine
            interest. To that end, we explored creative tools for art and music,
            translating numeracy into exciting personal creations. We imagined a
            world full of secrets worth exploring and connected that exploration
            to mathematical understanding.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            <Principle>Growth.</Principle> Powerful ideas grow with people, and
            we wanted our design to do the same. Toddlers build simple
            structures with Duplo, then more complex objects with Lego, then
            moving parts with Technic, and even robotics with Mindstorms.
          </Body>
          <SidebarItem>
            <div
              className={css(styles.placeholder)}
              style={{ width: "100%", height: 275, marginBottom: 24 }}
            >
              TODO: neato image of duplo + mindstorms
            </div>
          </SidebarItem>
          <Body>
            Can we build an environment which continues to reward deeper
            understanding, becoming ever more empowering as its occupants grow?
          </Body>
          <Body>
            We imagined a world where children can eventually "look behind" an
            object in the digital environment to see a more abstract
            representation. As learners understand more about the objects in
            their environment, they can grow new powers by treating objects at a
            higher level of abstraction.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <SidebarItem>
            <Figure>
              <img
                src="/images/long-term-research/reports/early-math/5-storyboard/8.png"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
          <Body noBottomMargin>
            A child might initially understand a triangle in terms of its
            holistic appearance, but{" "}
            <a href="https://en.wikipedia.org/wiki/Van_Hiele_model">
              as they develop and grow their experience
            </a>, they’ll come think of triangles in terms of more abstract
            properties. Ultimately, they’ll see how those properties extend to
            other shapes and to a system at large. In the same way, we might
            initially express a flower as a collection of petals—but later
            define the petals through structured patterns, and eventually define
            those patterns through a system of code. The child can climb{" "}
            <a href="http://worrydream.com/LadderOfAbstraction/">
              up and down the ladder of abstraction
            </a>.
          </Body>
        </BodyAndSidebar>
        <Heading>Weaving it all together</Heading>
        <Body wide>
          We’ve woven our early sketches and the principles above into a rough
          story to illustrate <em>one possible manifestation</em> of a playful
          world of creative math. We hope it inspires others to create more
          possibilities like this for kids in the future!
        </Body>
        <StoryboardElement storyboardElementNumber={1}>
          <Body>
            We start in a scene that deliberately evokes depth and leaves space
            for the child’s imagination to participate. What’s hiding among the
            trees? Does the character live inside a tree?
          </Body>
          <Body>
            A coordinate indicator trails the character. If the child explores
            walks left from the red-door-tree, they’ll see negative
            x-coordinates. The computer doesn’t demand answers about Cartesian
            grid model: instead, with infinite patience, it surfaces that model
            by reflecting the child’s actions in a property of the environment.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={2}>
          <Body>
            The coordinate system expresses the character's position in a way
            that children can naturally relate to their own experience of their
            body in the world (see{" "}
            <em>
              <a href="https://mindstorms.media.mit.edu/">Mindstorms</a>,
            </em>{" "}
            again, for more on this).
          </Body>
          <Body>
            New items that spark curiosity appear throughout the journey—like
            this yellow door just out of reach, partway up a tree.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={3}>
          <Body>
            Tapping something that’s out of reach reveals its distance from the
            player. In this case, the yellow door’s y-distance from the ground
            is shown as being “7”. The concept of distance is introduced because
            the learner has shown us, through interaction, that they’re curious.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={4}>
          <Body>
            The character can’t yet reach the yellow door, so they continue on
            and befriend a little basket with its own coordinates. The basket
            will help the character by being the container for things that the
            character can collect: “quantity-bricks”, operators, and tools.
            These are mathematical properties with which to build or mold the
            world.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={5}>
          <Body>
            Children can “harvest” flowering plants for quantities. For example,
            tapping three flowers on a single stem allows our character to fill
            and collect a “3” quantity-brick. Each flower blooms when tapped, a
            gentle feedback that provides scaffolding towards{" "}
            <a href="https://www.educateiowa.gov/sites/files/ed/documents/8017g%20Elem%20CLP%20with%20descriptors.pdf">
              one-to-one correspondence counting
            </a>{" "}
            and keeps track of what's been counted and what hasn't.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={6}>
          <Body>
            This child discovered that they can build themselves a staircase of
            quantity-bricks. As they sort the bricks by length, they reinforce
            their ability to compare number quantities.
          </Body>
          <Body>
            There were many ways the student might have reached the door. What
            if they had different quantity bricks in their basket? What if the
            child had no brick with length 5? How might they creatively clear
            these hurdles? Can you think of other ways to reach the door?
          </Body>
          <Body>
            Now we’ve reached the yellow door. What's inside the tree?
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={7}>
          <Body>
            We reward curiosity with more opportunity for exploration! Inside
            the tree, children can play with the relationship between numbers
            and sound; pitches correspond to quantities.
          </Body>
          <Body>
            <em>
              <a href="http://www.papert.org/articles/SomePoeticAndSocialCriteriaForEducationDesign.html">
                Computer graphics and computer-generated music are outstanding
                opportunities to experience the link between beauty and math.
              </a>
            </em>{" "}
            That’s because computers are great at translating between numbers
            and these alternative representations in real time.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={8}>
          <Body>
            The world is packed with these kinds of creative activities. For
            example, computationally generated flowers can be altered with
            quantity-bricks.
          </Body>
          <Body>
            Over time, we reveal more “tools” and properties of objects in the
            world. Students eventually gain control over color, size, angle—as
            well as operators on those numbers.
          </Body>
          <Body>
            At any time, learners can choose to “look behind” an activity to see
            its underlying mechanics. Like{" "}
            <a href="https://en.wikipedia.org/wiki/HyperCard">Hypercard</a>,
            Flash, and other powerful creative tools, we envision this could
            even take the form of source code if they dig far enough!
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={9}>
          <Body>
            Operators and tools can be combined in powerful ways with other
            properties of objects in the world. For example, if the character
            happens upon a ladder, they can manipulate its height attribute, or
            its number of rungs.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={10}>
          <Body>
            We embrace curiosity and the urge to push limits even further by
            embracing that kind of intellectual need as it arises. If a child is
            curious what might exist up far above the trees, they may try to get
            there by setting the ladder’s height to a huge number. But: they
            wouldn’t be able to collect a quantity large enough by counting!
            That would inspire the need for repetition or scaling, which in turn
            would create space to introduce multiplication and exponentiation.
          </Body>
          <Body>
            In this case, the child has discovered the power of exponential
            growth—and a whole new world.
          </Body>
        </StoryboardElement>
        <Heading>Onward</Heading>
        <Body wide>
          Over two years have passed since we had this first little dream of a
          playful world of creative math. The ideas still resonate with us – we
          hope they sparked something in you, too!
        </Body>
        <Body wide>
          The early explorations we’ve shared in this article have led to other
          projects, like{" "}
          <a href="/research/reports/cantor">
            Cantor, our number block manipulative
          </a>. Amongst these sketches and principles, we feel there are more
          seedlings of ideas that could potentially blossom. We hope that they
          inspire others to join us in pushing toward a humane future of
          learning technology!
        </Body>

        <Heading>Acknowledgements</Heading>
        <Body wide>
          We'd like to thank these people for their valuable thoughts along the
          way:{" "}
          {[
            "Bret Victor",
            "Chaim Gingold",
            "Sonia Cho",
            "Bill McCullum",
            "Kristin Umland",
            "Mitch Resnick",
            "Carol Dweck",
            "Orly Friedman",
            "Paula Te",
            "Corinna Liew",
            "Federico Ardila",
            "Natalia Ardila Mantilla",
            "Dania Cabello",
            "Monica Tran",
          ]
            .map(name => name.split(" "))
            .sort(
              ([firstA, lastA], [firstB, lastB]) =>
                lastA < lastB ? -1 : lastB < lastA ? 1 : 0,
            )
            .map(names => names.join(" "))
            .join(", ")}.
        </Body>

        <Heading>Further reading</Heading>
        <Body wide>
          If you're interested in reading more about the topics in this report,
          our top recommendations are:
        </Body>
        <ul className={css(styles.furtherReadingList)}>
          <FurtherReadingItem>
            Papert, Seymour. 1980. <em>Mindstorms</em>. Harvester Press.
          </FurtherReadingItem>
          <FurtherReadingItem>
            Holt, John. 1964. <em>How children fail</em>. Pitman Publishing
            Company.
          </FurtherReadingItem>
          <FurtherReadingItem>
            Dewey, John. 1938. <em>Experience and education</em>. Kappa Delta
            Pi.
          </FurtherReadingItem>
          <FurtherReadingItem>
            Montessori, Maria. 1912. <em>The Montessori method</em>. Frederick
            A. Stokes Company.
          </FurtherReadingItem>
          <FurtherReadingItem>
            Kamii, Constance. 1985.{" "}
            <em>
              Young children reinvent arithmetic: implications of Piaget's
              theory
            </em>. Teachers College Press.
          </FurtherReadingItem>
        </ul>
      </div>
    </div>
  );
}

const fourImageCrossFade = {
  "0": {
    opacity: 1,
  },
  "17%": {
    opacity: 1,
  },
  "25%": {
    opacity: 0,
  },
  "92%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
};

const fourImageCrossFadeAnimationStyle = {
  animationName: [fourImageCrossFade],
  animationDuration: "8s",
  animationIterationCount: "infinite",
  borderRadius: globalStyles.borderRadius,
};

const fourImageCrossFadeStyle = StyleSheet.create({
  one: {
    ...fourImageCrossFadeAnimationStyle,
    animationDelay: "0s",
  },
  two: {
    ...fourImageCrossFadeAnimationStyle,
    position: "absolute",
    top: 0,
    left: 0,
    animationDelay: "2s",
  },
  three: {
    ...fourImageCrossFadeAnimationStyle,
    position: "absolute",
    top: 0,
    left: 0,
    animationDelay: "4s",
  },
  four: {
    ...fourImageCrossFadeAnimationStyle,
    position: "absolute",
    top: 0,
    left: 0,
    animationDelay: "6s",
  },
});

const styles = StyleSheet.create({
  ...sharedReportStyles,

  principleTitle: {
    fontWeight: "bold",
  },

  storyboardElement: {
    marginTop: 32,
    display: "flex",
    [mediaQueries.smOrSmaller]: {
      flexDirection: "column",
    },
  },

  storyboardFigure: {
    [mediaQueries.smOrSmaller]: {
      marginBottom: 24,
    },
    [mediaQueries.mdOrLarger]: {
      width: 352,
      marginRight: 46,
    },
    [mediaQueries.lgOrLarger]: {
      width: 505,
      marginRight: 64,
    },
    [mediaQueries.xlOrLarger]: {
      width: 600,
      marginRight: 78,
    },
    flex: "none",
  },

  storyboardBody: {
    flex: "1 1",
    position: "relative",
  },

  storyboardElementNumber: {
    [mediaQueries.smOrSmaller]: {
      display: "none",
    },
    ...globalStyles.typography.bodyLarge,
    // TODO: fix on mobile
    position: "absolute",
    width: 100,
    textAlign: "right",
    marginRight: 10,
    right: "100%",
  },

  heroContainer: {
    height: 615,
    [mediaQueries.smOrSmaller]: {
      height: 322,
      marginBottom: 8,
      maxHeight: "100vh",
    },
  },

  heroGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: 615,
    [mediaQueries.smOrSmaller]: {
      height: 322,
      maxHeight: "100vh",
    },
    background:
      "linear-gradient(-179deg, rgba(21,89,104,0.27) 41%, rgba(21,89,104,0.00) 76%)",
    pointerEvents: "none",
    userSelect: "none",
  },

  heroTextContainer: {
    position: "relative",
    pointerEvents: "none",
    userSelect: "none",
    paddingTop: 92,
    [mediaQueries.smOrSmaller]: {
      paddingTop: 82,
    },
  },

  title: {
    color: "white",
    marginBottom: 20,
    ...globalStyles.typography.subjectHeadingDesktop,
    lineHeight: "50px",
    [mediaQueries.smOrSmaller]: {
      ...globalStyles.typography.subjectHeadingMobile,
    },
    maxWidth: 700,
    marginLeft: -2,
  },

  authors: {
    ...globalStyles.typography.smallHeading,
    fontWeight: "normal",
    color: "white",
    [mediaQueries.smOrSmaller]: {
      color: globalStyles.colors.gray41,
      ...globalStyles.typography.caption,
      fontWeight: "normal",
    },
    maxWidth: 600,
  },

  authorLine: {
    [mediaQueries.smOrSmaller]: {
      display: "inline",
    },
    [mediaQueries.mdOrLarger]: {
      display: "block",
    },
  },

  carouselItem: {
    padding: "0 15px",
  },
});
