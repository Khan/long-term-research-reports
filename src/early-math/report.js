import { StyleSheet, css } from "aphrodite";
import React from "react";
import Slider from "react-slick";
import VisibilitySensor from "react-visibility-sensor";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import angleBracketLeftIcon from "webapp/shared-styles-package/icon.angleBracketLeft.js";
import globalStyles from "webapp/shared-styles-package/global-styles";
import mediaQueries from "webapp/shared-styles-package/media-queries";
import sharedReportStyles from "../report-styles";

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

const Authors = () =>
  <h2 className={css(styles.authors)}>
    <div className={css(styles.authorLine)}>
      <strong>Report:</strong> May-Li Khoe, Andy Matuschak, Scott Farrar.{" "}
    </div>
    <div className={css(styles.authorLine)}>
      <strong>Research:</strong> May-Li Khoe, Andy Matuschak, Jason Brennan.{" "}
    </div>
    <div className={css(styles.authorLine)}>
      <strong>Illustrations:</strong> Natalie Fitzgerald, May-Li Khoe.
    </div>
  </h2>;

const HeroHeader = () =>
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
      >
        <h1 className={css(styles.title)}>
          Empowering children through mathematical concepts
        </h1>
        <div className={css(styles.hideOnMobile)}>
          <Authors />
        </div>
      </div>
    </div>
    <div className={css(styles.hideUnlessMobile)}>
      <Authors />
    </div>
  </div>;

const Hairline = () => <div className={css(styles.hairline)} />;

const Body = ({ children, noBottomMargin, noTopMargin, wide }) =>
  <p
    className={css(
      styles.body,
      noBottomMargin ? styles.noBottomMargin : undefined,
      noTopMargin ? styles.noTopMargin : undefined,
      wide ? styles.wideParagraph : undefined,
    )}
  >
    {children}
  </p>;

const Heading = ({ children }) =>
  <h2 className={css(styles.heading)}>
    {children}
  </h2>;

const Subheading = ({
  children,
  noTopMargin,
  hideOnMobile,
  hideUnlessMobile,
}) =>
  <h3
    className={css(
      styles.subheading,
      noTopMargin ? styles.noTopMargin : undefined,
      hideOnMobile ? styles.hideOnMobile : undefined,
      hideUnlessMobile ? styles.hideUnlessMobile : undefined,
    )}
  >
    {children}
  </h3>;

const BodyAndSidebar = ({ children }) =>
  <div className={css(styles.bodyAndSidebar)}>
    <div className={css(styles.leftColumn)}>
      {children}
    </div>
  </div>;

const SidebarItem = ({ children, top }) =>
  <div className={css(styles.sidebarItem)} style={{ top }}>
    {children}
  </div>;

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

  render = () =>
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
          {this.state.muted
            ? <svg width="28px" height="22px" viewBox="0 0 28 22" version="1.1">
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
            : <svg width="28px" height="23px" viewBox="0 0 23 23" version="1.1">
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
              </svg>}
        </button>
      </div>
    </VisibilitySensor>;
}

const PrototypeExample = ({ heading, children, figure }) =>
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
      <Figure>
        {figure}
      </Figure>
    </div>
  </div>;

const StoryboardElement = ({ storyboardElementNumber, children }) =>
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
  </div>;

const Principle = ({ children }) =>
  <span className={css(styles.principleTitle)}>
    {children}
  </span>;

const FurtherReadingItem = ({ children }) =>
  <li className={css(styles.furtherReadingItem, styles.wideParagraph)}>
    {children}
  </li>;

const CarouselArrow = ({ className, style, onClick, isNext }) =>
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
  </div>;

const CarouselNextArrow = props => <CarouselArrow {...props} isNext />;

const CarouselPrevArrow = props => <CarouselArrow {...props} />;

export default class Report extends React.Component {
  componentDidMount = () => {
    // Aphrodite interferes with the initial sizing of our carousel. This is a hack to work around that.
    setTimeout(() => this.slider.innerSlider.onWindowResized(), 0);
  };

  render = () =>
    <div className={css(styles.outerClip)}>
      <div className={css(styles.container)}>
        <HeroHeader />
        <p className={css(styles.lede)}>
          During the spring of 2015, we studied the landscape of mathematical
          learning software for kids, particularly in the pre-kindergarten and
          kindergarten range. We noticed an opportunity to investigate what it
          would mean to <em>
            empower children through mathematical concepts
          </em>—give them a space where they can create, explore, and mold their
          world by playing with the mathematical properties of the elements
          within it.
        </p>
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
          We began the project by spending many weeks talking to experts,
          surveying the product landscape, reading associated research, and
          interviewing students, parents, and teachers. Insights from that
          background research informed our design principles, which we’ll
          explain shortly—but they’ll make more sense after we give you a taste
          of the sketches they inspired.
        </p>
        <PrototypeExample
          heading="Singing through touch"
          figure={<AudibleVideoPlayer />}
        >
          <Body>
            Our very first idea explored: what are all the ways a child might
            input a number? If you ask a kid their age, they often hold up their
            fingers – sometimes before they start saying the number. We
            prototyped ways we might take advantage of multi-touch input to
            connect multiple fingers on the screen to a display of symbolic
            quantity.
          </Body>
          <Body>
            Playing with our initial prototype made us realize we could layer on
            representations of quantity—and give the numbers creative power—by
            giving each number a distinct note! Turning the counting of
            multi-touches into a musical instrument.
          </Body>
        </PrototypeExample>
        <PrototypeExample
          heading="Altering the world using handwritten numbers"
          figure={
            <div
              className={css(styles.placeholder)}
              style={{ width: "100%", height: 300 }}
            />
          }
        >
          <Body>
            Handwriting was another natural input method. This, alongside our
            observations that many kids don’t yet feel in control of their
            situation and are often told what to do – made us feel that giving
            them control of a little digital world is a welcome break from the
            norm. In this sketch, we wondered if we could translate the
            students’ number expression abilities into something personally
            meaningful: the ability to precisely modify their world with
            numbers.
          </Body>
          <Body>Want to see what a hundred birds looks like? Just ask.</Body>
        </PrototypeExample>
        <PrototypeExample
          heading="Subtraction blocks"
          figure={
            <div
              className={css(styles.placeholder)}
              style={{ width: "100%", height: 300 }}
            />
          }
        >
          <Body>
            We kept asking ourselves:{" "}
            <a href="http://klr.tumblr.com/post/153279790133/whats-so-great-about-the-digital-medium-again">
              what’s <em>only</em> possible in the dynamic medium?
            </a>
          </Body>
          <Body>
            Digital objects can disappear into thin air. We thought that might
            make for an interesting new angle on subtraction. Here the student
            can build a staircase down to the mysterious character below using
            negative “ghost blocks.”
          </Body>
        </PrototypeExample>
        <PrototypeExample
          heading="Place-value cards"
          figure={
            <div
              className={css(styles.placeholder)}
              style={{ width: "100%", height: 300 }}
            />
          }
        >
          <Body>
            Our background research helped us get familiar with existing
            manipulatives for early learning, such as place-value cards. In the
            digital medium, these “tens-place” and “ones-place” cards can be
            manipulated individually or stacked on top of each other to
            represent a single two-digit number. The cards’ interactions
            implicitly illustrate decomposition in the base-ten number
            system—that 27 is the same as 20 + 7.
          </Body>
          <Body>
            Unlike a physical version of these cards, kids can adjust the
            quantities in place, seeing their impact on another representation,
            like these birds.
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
          {["green", "blue", "yellow", "red"].map(color =>
            <div
              style={{
                padding: "0 15px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 517,
                  backgroundColor: color,
                  marginBottom: 8,
                }}
              />
              <Body noBottomMargin>
                This is a caption for the figure in the carousel above. This is
                a caption for the figure in the carousel above. This is a
                caption for the figure in the carousel above.
              </Body>
            </div>,
          )}
        </Slider>
        <Hairline />
        <Heading>Design principles</Heading>
        <Body wide>
          Our investigations gave rise to deeper ideas that we used to challenge
          ourselves when designing solutions in this space. They continue to
          drive our research today.
        </Body>
        <Subheading>Learning through discovery</Subheading>
        <BodyAndSidebar>
          <Body>
            If you move to a new city where you don’t speak the language, you’ll
            pick it up. If you engage with your new city, your life becomes
            entangled with it. Interacting more deeply with your surroundings
            means interacting more deeply with the language and culture.
          </Body>
          <SidebarItem top={0}>
            <div className={css(styles.placeholder)} style={{ height: 298 }} />
          </SidebarItem>
          <Body>
            Learning games often feel bolted onto their subjects like
            chocolate-covered broccoli: the game mechanics could just as well be
            used to incentivize other random tasks. Learning games often
            motivate with badges or scoreboards, but learning language in a city
            is constantly motivated by rich interactions inextricable from daily
            life.
          </Body>
          <Body>
            Can we build an environment whose objects and interactions are
            entangled with mathematical concepts in the same way—and where
            motivation comes from within?
          </Body>
          <Body>
            <Principle>Entanglement.</Principle> That's been our goal for this
            world: when children manipulate their world, they manipulate
            mathematics. If they improve at manipulating their world, they
            improve at manipulating mathematics. We believe the world doesn't
            need a trophy system: the desire to explore, interact, and create is
            motivation enough.
          </Body>
          <Body>
            <Principle>Creativity.</Principle> With creative freedom and
            exploration comes a wider variety of learning paths. One child might
            construct a mathematical concept through a generative painting;
            another might form the same idea making digital music. To learn, we
            connect new ideas to preexisting ones. A prescribed learning path
            allows no agency or creativity for the learner, their only option is
            compliance. But if children have agency in the mathematical
            activity, they'll find learning paths from their own entry points.
            We can still prescribe experiences in the design of our world, but
            ultimately, the paths are forged by the learner.
          </Body>
          <Body>
            <Principle>Conceptual understanding.</Principle> Because children
            are uncovering that learning path themselves, it’s more likely that
            they’ll understand why the entangled mathematical ideas behave as
            they do—not just how to perform an algorithm. With procedural
            understanding, we’re stuck as soon as we fall off a path we
            recognize. With conceptual understanding, we can correct our own
            errors and combine ideas in creative ways. That creativity leads to
            yet more learning paths and yet more understanding: the cycle
            continues.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Subheading>Emotional connectedness</Subheading>
          <Body>
            When talking about education, we often ignore or belittle children’s
            emotions, focusing on intellectual activities. But by creating the
            space for emotional connections to form, we pave the way for a deep,
            enduring relationship between a child and learning.
          </Body>
          <Body>
            <Principle>Creative ownership.</Principle> We’ve discussed how
            creativity helps children connect new ideas to old ones when
            learning. That creative mindset also makes the activity personally
            relevant to the child, forming an emotional bond that can inspire
            their involvement without outside coercion.
          </Body>
          <Body>
            <Principle>Curiosity.</Principle> Our art direction’s all about
            setting the stage for curiosity. For instance, in the scenario
            above, we’ve deliberately added lots of depth and occlusion. The
            child’s entering a whole new world, but we’re leaving space for
            their imagination, a feeling of possibility and a sense of
            adventure. The imagination, combined with the environment, evokes
            much more than we could have rendered ourselves.
          </Body>
          <Body>
            <Principle>Interpersonal connectedness.</Principle> Interpersonal
            interactions can prompt their own rich emotional connections. As
            children create and discover in this world, we can empower them to
            share their inventions and experiences with loved ones. Creative
            mathematical adventures can lead to laughter, oohs and ahhs, traded
            stories, and—yes—more learning from great conversation.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Subheading>Empowerment, not condescension</Subheading>
          <Body>
            Mathematical ideas are incredibly empowering! Can we create
            activities which reflect that power—which we’re genuinely and
            personally excited to share—rather than condescending tasks we
            pretend are interesting so that kids will learn “what's good for
            them”?
          </Body>
          <Body>
            <Principle>Empowerment.</Principle> In this project, we focused on
            empowerment and trusted that learning would follow. We explored
            creative tools for art and music, translating numeracy into
            interesting, personally-relevant creations. We imagined a world full
            of secrets worth exploring and empowered that exploration through
            mathematical understanding.
          </Body>
          <Body>
            <Principle>Growth.</Principle> Powerful ideas grow with people, and
            we wanted our design to do the same. Toddlers build simple
            structures with Duplo, then more complex objects with Lego, then
            moving parts with Technic, and even robotics with Mindstorms.
          </Body>
          <Body>
            Can we build an environment which continues to reward deeper
            understanding, becoming ever more empowering as its occupants grow?
          </Body>
          <Body noBottomMargin>
            We imagined a world where children can eventually "look behind"
            everything in their environment to a deeper mathematical
            representation. As students understand more math, they can redefine
            more of their world.
          </Body>
        </BodyAndSidebar>
        <Hairline />
        <Heading>Weaving it all together</Heading>
        <StoryboardElement storyboardElementNumber={1}>
          <Body>
            We start in a scene that deliberately evokes depth and leaves space
            for the child’s imagination to participate. What’s hiding among the
            trees? Does the character live inside a tree?
          </Body>
          <Body>
            A coordinate indicator trails the character. If the child explores
            walks left from the red-door-tree, they’ll discover negative
            x-coordinates.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={2}>
          <Body>
            The coordinate system expresses the character's position in a way
            that children can naturally relate to their own experience of their
            body in the world.
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
            will help the character by being the holding place for things that
            the character can collect: “quantity-bricks”, operators, and tools.
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
            and keeping track of what's been counted and what hasn't.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={6}>
          <Body>
            This child discovered that they can build themselves a staircase of
            quantity-bricks. To sort the bricks by length, they compared
            quantities.
          </Body>
          <Body>
            Now our character can reach the yellow door. What's inside the tree?
          </Body>
          <Body>
            There were many solutions the student could have used to reach the
            door. Can you, the reader, think of others?
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={7}>
          <Body>
            We reward curiosity with more opportunity for exploration. Inside
            the tree, children can play with the relationship between numbers
            and sound; pitches correspond to quantities.
          </Body>
          <Body>
            <em>
              Computer graphics and computer generation of music are outstanding
              opportunities to experience the link between beauty and math.
            </em>{" "}
            This is because computers are great at translating in realtime
            between alternate representations.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={8}>
          <Body>
            The world is packed with these kinds of creative activities. For
            example, computationally generated flowers can be altered with
            quantity-bricks.
          </Body>
          <Body>
            Over time, more “tools”, or properties, are revealed: control over
            color, size, angle—as well as operators on those numbers.
          </Body>
          <Body>
            At any time, learners can choose to “look behind” an activity to see
            its underlying mechanics. This could take the form of source code.
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
            curious what might exist up far above the trees, they may try and
            get there but setting the ladder’s height to a huge number. They
            wouldn’t be able to collect a quantity large enough by counting,
            which would inspire the need for repetition or scaling, bases for
            the concepts of multiplication and exponentiation.{" "}
          </Body>
          <Body>
            In this case, the child has discovered the power of exponential
            growth and discovered a whole new world.
          </Body>
        </StoryboardElement>
        <Hairline />
        <Heading>Conclusion</Heading>
        <Body wide>
          We’ve taken a few steps down this road, but we know that as a human
          race we’re just barely getting started on this journey. We believe
          educational technology has the potential to be so much more empowering
          than it is today. We reject a future in which children robotically
          compute answers to arithmetic worksheets. We dream of a future filled
          with curious explorers and lifelong learners, solving important human
          problems. We’ll continue to experiment in this space as part of our
          long-term research, but we hope that these sketches and design
          principles inspire others to join us in pushing toward a humane future
          of learning technology.
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
    </div>;
}

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

  title: {
    color: "white",
    marginBottom: 20,
    ...globalStyles.typography.subjectHeadingDesktop,
    lineHeight: "50px",
    paddingTop: 108,
    [mediaQueries.smOrSmaller]: {
      paddingTop: 82,
      ...globalStyles.typography.subjectHeadingMobile,
    },
    maxWidth: 700,
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
});
