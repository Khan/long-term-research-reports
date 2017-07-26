import { StyleSheet, css } from "aphrodite";
import React from "react";
import globalStyles from "webapp/shared-styles-package/global-styles";
import mediaQueries from "webapp/shared-styles-package/media-queries";

import Forest from "./forest";

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
      <div className={css(styles.forestFlatBackground)} />
      <div className={css(styles.forestContainer)}>
        <Forest />
      </div>
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

const PrototypeExample = ({ heading, children }) =>
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
      <div className={css(styles.placeholder)} style={{ height: 438 }} />
    </div>
  </div>;

const StoryboardElement = ({ storyboardElementNumber, children }) =>
  <div className={css(styles.storyboardElement)}>
    <div className={css(styles.storyboardFigure)}>
      <div
        className={css(styles.placeholder)}
        style={{ height: 450, width: "100%" }}
      />
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

const Report = () =>
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
        world by playing with the mathematical properties of the elements within
        it.
      </p>
      <Hairline />
      <Heading>Early sketches and prototypes</Heading>
      <div
        className={css(styles.placeholder)}
        style={{ width: "100%", height: 584 }}
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
      <PrototypeExample heading="Altering the world using handwritten numbers">
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
      <Subheading>And more!</Subheading>
      <Body wide>
        We brainstormed, sketched, and prototyped. Some experiments focused on
        specific interactions; others refined our principles or broader
        architecture. Here’s a peek at other sketches and process.
      </Body>
      <div
        className={css(styles.placeholder)}
        style={{ width: "100%", height: 388, marginTop: 32 }}
      >
        [carousel here]
      </div>
      <Hairline />
      <Heading>Design principles</Heading>
      <BodyAndSidebar>
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
          The coordinate system expresses the character's position in a way that
          children can naturally relate to their own experience of their body in
          the world.
        </Body>
        <Body>
          New items that spark curiosity appear throughout the journey—like this
          yellow door just out of reach, partway up a tree.
        </Body>
      </StoryboardElement>

      <StoryboardElement storyboardElementNumber={3}>
        <Body>
          Tapping something that’s out of reach reveals its distance from the
          player. In this case, the yellow door’s y-distance from the ground is
          shown as being “7”. The concept of distance is introduced because the
          learner has shown us, through interaction, that they’re curious.
        </Body>
      </StoryboardElement>

      <StoryboardElement storyboardElementNumber={4}>
        <Body>
          The character can’t yet reach the yellow door, so they continue on and
          befriend a little basket with its own coordinates. The basket will
          help the character by being the holding place for things that the
          character can collect: “quantity-bricks”, operators, and tools. These
          are mathematical properties with which to build or mold the world.
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
          We reward curiosity with more opportunity for exploration. Inside the
          tree, children can play with the relationship between numbers and
          sound; pitches correspond to quantities.
        </Body>
        <Body>
          <em>
            Computer graphics and computer generation of music are outstanding
            opportunities to experience the link between beauty and math.
          </em>{" "}
          This is because computers are great at translating in realtime between
          alternate representations.
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
          curious what might exist up far above the trees, they may try and get
          there but setting the ladder’s height to a huge number. They wouldn’t
          be able to collect a quantity large enough by counting, which would
          inspire the need for repetition or scaling, bases for the concepts of
          multiplication and exponentiation.{" "}
        </Body>
        <Body>
          In this case, the child has discovered the power of exponential growth
          and discovered a whole new world.
        </Body>
      </StoryboardElement>
      <Hairline />
      <Heading>Conclusion</Heading>
      <Body wide>
        We’ve taken a few steps down this road, but we know that as a human race
        we’re just barely getting started on this journey. We believe
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
        This report was written by May-Li Khoe, Andy Matuschak, and Scott
        Farrar, documenting research primarily conducted in 2015 by May-Li Khoe,
        Andy Matuschak, and Jason Brennan. Illustrations by May-Li Khoe and
        Natalie Fitzgerald.
      </Body>
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
          Dewey, John. 1938. <em>Experience and education</em>. Kappa Delta Pi.
        </FurtherReadingItem>
        <FurtherReadingItem>
          Montessori, Maria. 1912. <em>The Montessori method</em>. Frederick A.
          Stokes Company.
        </FurtherReadingItem>
        <FurtherReadingItem>
          Kamii, Constance. 1985.{" "}
          <em>
            Young children reinvent arithmetic: implications of Piaget's theory
          </em>. Teachers College Press.
        </FurtherReadingItem>
      </ul>
    </div>
  </div>;
export default Report;

const styles = StyleSheet.create({
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

  sidebarItem: {
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

  principleTitle: {
    fontWeight: "bold",
  },

  placeholder: {
    backgroundColor: "#D8D8D8",
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

  heroContainer: {
    height: 615,
    [mediaQueries.smOrSmaller]: {
      height: 322,
      marginBottom: 8,
      maxHeight: "100vh",
    },
  },

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
    [mediaQueries.smOrSmaller]: {
      transform: "scale(0.42)",
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
