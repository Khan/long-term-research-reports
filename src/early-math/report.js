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
      <strong>Design and research:</strong> Jason Brennan, May-Li Khoe, Andy
      Matuschak.{" "}
    </div>
    <div className={css(styles.authorLine)}>
      <strong>Illustrations:</strong> Natalie Fitzgerald, May-Li Khoe.{" "}
    </div>
    <div className={css(styles.authorLine, styles.authorListingAsterisk)}>
      Authors listed alphabetically in sections. September 25, 2017.
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

class VideoPlayer extends React.Component {
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
        const playingPromise = this.videoRef.play();
        playingPromise.catch(() => {
          this.videoRef.controls = true;
        })
      } else {
        this.videoRef.pause();
      }
    }
  };

  render = () => (
    <VisibilitySensor
      partialVisibility
      onChange={this.onVisibilityChange}
      delayedCall={false}
      intervalCheck
      scrollCheck
      resizeCheck
    >
      <div>
        <video
          ref={videoRef => (this.videoRef = videoRef)}
          src={this.props.url}
          muted={this.props.muted || this.state.muted}
          loop
          playsInline
          preload
          type="video/mp4"
          style={{ width: "100%" }}
        />
        {this.props.muted ? null : (
          <button
            style={{
              width: 68,
              height: 68,
              position: "absolute",
              bottom: 10,
              left: 10,
              border: "none",
              backgroundColor: "transparent",
              padding: 0,
              backgroundImage: this.state.muted
                ? "url('/images/long-term-research/reports/early-math/soundOn.png')"
                : "url('/images/long-term-research/reports/early-math/soundOff.png')",
              backgroundSize: "100%",
            }}
            onClick={this.onToggleAudio}
          />
        )}
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
        <BodyAndSidebar>
          <Body wide>
            Plenty of grown-up artists, scientists, and engineers find math
            empowering and beautiful. We wondered:{" "}
            <em>
              how might we help more kids experience what math lovers
              experience?
            </em>{" "}
            We explored designs for a world where everything wears its math on
            its sleeve—where children can create and have adventures by playing
            with the numbers behind every object. You canʼt visit that world
            yet, but we hope our sketches and prototypes will inspire you to see
            a new angle on educational technology.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <SidebarItem>
            <Figure
              caption={
                <span>
                  This classic photo from Papertʼs{" "}
                  <a href="https://mindstorms.media.mit.edu">
                    <em>Mindstorms</em>
                  </a>{" "}
                  paints a playful relationship with learning weʼd love to see
                  every child experience.
                </span>
              }
            >
              <img
                src="/images/long-term-research/reports/early-math/4-principles/3-emotional-connectedness.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
            <div className={css(styles.hideOnMobile)}>
              {/* Note that this paragraph is duplicated below for mobile */}

              <Figure caption="The space alien theme might taste like chocolate at first, but itʼs covering the same old broccoli!">
                <img
                  src="/images/long-term-research/reports/early-math/4-principles/1-broccoli.jpg"
                  style={{ width: "100%" }}
                />
              </Figure>
            </div>
          </SidebarItem>
          <Body>
            Why a <em>world</em>, anyway? Seymour Papert, one key inspiration,{" "}
            <a href="https://www.youtube.com/watch?v=_l7TR6r8MK8&feature=youtu.be">
              said
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
            they could have been used to incentivize any random task.
          </Body>
          <div className={css(styles.hideUnlessMobile)}>
            {/* Note that this paragraph is duplicated below for mobile */}

            <Figure caption="The space alien theme might taste like chocolate at first, but itʼs covering the same old broccoli!">
              <img
                src="/images/long-term-research/reports/early-math/4-principles/1-broccoli.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
          </div>
          <Body>
            Kids learning language are constantly motivated by rich interactions
            inextricable from daily life. How might we create the same kinds of
            interactions in “Mathland,” so that learning math becomes as
            intrinsically motivating as learning language?
          </Body>
          <Body noBottomMargin>
            We imagined an{" "}
            <em>open-ended adventure in a playful world of creative math</em>.
            We imagined a world full of secrets worth exploring—and connected
            that exploration to mathematical understanding. We wanted to show
            students just how empowering math can be.
          </Body>
        </BodyAndSidebar>

        <Heading>A day in Mathland</Heading>
        <Body wide>
          We sketched and prototyped a huge variety of possibilities, but letʼs
          begin by walking through a full adventure in one potential
          manifestation.
        </Body>
        <StoryboardElement storyboardElementNumber={1}>
          <Body>
            We start in a scene that evokes depth with its art direction,
            leaving space for the child’s imagination to participate. What’s
            hiding among the trees? Does the character live inside a tree?
          </Body>
          <Body>
            A coordinate indicator trails the character, immediately linking
            their actions to numbers in a way that children can naturally relate
            to their own experience of their body in the world.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={2}>
          <Body>
            The child descends the steps. If they walk left from the
            red-door-tree, they’ll get a first taste of negative numbers! The
            computer doesn’t demand answers about the Cartesian grid model:
            instead, with infinite patience, it surfaces that model by
            reflecting the child’s actions in the environment.
          </Body>
          <Body>
            New items that spark curiosity appear throughout the journey—like
            this yellow door just out of reach, partway up a tree. Whatʼs behind
            that door?
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={3}>
          <Body>
            If something is out of reach, tapping it reveals its distance from
            the ground. In this case, the yellow door’s distance is shown as
            “7.”
          </Body>
          <Body>
            We introduce the concept of distance because the learner has shown
            us, through interaction, that they’re curious about it.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={4}>
          <Body>
            The character can’t yet reach the yellow door, so they continue on
            and befriend a little basket with its own coordinates.
          </Body>
          <Body>
            The basket will help the child by holding things the character can
            collect like “quantity-bricks,” operators, and tools. Students will
            use these mathematical objects to create in the world.
          </Body>
          <Body>
            In education, itʼs easy to focus on cognition and lose sight of
            studentsʼ emotions. But in this world, something as mundane as a
            tool palette becomes a friend. By intentionally creating space for
            emotional connections (this is just one type), we pave the way for a
            deep, enduring relationship between a child and learning.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={5}>
          <Body>
            Children can “harvest” flowering plants to make quantities. For
            example, as the player taps three flowers on a single stem, they
            fill and collect a “3” quantity-brick. For now, if they want a “4”
            brick, theyʼll need to find and count 4 of something.
          </Body>
          <Body>
            Each flower blooms when tapped. This gentle feedback scaffolds{" "}
            <a href="https://www.educateiowa.gov/sites/files/ed/documents/8017g%20Elem%20CLP%20with%20descriptors.pdf">
              one-to-one correspondence counting
            </a>, visually tracking whatʼs been counted and what hasnʼt.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={6}>
          <Body>
            This child discovered that they can build themselves a staircase of
            quantity-bricks. To build this staircase, they had to sort the
            bricks by length, reinforcing their ability to compare number
            quantities.
          </Body>
          <Body>
            There were many ways they might have reached the door. What if they
            had different quantity bricks in their basket? What if they had no
            brick with length 5? How might they creatively clear these hurdles?
            Can you think of other ways to reach the door?
          </Body>
          <Body>
            Now we’ve reached the yellow door. Whatʼs inside the tree?
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
              Computer-generated art and music are outstanding opportunities to
              experience the link between beauty and math.
            </a>{" "}
            That’s because computers can translate between familiar forms of
            numbers and these alternative representations in real time.
          </Body>
          <Body>
            Mathematical ideas are deeply empowering! Can we create activities
            which reflect that power—which weʼre genuinely excited to share?
            Letʼs not make tasks we <em>pretend</em> are interesting so that
            kids will learn “what's good for them.” We believe that genuine
            interest will follow from empowerment, and successful learning will
            follow from genuine interest.
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={8}>
          <Body>
            We’ve scattered these kinds of creative activities everywhere. For
            instance, children can alter computationally-generated flowers with
            quantity-bricks.
          </Body>
          <Body>
            Powerful ideas grow with people, and we wanted our design to do the
            same. Toddlers build simple structures with Duplo, then more complex
            objects with Lego, then moving parts with Technic, and even robotics
            with Mindstorms. Over time, we reveal more “tools” and properties of
            objects in the world. Students eventually gain control over color,
            size, angle—as well as operators on those numbers.
          </Body>
          <Body>
            Learners can choose to “look behind” an activity to see its
            underlying mechanics. In the tradition of{" "}
            <a href="https://en.wikipedia.org/wiki/HyperCard">Hypercard</a> and
            Flash, we can support kids in digging all the way down to source
            code!
          </Body>
        </StoryboardElement>

        <StoryboardElement storyboardElementNumber={9}>
          <Body>
            Children can combine operators and tools in powerful ways with
            properties of objects in the world. For example, if the character
            happens upon a ladder, they can manipulate either its height
            attribute, or its number of rungs. To make a ladder both taller and
            climbable, theyʼll need to do both!
          </Body>
          <Body>
            High school courses cover operators and abstract properties , but we
            can smooth the ramp by allowing kids to experienced them less
            formally years earlier.
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

        <Heading>Zooming in</Heading>
        <Body wide>
          On the road to creating the story we just told, we prototyped and
          sketched dozens of ideas. Weʼd like to show some of them in more
          detail now; weʼll use them to illustrate how we thought about
          developing this world.
        </Body>

        <PrototypeExample
          heading="Creative empowerment"
          figure={
            <VideoPlayer
              url="/videos/long-term-research/reports/early-math/pixel-art-ruler.mp4"
              muted
            />
          }
        >
          <Body>
            What if painting by numbers really meant{" "}
            <em>painting by numbers?</em> Can we reveal the number patterns and
            ratios in pixel art? Can we turn something like traditional
            kindergarten number blocks into a powerful drawing tool?
          </Body>
          <Body>
            This prototype, like the computational flower and music environments
            above, illustrates our emphasis on creative empowerment. Creative
            activities are a great way to achieve{" "}
            <a href="https://design.blog/2016/08/25/mitchel-resnick-designing-for-wide-walls/">
              low floors, wide walls, and high ceilings
            </a>: theyʼre accessible to novices, theyʼre exciting for experts,
            and they support many pathways to engage each childʼs individual
            interests. Those properties help make the activity personally
            relevant to the child,{" "}
            <a href="http://life-slc.org/docs/barron-self-sustainedlearning.pdf">
              forming an emotional bond that can inspire their involvement
              without outside coercion
            </a>.
          </Body>
          <Body>
            So many adult artists and scientists love math because it empowers
            them creatively. We wanted to bring that same feeling to children.
          </Body>
        </PrototypeExample>

        <PrototypeExample
          heading="Entanglement"
          figure={
            <VideoPlayer
              url="/videos/long-term-research/reports/early-math/subtraction-blocks.mp4"
              muted
            />
          }
        >
          <Body>
            How might you make stairs out of a rectangular chunk of blocks?
            Carve away positive blocks using negative, fixed-quantity “ghost
            blocks”! Now you can climb down and see what that catʼs up to…
          </Body>
          <Body>
            We tried to make creative activities where math really does give
            learners superpowers—where they manipulate their world{" "}
            <em>through</em> manipulating math. That way, when kids improve at
            manipulating math, they improve at making things in their world.
          </Body>
          <Body>
            The math isnʼt bolted on here: the playerʼs actions and the
            underlying mathematical ideas form a well-connected <em>system</em>,
            which in turn helps students develop well-connected understanding.
            We want students to think of <em>math itself</em> as a
            well-connected system. If we give them math toys which suggest a
            jumble of dissociated ideas, they may come to perceive math itself
            that way.
          </Body>
        </PrototypeExample>

        <PrototypeExample
          heading="Conceptual understanding"
          figure={
            <VideoPlayer
              url="/videos/long-term-research/reports/early-math/place-value-cards.mp4"
              muted
            />
          }
        >
          <Body>
            Kids can use these “tens-place” and “ones-place” cards individually
            to describe numbers. But if you stack two cards, they represent a
            single two-digit number. These cards implicitly illustrate place
            value—the idea that 27 is the same as 20 + 7.
          </Body>
          <Body>
            Kids can morph these cards’ values by scrubbing them with their
            finger. What if students could see their own manipulations play out
            in visual quantities? Play with the tens card, and: whoa. You’re
            adding ten birds at a time!
          </Body>
          <Body>
            We tried to design interactions which would{" "}
            <a href="http://www.nctm.org/uploadedFiles/Standards_and_Positions/PtAExecutiveSummary.pdf">
              help kids understand the <em>meaning</em> of number operations—not
              just how to perform procedures like adding numbers
            </a>. One key way we did that was by connecting concrete, symbolic,
            and abstract representations. Here, the child simultaneously
            manipulates birds, digits, and interesting place value operations.
          </Body>
          <Body>
            We imagined a world where children can "look behind" an object in
            the digital world to see more abstract representations. A child
            might first describe a flower by{" "}
            <a href="https://en.wikipedia.org/wiki/Van_Hiele_model#Van_Hiele_levels">
              its holistic shape
            </a>, but as they develop, they’ll see how its petals abstractly
            relate to leaves of a tree. Then they’re ready to control the
            patterns that petals follow: the child can climb{" "}
            <a href="http://worrydream.com/LadderOfAbstraction/">
              up and down the ladder of abstraction
            </a>.
          </Body>
        </PrototypeExample>

        <PrototypeExample
          heading="Interpersonal connectedness"
          figure={
            <VideoPlayer
              url="/videos/long-term-research/reports/early-math/gallery.mp4"
              muted
            />
          }
        >
          <Body>
            Hey: youʼve made lots of great stuff in this world! Which creations
            do you like best? Why? Let’s put those up on the wall for your
            friends to see.
          </Body>
          <Body>
            Interpersonal interactions can prompt their own rich emotional
            connections. As children create and discover in this world, we can
            help them share their inventions and experiences with loved ones.
            Creative mathematical adventures can lead to laughter, oohs and
            ahhs, traded stories, and{" "}
            <a href="https://books.google.com/books?hl=en&lr=&id=0xq7dqtvSysC&oi=fnd&pg=PA171#v=onepage&q&f=false">
              more learning from great conversation
            </a>.
          </Body>
          <Body>
            Social interactions offer{" "}
            <a href="https://en.wikipedia.org/wiki/Social_learning_theory">
              all kinds of opportunities to learn
            </a>: students can compare their work to othersʼ, adopt othersʼ
            strategies, and practice thinking about strategies and norms—not
            just numbers themselves.
          </Body>
        </PrototypeExample>

        <Heading>Taking the medium seriously</Heading>
        <Body wide>
          People have been exploring how to help kids learn through creative,
          playful environments since{" "}
          <a href="https://en.wikipedia.org/wiki/Kindergarten#Spread">
            the first kindergarten
          </a>. We launched this design exploration with a suspicion: that the
          modern dynamic medium can support powerful new kinds of mathematical
          creativity and play. So many digital math toys feel like direct
          translations of existing ideas. We kept asking ourselves: whatʼs{" "}
          <a href="http://klr.tumblr.com/post/153279790133/whats-so-great-about-the-digital-medium-again">
            <em>only</em> possible in the dynamic medium?
          </a>{" "}
          In this section, weʼll explore some of what we found through the lens
          of more prototypes.
        </Body>

        <PrototypeExample
          heading="Singing through touch"
          figure={
            <VideoPlayer url="/videos/long-term-research/reports/early-math/2-sing-through-touch.mp4" />
          }
        >
          <Body>
            What are all the ways a child might <em>input</em> a number? If you
            ask a kid their age, they often hold up their fingers as an answer.
            That gesture inspired us to play with ways we might connect fingers
            on a screen to quantities they might manipulate.
          </Body>
          <Body>
            As we tried out our prototype, we realized we could assign a note to
            each number. With this interaction, a childʼs natural
            gesture—holding up some fingers to indicate a number—becomes a
            musical instrument. Thereʼs no barrier to entry and no wrong answer:
            touch anything. The device responds instantly.
          </Body>
        </PrototypeExample>

        <PrototypeExample
          heading="Altering the world through handwritten numbers"
          figure={
            <VideoPlayer
              url="/videos/long-term-research/reports/early-math/scribblemath.mp4"
              muted
            />
          }
        >
          <Body>
            Handwriting is another natural way to express numbers. Itʼs also
            important because it supports students in using the symbolic
            representation of numbers: digits. You can write numbers in the real
            world, but in the dynamic medium, we can interpret what youʼve
            written to <em>morph things in the world.</em>
          </Body>
          <Body>
            Here, instead of asking students to use handwriting to answer a
            fixed math problem, we gave kids a scene they can alter with
            whatever numbers they can write. Want to see what thirty-three birds
            looks like? Handwrite 33!
          </Body>
        </PrototypeExample>

        <PrototypeExample
          heading="Connecting sensors to quantities"
          figure={
            <VideoPlayer
              url="/videos/long-term-research/reports/early-math/3-connecting-to-sensors.mp4"
              muted
            />
          }
        >
          <Body>
            Playing with sensors is fun! And it’s always interesting to connect
            the digital back into the physical world. Could we connect movement
            or sensors to numbers? In this prototype, we imagined that kids
            could hook a gear, a weight, and some string up to a number to
            control its value by rotating their device.
          </Body>
          <Body>
            In another related prototype, we tried giving kids a special camera
            that let them measure or count objects in the real world.
          </Body>
        </PrototypeExample>

        <Body wide>
          We sketched so many ideas about the dynamic medium! If youʼre still
          hungry for more, weʼve selected a few additional favorites you can
          explore below.
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
              <VideoPlayer
                url="/videos/long-term-research/reports/early-math/3-multiplier-wand.mp4"
                muted
              />
            </Figure>
            <Body>
              What if multiplication were a superpower you could find in the
              world—and once found, you could tap on anything to multiply it?
              Want 6 of everything? Done! The dynamic medium can create
              something from nothing.
            </Body>
          </div>

          <div className={css(styles.carouselItem)}>
            <Figure>
              <VideoPlayer
                url="/videos/long-term-research/reports/early-math/infinite-scrolling.mp4"
                muted
              />
            </Figure>
            <Body>
              The dynamic medium can deal with really, really big numbers. Want
              to get a visceral feel for huge numbers? Just scroll!
            </Body>
          </div>

          <div className={css(styles.carouselItem)}>
            <Figure>
              <VideoPlayer
                url="/videos/long-term-research/reports/early-math/draw-around-to-count.mp4"
                muted
              />
            </Figure>
            <Body>
              Digital ink doesnʼt have to be used to draw digits. What if you
              could count anything in your environment by drawing a lasso around
              it? This interaction might offer interesting support for a child
              who is still learning to count objects one-to-one.
            </Body>
          </div>

          <div className={css(styles.carouselItem)}>
            <Figure>
              <img
                src="/images/long-term-research/reports/early-math/3-carousel/3-color-mixer.png"
                style={{ width: "100%" }}
              />
            </Figure>
            <Body>
              The dynamic medium can mix colors with zero mess, and with
              infinite undo. Could children start to learn about ratios using a
              color mixer that only takes numbers of color as input? What if our
              machine mixes light instead of paint?
            </Body>
          </div>

          <div className={css(styles.carouselItem)}>
            <Figure>
              <VideoPlayer
                url="/videos/long-term-research/reports/early-math/split-blocks.mp4"
                muted
              />
            </Figure>
            <Body>
              In this prototype, we imagined that you could find a special wedge
              in the world which gave you the power to slice numbers into parts
              through direct manipulation. As you bring one slice close to the
              other, it might suggest they could snap back together.
            </Body>
          </div>

          <div className={css(styles.carouselItem)}>
            <Figure>
              <VideoPlayer
                url="/videos/long-term-research/reports/early-math/add-side-to-polygon.mp4"
                muted
              />
            </Figure>
            <Body>
              Wooden polygon blocks canʼt morph into each other, but digital
              objects can morph, meld, and split under your finger.
            </Body>
          </div>
        </Slider>

        <BodyAndSidebar>
          <Heading>Onward</Heading>
          <SidebarItem top={30}>
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
            We dream of helping kids experience what math lovers experience.
            Curiosity! Wonder! Creative superpowers! Poetry!
          </Body>
          <Body>
            Weʼve shown prototypes and sketches that might point the way: create
            a world kids can mold and explore through the mathematical
            properties each object carries. By taking the dynamic medium
            seriously, we have a chance to connect simple mathematical
            manipulations to exciting consequences.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            Over two years have passed since we completed this design
            exploration. Weʼve moved onto{" "}
            <a href="https://www.khanacademy.org/research?t=projects">
              other projects
            </a>, but weʼve carried the insights from this work in everything
            weʼve done since. Weʼre thrilled we can share them with you now. If
            these ideas sparked something in you, we hope you’ll bring them to
            your own work. Together we can spread mathematical joy near and far!
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

        <Heading>Further reading, listening, playing</Heading>
        <Body wide>
          If youʼre interested in reading more about the topics in this report,
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
            knowledge canʼt be directly transmitted; instead, learners construct
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
            documents Maria Montessoriʼs foundational work in 1912. Mitchel
            Resnick offers a modern perspective on playful learning with
            technology in{" "}
            <em>
              <a href="https://mitpress.mit.edu/books/lifelong-kindergarten">
                Lifelong Kindergarten
              </a>
            </em>{" "}
            (2017).
          </FurtherReadingItem>
          <FurtherReadingItem>
            We were inspired in art direction and in concept by wonderful
            childrenʼs books like{" "}
            <a href="https://books.google.com/books/about/Harold_and_the_Purple_Crayon.html?id=ZWlK6Y3rhiMC&printsec=frontcover&source=kp_read_button#v=onepage&q&f=false">
              Harold and the Purple Crayon
            </a>{" "}
            by Crockett Johnson and{" "}
            <a href="https://books.google.com/books/about/Journey.html?id=BOSgRVqWPCsC&printsec=frontcover&source=kp_read_button#v=onepage&q&f=false">
              Journey
            </a>{" "}
            by Aaron Becker.
          </FurtherReadingItem>
          <FurtherReadingItem>
            We imagined sound direction along the lines of{" "}
            <a href="https://www.youtube.com/watch?v=3Ei4Dxxhi_s">
              Lullatone
            </a>{" "}
            and{" "}
            <a href="https://www.youtube.com/watch?v=NZGznPUC43k">
              Las Cafeteras
            </a>.
          </FurtherReadingItem>
          <FurtherReadingItem>
            We were influenced by so many games! A few standouts:{" "}
            <a href="https://en.wikipedia.org/wiki/Journey_(2012_video_game)">
              Journey
            </a>,{" "}
            <a href="https://en.wikipedia.org/wiki/Fez_(video_game)">Fez</a>,{" "}
            <a href="https://en.wikipedia.org/wiki/Monument_Valley_(video_game)">
              Monument Valley
            </a>, and{" "}
            <a href="https://en.wikipedia.org/wiki/Braid_(video_game)">
              Braid
            </a>.
          </FurtherReadingItem>
        </ul>

        <Heading>Acknowledgements</Heading>
        <Body wide>
          Weʼd like to thank these people for their valuable thoughts along the
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
            "Sara LaHue",
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
    marginBottom: 40,
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
