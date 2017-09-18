import { StyleSheet, css } from "aphrodite";
import React from "react";
import Slider from "react-slick";
import VisibilitySensor from "react-visibility-sensor";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "babel-polyfill";

import globalStyles from "webapp/shared-styles-package/global-styles";
import mediaQueries from "webapp/shared-styles-package/media-queries";
import sharedReportStyles from "../report-styles";

import Breadcrumb from "../components/breadcrumb";
import Figure from "../components/figure";
import Forest from "./forest";

const isTouch = () => {
  return (
    null === window.ontouchstart &&
    null === window.ontouchmove &&
    null === window.ontouchend &&
    !/Windows NT/.test(window.navigator.userAgent)
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
    <div className={css(styles.authorLine, styles.authorListingAsterisk)}>
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
          Playful worlds of creative math: a design exploration
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
      position: "absolute",
      transform: `translate(0, -50%) ${isNext ? "" : " scaleX(-1)"}`,
      right: isNext ? 0 : undefined,
      left: isNext ? undefined : 0,
    }}
    onClick={onClick}
  >
    <img
      src="/images/long-term-research/reports/early-math/3-carousel/3-carousel-arrow.png"
      width="84"
      height="97.5"
    />
  </div>
);

const CarouselNextArrow = props => <CarouselArrow {...props} isNext />;

const CarouselPrevArrow = props => <CarouselArrow {...props} />;

export default class Report extends React.Component {
  componentDidMount = () => {
    setTimeout(() => {
      // Aphrodite interferes with the initial sizing of our carousel. This is a hack to work around that.
      this.slider.innerSlider.onWindowResized();
      // Break out of your box!
      this.slider.innerSlider.list.style.overflow = "visible";
    }, 0);
  };

  render = () => (
    <div className={css(styles.outerClip)}>
      <div className={css(styles.container)}>
        <HeroHeader />
        <div className={css(styles.lede)}>
          <Body>
            Plenty of grown-up artists, scientists, and engineers find math
            tremendously empowering. We wondered: how might we enable that
            feeling earlier in learners' lives? We explored designs for a world
            where kids can create, explore, and remix by playing with the
            mathematical properties of the objects within it. You can't visit
            that world yet, but we hope to inspire other creators of educational
            environments through our sketches, design themes, and snippets from
            learning theory.
          </Body>
        </div>
        <Hairline />
        <Heading>An appetizer: early sketches and prototypes</Heading>
        <Figure>
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
          Before we dive too deeply into details of our approach, we’d love to
          whet your palate with some of our early sketches. We’ll use these
          examples a little later to help illustrate the background research and
          design themes that we used while making them.
        </p>
        <PrototypeExample
          heading="Singing through touch"
          figure={<AudibleVideoPlayer />}
        >
          <Body>
            These sketches came from our iterative design explorations. We asked
            ourselves all kinds of questions, like: What are all the ways a
            child might <em>input</em> a number? If you ask a kid their age,
            they often hold up their fingers as an answer. That gesture inspired
            us to play with ways we might connect fingers on a screen to
            quantities they might manipulate.
          </Body>
          <Body>
            As we tried out our prototype, we realized we could assign a note to
            each number. With this interaction, a child's natural
            gesture—holding up some fingers to indicate a number—becomes a
            musical instrument.
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
            Handwriting is another natural way to express numbers. It's also
            important because it supports students in using the symbolic
            representation of numbers: digits. Meanwhile, we observed that many
            kids’ apps don’t give them any real agency. They tell kids what to
            do.
          </Body>
          <Body>
            This prototype tried to explore handwriting through the lens of
            giving kids agency. Instead of asking students to use handwriting to
            answer a fixed math problem, what if we turn things upside down—give
            them a scene they can alter with whatever numbers they can write?
          </Body>
          <Body>
            Want to see what thirty-three birds looks like? Handwrite 33!
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
            We wondered: how might we use the digital medium to enrich existing
            physical manipulatives like{" "}
            <a href="http://www.lakeshorelearning.com/product/productDet.jsp?productItemID=1%2C689%2C949%2C371%2C919%2C753&ASSORTMENT%3C%3East_id=1408474395181113&bmUID=1504047177209">
              these place-value cards
            </a>?
          </Body>
          <Body>
            Kids can use these “tens-place” and “ones-place” cards individually
            to describe numbers. But if you stack two cards, they represent a
            single two-digit number. These cards implicitly illustrate place
            value—that 27 is the same as 20 + 7.
          </Body>
          <Body>
            In the digital medium, though, kids can morph these cards’ values by
            scrubbing them with their finger. Again we thought: what if students
            could see their own manipulations play out in visual quantities?
          </Body>
          <Body>
            Play with the tens card, and: whoa. You’re adding ten birds at a
            time!
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
            What other manipulatives could we create that might{" "}
            <a href="http://klr.tumblr.com/post/153279790133/whats-so-great-about-the-digital-medium-again">
              <em>only</em> be possible in the dynamic medium?
            </a>
          </Body>
          <Body>
            Digital objects can disappear into thin air. We played with that
            observation to illustrate{" "}
            <a href="https://vimeo.com/157768846">
              different ways of thinking about subtraction
            </a>.
          </Body>
          <Body>
            How might you make stairs out of a rectangular chunk of blocks?
            Carve away positive blocks using negative, fixed-quantity “ghost
            blocks”!
          </Body>
        </PrototypeExample>
        <Subheading>And more!</Subheading>
        <Body wide>
          We brainstormed, sketched, and prototyped so many ideas! Some of our
          them focused on specific interactions; others refined our principles
          or broader architecture. Here’s a peek at more sketches and process.
        </Body>
        <div style={{ position: "absolute", left: 0, width: "100%" }}>
          <CarouselPrevArrow onClick={() => this.slider.slickPrev()} />
          <CarouselNextArrow onClick={() => this.slider.slickNext()} />
        </div>
        <Slider
          ref={slider => (this.slider = slider)}
          dots
          infinite
          slidesToShow={1}
          centerMode
          centerPadding="223px"
          dots={false}
          arrows={false}
          swipe={isTouch()}
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
                swipe: true,
                centerPadding: "10px",
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
              that only takes numerical quantities of color as input? What if
              our machine mixes light instead of paint—how does that affect how
              colors combine?
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
              sensors to numbers? We also tried enabling kids to measure or
              count objects in the real world through the camera.
            </Body>
          </div>
          <div className={css(styles.carouselItem)}>
            <Figure>
              <video
                src="/videos/long-term-research/reports/early-math/3-multiplier-wand.mp4"
                style={{ width: "100%" }}
                loop
                muted
                autoPlay
                playsInline
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
              To achieve numeracy, children must learn to read and write digits.
              But we don’t have to make that process all about right vs. wrong.
              Hey, you’ve written a lot of “3”s. Which ones do you like best?
              Why? Let’s put those up on the wall for your friends to see.
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
              There are so many ways we can think about “3.” By{" "}
              <a href="http://www.nctm.org/Conferences-and-Professional-Development/Principles-to-Actions-Toolkit/Resources/6-ES-Smith-TeacherStudentActions-Representations/">
                showing connections between many different representations of
                numbers
              </a>, we can help students build richer understanding.
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
              What if painting by numbers really meant{" "}
              <em>painting by numbers?</em> Can we reveal the number patterns in
              pixel art? The block manipulatives we started developing here
              later meandered their way into{" "}
              <a href="/research/reports/cantor">
                Cantor, another research project
              </a>.
            </Body>
          </div>
        </Slider>
        <Heading>Design themes</Heading>
        <Body wide>
          Through all those sketches, we were looking for pieces of our ultimate
          goal: an open-ended adventure in a playful world of creative math.
          That vision grew from design themes we developed during our background
          reading and interviews. As you read through these themes, imagine:
          what would educational technologies you’ve used look like if they were
          recreated according to these themes? In the section following this
          one, we’ll show a world we imagined using these themes.
        </Body>
        <Subheading>Learning through discovery</Subheading>
        <BodyAndSidebar>
          <Body>
            Why do we want to make a <em>world</em>, anyway? One key inspiration
            was Seymour Papert,{" "}
            <a href="https://www.youtube.com/watch?v=_l7TR6r8MK8&feature=youtu.be">
              who said
            </a>:
          </Body>
          <p className={css(styles.body, styles.blockQuote)}>
            While it’s true that most people in math class don’t learn much
            math, most kids in French class don’t learn much French. But we
            don’t say that they’re not “French-ly minded.”… We know that if they
            grew up in France, they would learn French perfectly well… If we all
            learned mathematics in “Mathland,” we would all learn mathematics
            perfectly well. How can we create “Mathland”? That’s really what
            it’s about.
          </p>
          <Body>
            Learning games often feel bolted onto their subjects. Scoreboards
            and badges cover dull tasks like chocolate-covered broccoli. These
            shallow motivators aren’t connected to the meaning of the activity;
            they could have been used to incentivize any random task.{" "}
          </Body>
          <SidebarItem>
            <p className={css(styles.sidebarBody)}>
              Seymour Papert’s 1980 manifesto on empowering children through
              technology,{" "}
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
              Plenty of evidence suggests that extrinsic motivations{" "}
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
            Kids learning language are constantly motivated by rich interactions
            inextricable from daily life. How might we create the same kinds of
            interactions in “Mathland,” so that learning math becomes as
            intrinsically motivating as learning language?
          </Body>
          <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
            {/* Note that this paragraph is duplicated below for mobile */}
            Plenty of evidence suggests that extrinsic motivations{" "}
            <a href="http://psycnet.apa.org/record/1974-10497-001">
              can squash burgeoning intrinsic motivation
            </a>{" "}
            and{" "}
            <a href="http://people.whitman.edu/~herbrawt/classes/390/Amabile.pdf">
              narrow creative thought
            </a>.
          </p>
        </BodyAndSidebar>

        <BodyAndSidebar>
          <Body>
            <Principle>Creativity.</Principle> A focus on creative freedom and
            exploration can open up wide variety of learning paths. You’ve
            already seen that emphasis in our early sketches. One child might
            understand a mathematical concept through generative painting;
            another might form the same idea making digital music.{" "}
            <a href="https://en.wikipedia.org/wiki/Constructivism_(philosophy_of_education)">
              To learn, we build new ideas from preexisting ones.
            </a>{" "}
            If children have some agency in choosing their approach and goals,
            they'll more likely find learning paths reflecting their own
            starting points and interests.
          </Body>
          <SidebarItem>
            <Figure
              caption={
                <span>
                  <a href="http://n-e-r-v-o-u-s.com/kinematicsHome/">
                    These 3D-printed bracelets
                  </a>{" "}
                  express creativity through geometry. (Photo ©2017 Go-3D Print)
                </span>
              }
            >
              <img
                src="/images/long-term-research/reports/early-math/4-principles/2-creativity.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>

        <BodyAndSidebar>
          <Body>
            <Principle>Entanglement.</Principle> We focused on creative
            activities where math really does give learners superpowers—where
            they manipulate their world <em>through</em> manipulating math. That
            way, when kids improve at manipulating math, they improve at making
            things in their world.
          </Body>
        </BodyAndSidebar>

        <BodyAndSidebar>
          <Body noBottomMargin>
            <Principle>Conceptual understanding.</Principle> When children have
            a real intellectual need,{" "}
            <a href="http://math.ucsd.edu/~jrabin/publications/ProblemFreeActivity.pdf">
              it’s more likely that they’ll understand <em>why</em> the
              entangled mathematical ideas behave as they do
            </a>—not just how to perform an algorithm. We worry that students
            with procedural understanding find themselves stuck as soon as they
            fall off a path they recognize. We tried to design interactions that
            reward conceptual understanding, encouraging students to correct
            their own errors and combine ideas in creative ways.
          </Body>
          <SidebarItem>
            <p className={css(styles.sidebarBody, styles.noBottomMargin)}>
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
            depth and occlusion hinting at hidden structure. The child’s
            entering a whole new world, but we’re leaving space for their
            imagination, a feeling of possibility and a sense of adventure. We
            believe that in a carefully art-directed environment, a child’s
            imagination evokes much more than we could have rendered ourselves.
          </Body>
          <SidebarItem top={8}>
            <Figure
              noBottomMargin
              caption="Artists have long used depth and occlusion to capture imaginations. These trees occlude what might be behind them, creating a sense of possibility and mystery. The figures in the foreground give us a sense of scale, which increases the sense of adventure."
            >
              <div className={css(fourImageCrossFadeStyle.one)}>
                <img
                  src="/images/long-term-research/reports/early-math/4-principles/4-art-direction-for-curiosity-1.jpg"
                  style={{ width: "100%" }}
                />
                <p className={css(styles.artDirectionLabel)}>Firewatch</p>
              </div>
              <div className={css(fourImageCrossFadeStyle.two)}>
                <img
                  src="/images/long-term-research/reports/early-math/4-principles/4-art-direction-for-curiosity-2.jpg"
                  style={{ width: "100%" }}
                />
                <p className={css(styles.artDirectionLabel)}>
                  Caspar David Friedrich
                </p>
              </div>
              <div className={css(fourImageCrossFadeStyle.three)}>
                <img
                  src="/images/long-term-research/reports/early-math/4-principles/4-art-direction-for-curiosity-3.jpg"
                  style={{ width: "100%" }}
                />
                <p className={css(styles.artDirectionLabel, styles.mystLabel)}>
                  Myst
                </p>
              </div>
              <div className={css(fourImageCrossFadeStyle.four)}>
                <img
                  src="/images/long-term-research/reports/early-math/5-storyboard/1.png"
                  style={{ width: "100%" }}
                />
                <p className={css(styles.artDirectionLabel)}>Our own world</p>
              </div>
            </Figure>
            <div style={{ marginTop: 24 }}>
              <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
                {/* WARNING repeated for mobile */}
                For more on conversation in math, see "<a href="https://ka-hivemind.herokuapp.com/?entry=MPm4fWnuAN3T37NSp">
                  Identity, Agency, and Knowing in Mathematical Worlds
                </a>" by Jo Boaler and James Greeno.
              </p>
            </div>
          </SidebarItem>
          <Body noBottomMargin>
            <Principle>Interpersonal connectedness.</Principle> Interpersonal
            interactions can prompt their own rich emotional connections. As
            children create and discover in this world, we can help them share
            their inventions and experiences with loved ones. Creative
            mathematical adventures can lead to laughter, oohs and ahhs, traded
            stories, and—yes—more learning from great conversation.
          </Body>
          <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
            {/* WARNING repeated for non-mobile */}
            For more on conversation in math, see "<a href="https://ka-hivemind.herokuapp.com/?entry=MPm4fWnuAN3T37NSp">
              Identity, Agency, and Knowing in Mathematical Worlds
            </a>" by Jo Boaler and James Greeno.
          </p>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Subheading>Empowerment, not condescension</Subheading>
          <SidebarItem top={96}>
            <Figure
              noBottomMargin
              caption={
                <span>
                  Minecraft empowered this player to{" "}
                  <a href="https://www.youtube.com/watch?v=kGFZ9beEgdI">
                    make a working guitar
                  </a>.
                </span>
              }
            >
              <img
                src="/images/long-term-research/reports/early-math/4-principles/5-empowerment.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
            <div style={{ marginTop: 24 }}>
              <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
                {/* WARNING repeated for mobile */}
                For more on how to use technology to unlock creative learning,
                see Mitch Resnick's{" "}
                <em>
                  <a href="https://mitpress.mit.edu/books/lifelong-kindergarten">
                    Lifelong Kindergarten
                  </a>
                </em>.
              </p>
            </div>
          </SidebarItem>
          <Body>
            Mathematical ideas are deeply empowering! Can we create activities
            which reflect that power—which we’re genuinely and personally
            excited to share? Let's not make tasks we <em>pretend</em> are
            interesting so that kids will learn “what's good for them.”
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
            <Principle>Empowerment.</Principle> We believe that genuine interest
            will follow from empowerment, and successful learning will follow
            from genuine interest. To that end, we explored creative tools for
            art and music, translating numeracy into exciting personal
            creations. We imagined a world full of secrets worth exploring and
            connected that exploration to mathematical understanding. We wanted
            to show students just how empowering math can be.
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
            Or with ideas deep and broad enough to appeal to novices and experts
            alike, in their own ways?
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            We imagined a world where children could eventually "look behind" an
            object in the digital world to see a more abstract representation.
            For instance, a child might first describe a flower by{" "}
            <a href="https://en.wikipedia.org/wiki/Van_Hiele_model#Van_Hiele_levels">
              its holistic shape
            </a>, but as they develop, they’ll come to see how its petals
            abstractly relate to leaves of a tree. At that point, they’re ready
            to define the patterns petals follow. The child can climb{" "}
            <a href="http://worrydream.com/LadderOfAbstraction/">
              up and down the ladder of abstraction
            </a>.
          </Body>
          <SidebarItem>
            <Figure>
              <img
                src="/images/long-term-research/reports/early-math/5-storyboard/8.png"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>
        <Heading>Weaving it all together</Heading>
        <Body wide>
          We’ve woven our early sketches and the design themes into a rough
          story to illustrate <em>one possible manifestation</em> of a playful
          world of creative math. We hope it will inspire others to create other
          possibilities for kids in the future!
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
            this yellow door just out of reach, partway up a tree. What's behind
            that door?
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={3}>
          <Body>
            If something is out of reach, tapping it reveals its distance from
            the ground. In this case, the yellow door’s distance is shown as
            “7”. The concept of distance is introduced because the learner has
            shown us, through interaction, that they’re curious about it.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={4}>
          <Body>
            The character can’t yet reach the yellow door, so they continue on
            and befriend a little basket with its own coordinates. The basket
            will help the character by holding things the character can collect,
            like “quantity-bricks,” operators, and tools. With those
            mathematical objects, students can build and mold the world.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={5}>
          <Body>
            Children can “harvest” flowering plants for quantities. For example,
            as the player taps three flowers on a single stem, they fill and
            collect a “3” quantity-brick.
          </Body>
          <Body>
            Each flower blooms when tapped. This gentle feedback scaffolds{" "}
            <a href="https://www.educateiowa.gov/sites/files/ed/documents/8017g%20Elem%20CLP%20with%20descriptors.pdf">
              one-to-one correspondence counting
            </a>{" "}
            and visually tracks what's been counted and what hasn't.
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
            <a href="http://www.papert.org/articles/SomePoeticAndSocialCriteriaForEducationDesign.html">
              Computer graphics and computer-generated music are outstanding
              opportunities to experience the link between beauty and math.
            </a>{" "}
            That’s because computers are great at translating between numbers
            and these alternative representations in real time.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={8}>
          <Body>
            We’ve scattered these kinds of creative activities everywhere. For
            instance, children can alter computationally-generated flowers with
            quantity-bricks.
          </Body>
          <Body>
            Over time, we reveal more “tools” and{" "}
            <a href="https://en.wikipedia.org/wiki/Van_Hiele_model">
              properties of objects in the world
            </a>. Students eventually gain control over color, size, angle—as
            well as operators on those numbers.
          </Body>
          <Body>
            At any time, learners can choose to “look behind” an activity to see
            its underlying mechanics. Like{" "}
            <a href="https://en.wikipedia.org/wiki/HyperCard">Hypercard</a>,
            Flash, and other powerful creative tools, we can support kids in
            digging all the way down to source code!
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={9}>
          <Body>
            Operators and tools can be combined in powerful ways with other
            properties of objects in the world. For example, if the character
            happens upon a ladder, they can manipulate either its height
            attribute, or its number of rungs.
          </Body>
          <Body>
            High school courses cover operators and{" "}
            <a href="https://en.wikipedia.org/wiki/Van_Hiele_model#Van_Hiele_levels">
              abstract properties
            </a>, but we can smooth the ramp by allowing kids to experienced
            them less formally years earlier.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={10}>
          <Body>
            If a child is curious what might exist up far above the trees, they
            may try to get there by setting the ladder’s height to a huge
            number. But: they wouldn’t be able to collect a quantity large
            enough by counting! We support curiosity and the urge to push limits
            by embracing this kind of intellectual need as it arises. The ladder
            problem inspires the need for repetition or scaling, which in turn
            creates space to introduce multiplication and exponentiation.
          </Body>
          <Body>
            In this case, the child has discovered the power of exponential
            growth—and a whole new world.
          </Body>
        </StoryboardElement>
        <BodyAndSidebar>
          <Heading>Onward</Heading>
          <SidebarItem top={20}>
            <Figure noBorder>
              <img
                src="/images/long-term-research/reports/cantor/chest-of-toys.png"
                style={{ width: "100%" }}
              />
            </Figure>
            <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
              The early explorations we’ve shared in this article have led to
              other projects, like{" "}
              <a href="http://khanacademy.org/research/reports/cantor">
                Cantor, our number block manipulative.
              </a>
            </p>
          </SidebarItem>
          <Body>
            Plenty of grown-up artists, scientists, and engineers find math
            tremendously empowering. We dream of helping every child feel the
            same way.
          </Body>
          <Body>
            An open-ended adventure in a playful world of creative math could
            help kids experience what math lovers experience. Curiosity! Wonder!
            Creative superpowers! Poetry!
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            Over two years have passed since we had this first little dream.
            Amongst these sketches and design themes, we feel there are more
            seedlings waiting to blossom. The ideas still resonate with us; if
            they sparked something in you, we hope you’ll bring them to your own
            work. Together we can spread mathematical joy near and far!
          </Body>
          <SidebarItem>
            <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
              The early explorations we’ve shared in this article have led to
              other projects, like{" "}
              <a href="http://khanacademy.org/research/reports/cantor">
                Cantor, our number block manipulative.
              </a>
            </p>
          </SidebarItem>
        </BodyAndSidebar>

        <Heading>Further reading</Heading>
        <Body wide>
          If you're interested in reading more about the topics in this report,
          our top recommendations are:
        </Body>
        <ul className={css(styles.furtherReadingList)}>
          <FurtherReadingItem>
            Seymour Papertʼs 1980 book,{" "}
            <a href="https://mindstorms.media.mit.edu">
              <em>Mindstorms</em>
            </a>, remains essential reading for anyone interested in building
            digital contexts for learning.
          </FurtherReadingItem>
          <FurtherReadingItem>
            For more on the foundations of constructivism (the idea that
            knowledge can't be directly transmitted; instead, learners construct
            understanding through experience), see{" "}
            <em>
              <a href="https://books.google.com/books?id=JhjPK4FKpCcC">
                Experience and Education
              </a>
            </em>{" "}
            by John Dewey (1938) and{" "}
            <em>
              <a href="https://books.google.com/books?id=EOQEtK5MtA0C">
                How Children Fail
              </a>
            </em>{" "}
            by John Holt (1964).
          </FurtherReadingItem>
          <FurtherReadingItem>
            Constance Kamii provided us a great math-specific perspective on
            experiential learning in{" "}
            <em>
              <a href="https://books.google.com/books/about/Young_Children_Reinvent_Arithmetic.html?id=XWPdDgAAQBAJ">
                Young Children Reinvent Arithmetic
              </a>
            </em>, which documents children doing exactly what it sounds like in
            1985.
          </FurtherReadingItem>
          <FurtherReadingItem>
            For more about learning through play,{" "}
            <em>
              <a href="http://digital.library.upenn.edu/women/montessori/method/method.html">
                The Montessori Method
              </a>
            </em>{" "}
            documents Maria Montessori's foundational work in 1912. Mitchel
            Resnick offers a modern perspective on playful learning with
            technology in{" "}
            <em>
              <a href="https://mitpress.mit.edu/books/lifelong-kindergarten">
                Lifelong Kindergarten
              </a>
            </em>{" "}
            (2017).
          </FurtherReadingItem>
        </ul>

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
            "Amit Patel",
            "Christopher Walker",
            "Jack Schaedler",
            "Nicky Case",
          ]
            .map(name => name.split(" "))
            .sort(
              ([firstA, lastA], [firstB, lastB]) =>
                lastA < lastB ? -1 : lastB < lastA ? 1 : 0,
            )
            .map(names => names.join(" "))
            .join(", ")}.
        </Body>
        <Body wide>
          While comments from these people have hugely improved this report, any
          remaining deficiencies in this work should be attributed to us alone.
          The people listed here should not necessarily be construed as
          endorsing this report.
        </Body>

        <Heading>Contact us</Heading>
        <Body wide>
          Have comments or feedback on this report? Please{" "}
          <a href="mailto:long-term-research-team@khanacademy.org">write us</a>.
        </Body>
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
  overflow: "hidden",
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

  artDirectionLabel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 5,
    textAlign: "right",
    color: "white",
    ...globalStyles.typography.caption,
    margin: 0,
  },

  mystLabel: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  authorListingAsterisk: {
    ...globalStyles.typography.caption,
    fontStyle: "normal",
    fontSize: 15,
    opacity: 0.7,
    [mediaQueries.mdOrLarger]: {
      lineHeight: "23px",
    },
  },

  carouselItem: {
    padding: "0 15px",
  },
});
