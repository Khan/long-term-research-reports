import { StyleSheet, css } from "aphrodite";
import React from "react";
import globalStyles from "webapp/shared-styles-package/global-styles";

import Forest from "./forest";

const HeroHeader = () =>
  <div
    style={{
      margin: "0 auto",
      width: 1366,
      position: "relative",
      height: 615,
      overflow: "hidden",
    }}
  >
    <div style={{ transform: "scale(0.8)", transformOrigin: "0 0" }}>
      <Forest />
    </div>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: -607,
        bottom: 0,
        right: 0,
        width: 2025,
        height: 622,
        background:
          "linear-gradient(-179deg, rgba(21,89,104,0.27) 41%, rgba(0,0,0,0.00) 76%)",
        pointerEvents: "none",
        userSelect: "none",
      }}
    />

    <div
      style={{
        position: "absolute",
        left: 100,
        top: 108,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <h1
        style={{
          color: "white",
          fontFamily: "'Proxima Nova', sans-serif",
          fontWeight: 600,
          lineHeight: "49px",
          fontSize: 50,
          textAlign: "left",
          marginBottom: 20,
        }}
      >
        Empowering children<br />through mathematical concepts
      </h1>
      <h2
        style={{
          color: "white",
          fontFamily: "'Proxima Nova', sans-serif",
          fontSize: 17,
          fontWeight: 600,
          lineHeight: "20px",
          textAlign: "left",
          width: 665,
        }}
      >
        We envision a future filled with curious explorers who have passion and
        preparedness to solve important problems for our planet. How might
        educational technology move beyond fancily animated quizzes, and into
        the realm of early empowerment?{" "}
      </h2>
    </div>
</div>;


const Hairline = () => <div className={css(styles.hairline)} />;

const Body = ({ children, noBottomMargin }) =>
  <p className={css(styles.body, noBottomMargin ? styles.noBottomMargin : undefined)}>
    {children}
</p>;

const Heading = ({ children }) =>
<h2 className={css(styles.heading)}>{children}</h2>

const Subheading = ({ children, noTopMargin }) =>
  <h3
    className={css(
      styles.subheading,
      noTopMargin ? styles.noTopMargin : undefined,
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

const PrototypeExample = ({ heading, videoCaption, children }) =>
  <div className={css(styles.prototypeExample)}>
    <div className={css(styles.leftColumn)}>
      <Subheading noTopMargin>
        {heading}
      </Subheading>
      {children}
    </div>
    <div className={css(styles.prototypeVideo)}>
      <div className={css(styles.placeholder)} style={{ height: 438 }} />
      {videoCaption
        ? <p className={css(styles.figureCaption, styles.noBottomMargin)}>
            {videoCaption}
          </p>
        : null}
    </div>
  </div>;

const Principle = ({ children }) =>
  <span className={css(styles.principleTitle)}>
    {children}
  </span>;

const Report = () =>
  <div className={css(styles.container)}>
    <HeroHeader />
    <div className={css(styles.reportBodyContainer)}>
      <p className={css(styles.lede)}>
        During the spring of 2015, we studied the landscape of mathematical
        learning software for kids, particularly in the pre-kindergarten and
        kindergarten range. We noticed an opportunity to investigate what it
        would mean to <em>
          empower children through mathematical concepts
        </em>—give them a space where they can create, explore, and mold their
        world by playing with the mathematical properties of the elements within
        it.
      </p>
      <Hairline />
      <Heading>Early sketches and prototypes</Heading>
      <div
        className={css(styles.placeholder)}
        style={{ width: "100%", height: 874 }}
      />
      <p className={css(styles.figureCaption)}>TODO: figure caption.</p>
      <p className={css(styles.body, styles.wideParagraph)}>
        We began the project by spending many weeks talking to experts,
        surveying the product landscape, reading associated research, and
        interviewing students, parents, and teachers. Insights from that
        background research informed our design principles, which we’ll explain
        shortly—but they’ll make more sense after we give you a taste of the
        sketches they inspired.
      </p>
      <PrototypeExample heading="Singing through touch">
        <Body>
          Our very first idea explored: what are all the ways a child might
          input a number? If you ask a kid their age, they often hold up their
          fingers – sometimes before they start saying the number. We prototyped
          ways we might take advantage of multi-touch input to connect multiple
          fingers on the screen to a display of symbolic quantity.
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
        videoCaption={
          <span>
            {/* TODO: Add links. */}
            Inspired by Scribblenauts, Harold and the Purple Crayon and more.
          </span>
        }
      >
        <Body>
          Handwriting was another natural input method. This, alongside our
          observations that many kids don’t yet feel in control of their
          situation and are often told what to do – made us feel that giving
          them control of a little digital world is a welcome break from the
          norm. In this sketch, we wondered if we could translate the students’
          number expression abilities into something personally meaningful: the
          ability to precisely modify their world with numbers.
        </Body>
        <Body>Want to see what a hundred birds looks like? Just ask.</Body>
      </PrototypeExample>
      <PrototypeExample heading="Subtraction blocks">
        <Body>
          We kept asking ourselves:{" "}
          <a href="http://klr.tumblr.com/post/153279790133/whats-so-great-about-the-digital-medium-again">
            what’s <em>only</em> possible in the dynamic medium?
          </a>
        </Body>
        <Body>
          Digital objects can disappear into thin air. We thought that might
          make for an interesting new angle on subtraction. Here the student can
          build a staircase down to the mysterious character below using
          negative “ghost blocks.”
        </Body>
      </PrototypeExample>
      <PrototypeExample heading="Place-value cards">
        <Body>
          Our background research helped us get familiar with existing
          manipulatives for early learning, such as place-value cards. In the
          digital medium, these “tens-place” and “ones-place” cards can be
          manipulated individually or stacked on top of each other to represent
          a single two-digit number. The cards’ interactions implicitly
          illustrate decomposition in the base-ten number system—that 27 is the
          same as 20 + 7.
        </Body>
        <Body>
          Unlike a physical version of these cards, kids can adjust the
          quantities in place, seeing their impact on another representation,
          like these birds.
        </Body>
      </PrototypeExample>
      <PrototypeExample heading="And more!">
        <Body>
          We brainstormed, sketched, and prototyped. Some experiments focused on
          specific interactions; others refined our principles or broader
          architecture. Here’s a peek at other sketches and process.
        </Body>
      </PrototypeExample>
      <div
        className={css(styles.placeholder)}
        style={{ width: "100%", height: 388, marginTop: 32 }}
      >
        [carousel here]
      </div>
      <Hairline />
      <BodyAndSidebar>
        <Heading>Design principles</Heading>
        <Body>
          Our investigations gave rise to deeper ideas that we used to challenge
          ourselves when designing solutions in this space. They continue to
          drive our research today.
        </Body>
        <Subheading>Learning through discovery</Subheading>
        <Body>
          If you move to a new city where you don’t speak the language, you’ll
          pick it up. If you engage with your new city, your life becomes
          entangled with it. Interacting more deeply with your surroundings
          means interacting more deeply with the language and culture.
        </Body>
        <SidebarItem top={300}>
          <div className={css(styles.placeholder)} style={{ height: 298 }} />
        </SidebarItem>
        <Body>
          Learning games often feel bolted onto their subjects like
          chocolate-covered broccoli: the game mechanics could just as well be
          used to incentivize other random tasks. Learning games often motivate
          with badges or scoreboards, but learning language in a city is
          constantly motivated by rich interactions inextricable from daily
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
          mathematics. If they improve at manipulating their world, they improve
          at manipulating mathematics. We believe the world doesn't need a
          trophy system: the desire to explore, interact, and create is
          motivation enough.
        </Body>
        <Body>
          <Principle>Creativity.</Principle> With creative freedom and
          exploration comes a wider variety of learning paths. One child might
          construct a mathematical concept through a generative painting;
          another might form the same idea making digital music. To learn, we
          connect new ideas to preexisting ones. A prescribed learning path
          allows no agency or creativity for the learner, their only option is
          compliance. But if children have agency in the mathematical activity,
          they'll find learning paths from their own entry points. We can still
          prescribe experiences in the design of our world, but ultimately, the
          paths are forged by the learner.
        </Body>
        <Body>
          <Principle>Conceptual understanding.</Principle> Because children are
          uncovering that learning path themselves, it’s more likely that
          they’ll understand why the entangled mathematical ideas behave as they
          do—not just how to perform an algorithm. With procedural
          understanding, we’re stuck as soon as we fall off a path we recognize.
          With conceptual understanding, we can correct our own errors and
          combine ideas in creative ways. That creativity leads to yet more
          learning paths and yet more understanding: the cycle continues.
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
          creativity helps children connect new ideas to old ones when learning.
          That creative mindset also makes the activity personally relevant to
          the child, forming an emotional bond that can inspire their
          involvement without outside coercion.
        </Body>
        <Body>
          <Principle>Curiosity.</Principle> Our art direction’s all about
          setting the stage for curiosity. For instance, in the scenario above,
          we’ve deliberately added lots of depth and occlusion. The child’s
          entering a whole new world, but we’re leaving space for their
          imagination, a feeling of possibility and a sense of adventure. The
          imagination, combined with the environment, evokes much more than we
          could have rendered ourselves.
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
          Mathematical ideas are incredibly empowering! Can we create activities
          which reflect that power—which we’re genuinely and personally excited
          to share—rather than condescending tasks we pretend are interesting so
          that kids will learn “what's good for them”?
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
          <Principle>Growth.</Principle> Powerful ideas grow with people, and we
          wanted our design to do the same. Toddlers build simple structures
          with Duplo, then more complex objects with Lego, then moving parts
          with Technic, and even robotics with Mindstorms.
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
    </div>
  </div>;
export default Report;

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 96,
    width: 1366,
  },

  reportBodyContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 1166,
  },

  lede: {
    fontSize: 20,
    lineHeight: 1.5,
    width: 722,
    margin: "40px auto",
    display: "block",
  },

  heading: {
    marginTop: 39,
    marginBottom: 26,
    color: globalStyles.colors.gray17,
    ...globalStyles.typography.conceptHeadingDesktop,
  },

  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 1.5,
    marginTop: 47,
  },

  figureCaption: {
    color: globalStyles.colors.gray41,
    ...globalStyles.typography.caption,
    fontStyle: "normal",
    marginTop: 8,
    marginBottom: 38,
  },

  noTopMargin: {
    marginTop: 0,
  },

  noBottomMargin: {
    marginBottom: 0,
  },

  body: {
    ...globalStyles.typography.bodyLarge,
  },

  wideParagraph: {
    width: 945,
  },

  prototypeExample: {
    marginTop: 32,
    [":first-of-type"]: {
      marginTop: 50,
    },
    display: "flex",
  },

  leftColumn: {
    width: 564,
  },

  prototypeVideo: {
    marginLeft: "auto",
    width: 584,
  },

  bodyAndSidebar: {
    display: "flex",
    position: "relative",
  },

  sidebarItem: {
    position: "absolute",
    left: 721,
    width: 446,
  },

  principleTitle: {
    fontWeight: "bold",
  },

  placeholder: {
    backgroundColor: "#D8D8D8",
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
});
