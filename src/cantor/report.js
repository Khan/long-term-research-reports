import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import YouTube from "react-youtube";
import { StyleSheet, css } from "aphrodite";
import { withContentRect } from "react-measure";
import "babel-polyfill";

import angleBracketLeftIcon from "webapp/shared-styles-package/icon.angleBracketLeft.js";
import globalStyles from "webapp/shared-styles-package/global-styles";
import mediaQueries from "webapp/shared-styles-package/media-queries";
import sharedReportStyles from "../report-styles";

import Breadcrumb from "../components/breadcrumb";
import Figure from "../components/figure";

const Authors = () => (
  <h2 className={css(styles.authors)}>
    <div className={css(styles.authorLine)}>
      Scott Farrar, May-Li Khoe, Andy Matuschak<br />
      <span className={css(styles.authorListingAsterisk)}>
        (authors listed alphabetically)
      </span>
    </div>
  </h2>
);

import headerCanvasGZ from "./canvases/0-header.gz";
import negativeSpaceGZ from "./canvases/2-37-and-15.gz";
import evenOddGZ from "./canvases/2-even-odd.gz";
import primesGZ from "./canvases/2-primes.gz";
import recordYourOwnGZ from "./canvases/3-record-your-own.gz";
import promptGZ from "./canvases/3-prompt.gz";

class CantorPrototype extends React.Component {
  componentDidMount = () => {
    this.iframe.contentWindow.document.open();
    this.iframe.contentWindow.document.write(`<html><head><base href="${document
      .location.origin}" /></head><body><script type="text/javascript">
         window.addEventListener("cantor-play", function() { window.cantorRecorder.unpause() })
   window.addEventListener("cantor-pause", function() { window.cantorRecorder.pause() })
</script>
<script src="/static/long-term-research-reports/cantor-prototype-bundle.js"></script><script type="text/javascript">${this
      .props.recording
      ? `
    var data = window.pako.inflate(atob('${this.props
      .recording}'), {to: "string"});
   ${this.props.mode === "prompt"
     ? ""
     : "window.cantorRecorder.playRecordedData(data);"}
   window.recordingData = data;
   window.recordingAudioURL = "${this.props.audioURL}";
   window.recordingFollowupAudioURL = "${this.props.followupAudioURL}";
   ${this.initialVisibility ? "" : "window.cantorRecorder.pause();"}
   var updateRootLayerPosition = function() {
      if (window.innerWidth >= 1200) {
        window.rootLayer.x = window.innerWidth + ${this.props.xOffset || 0};
        window.rootLayer.y = ${this.props.yOffset || 0}
        ${this.props.isHero ? "window.setShowGridTransition(true);" : ""}
      } else if (window.innerWidth >= 768) {
        window.rootLayer.x = window.innerWidth + ${this.props.tabletXOffset ||
          this.props.xOffset ||
          0};
        window.rootLayer.y = ${this.props.tabletYOffset ||
          this.props.yOffset ||
          0}
        ${this.props.isHero ? "window.setShowGridTransition(true);" : ""}
      } else {
        window.rootLayer.x = window.innerWidth + ${this.props.mobileXOffset ||
          0};
        window.rootLayer.y = ${this.props.mobileYOffset || 0}
        ${this.props.isHero ? "window.setShowGridTransition(false);" : ""}
      }
    }
   window.onresize = updateRootLayerPosition;
   updateRootLayerPosition();`
      : "window.rootLayer.x = 100; window.rootLayer.y = 150"}
  ${this.props.mode ? `window.setCantorMode("${this.props.mode}");` : ""}
   </script></body></html>`);
    this.iframe.contentWindow.document.close();
  };

  onVisibilityChange = newVisibility => {
    this.initialVisibility = newVisibility;
    this.iframe.contentWindow.dispatchEvent(
      new Event(newVisibility ? "cantor-play" : "cantor-pause"),
    );
  };

  render = () => {
    const inner = (
      <VisibilitySensor
        partialVisibility
        onChange={this.onVisibilityChange}
        delayedCall={false}
      >
        <iframe
          ref={element => (this.iframe = element)}
          style={{ width: "100%", height: "100%" }}
        />
      </VisibilitySensor>
    );
    if (this.props.height) {
      return <div style={{ height: this.props.height }}>{inner}</div>;
    } else {
      return inner;
    }
  };
}

const HeroHeader = () => (
  <div>
    <div className={css(styles.heroContainer)}>
      <div className={css(styles.heroInteractiveContainer)}>
        <CantorPrototype
          recording={headerCanvasGZ}
          xOffset={0}
          yOffset={20}
          tabletXOffset={-120}
          mobileXOffset={-600}
          mobileYOffset={260}
          isHero
        />
      </div>
      <div className={css(styles.topBar)} />
      <div className={css(styles.heroTextContainer)}>
        <Breadcrumb color={globalStyles.domainColors("default").domain3} />
        <h1 className={css(styles.title)}>
          Numbers at play: dynamic toys make the invisible visible
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

const Body = ({ children, noBottomMargin, noTopMargin, wide, style }) => (
  <p
    className={css(
      styles.body,
      noBottomMargin ? styles.noBottomMargin : undefined,
      noTopMargin ? styles.noTopMargin : undefined,
      wide ? styles.wideParagraph : undefined,
    )}
    style={style}
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

const YouTubePlayer = withContentRect(
  "bounds",
)(({ measureRef, measure, contentRect, videoId }) => (
  <div ref={measureRef} style={{ width: "100%" }}>
    <YouTube
      videoId={videoId}
      opts={{
        width: "100%",
        height: contentRect.bounds.width * 3 / 4,
        playerVars: {
          autoplay: false,
          modestbranding: 1,
          playsinline: 1,
          showinfo: 0,
          rel: 0,
          origin: document.location.origin,
        },
      }}
    />
  </div>
));

const PrototypeExample = ({ heading, children }) => (
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
      <AudibleVideoPlayer />
    </div>
  </div>
);

const FurtherReadingItem = ({ children }) => (
  <li className={css(styles.furtherReadingItem, styles.wideParagraph)}>
    {children}
  </li>
);

export default class Report extends React.Component {
  render = () => (
    <div className={css(styles.outerClip)}>
      <div className={css(styles.container)}>
        <HeroHeader />
        {window.WebKitCSSMatrix ? null : (
          <div>
            <div
              style={{
                left: 0,
                right: 0,
                padding: 20,
                backgroundColor: globalStyles.colors.alertRed,
                position: "absolute",
                height: 100,
                marginTop: 0,
              }}
            >
              <p
                style={{
                  maxWidth: 600,
                  margin: "0 auto",
                  color: "white",
                  ...globalStyles.typography.bodyLarge,
                }}
              >
                Unfortunately, this interactive article uses modern web features
                not supported by your browser. Please view this page in{" "}
                <a href="https://google.com/chrome" style={{color: "white"}}>Chrome</a>.
              </p>
            </div>
            <div style={{ height: 100 }} />
          </div>
        )}
        <div className={css(styles.lede)}>
          <Body>
            When we think about manipulating numbers, some operations seem easy
            or obvious, and others exotic and abstract. Addition and
            multiplication by tens? Straightforward. Modular arithmetic and
            changes of base? Not exactly obvious.
          </Body>
          <Body>
            What if you had some new way to represent numbers in your head—and
            manipulate them in your hands—that made certain thoughts easier to
            think? We’ve designed new interactive representations of numbers to
            attempt just that.
          </Body>
        </div>
        <Hairline />
        <Heading>Looking at numbers in many ways</Heading>
        <BodyAndSidebar>
          <Body>
            There are many ways to think about how to add two numbers.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            For instance: what goes through your head when you try to add 37 and
            15? If you ask a classroom, you’ll hear a huge variety of answers
            drawing on different sets of mathematical ideas.
          </Body>
          <img
            className={css(styles.hideUnlessMobile)}
            src="/images/long-term-research/reports/cantor/37-and-15-mobile.png"
            style={{
              width: "100%",
              maxWidth: 320,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          />
        </BodyAndSidebar>
        <img
          className={css(styles.hideOnMobile)}
          src="/images/long-term-research/reports/cantor/37-and-15.png"
          style={{ width: "100%" }}
        />
        <BodyAndSidebar>
          <SidebarItem>
            <p className={css(styles.sidebarBody)}>
              Asking this kind of question in a classroom is itself a popular
              pedagogical strategy, called “number talks.” See{" "}
              <a href="https://www.youtube.com/watch?v=yXNG6GKFhQM">
                this quick example
              </a>{" "}
              from Jo Boaler or read more{" "}
              <a href="https://www.amazon.com/dp/1935099655/ref=cm_sw_r_cp_api_HUSqzb408FZ89">
                in this book
              </a>{" "}
              by Sherry Parrish.
            </p>
          </SidebarItem>
          <Body>
            We build our fluency with numbers incrementally from many angles. We
            might think of “seven” as being three away from ten… or as being two
            more than five… or as being almost double four. When viewed across
            numbers, these relationships can become first-class ideas of their
            own that apply to any number, like “distance to the nearest ten.”
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Figure noBorder>
            <img
              src="/images/long-term-research/reports/cantor/number-relationships.png"
              style={{ width: "100%", marginBottom: 18 }}
            />
          </Figure>
          <SidebarItem>
            <p className={css(styles.sidebarBody)}>
              This figure redrawn and adapted from one in Ed Labinowiczʼs{" "}
              <em>
                <a href="https://www.amazon.com/Learning-Children-Ed-Labinowicz/dp/0201203219">
                  Learning from Children: New Beginnings for Teaching Numerical
                  Thinking
                </a>
              </em>, which we discovered via Constance Kamiiʼs{" "}
              <em>
                <a href="https://www.amazon.com/Young-Children-Reinvent-Arithmetic-Implications/dp/0807739049">
                  Young Children Reinvent Arithmetic
                </a>
              </em>, an insightful and fascinating account of, well, young
              children reinventing arithmetic!
            </p>
          </SidebarItem>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            Different representations of numbers emphasize or obscure different
            number meanings. For example, the base-ten representation of 12
            makes a “10 + 2” decomposition natural. But the two arrangements of
            twelve circles depicted here make us think of “12 = 3 x 4” or “12 =
            4 x 3”.
          </Body>
          <SidebarItem>
            <Figure noBorder>
              <img
                src="/images/long-term-research/reports/cantor/groups-of-circles.png"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            With improved representations, certain thoughts become easier to
            think. By improving our representations, we can make powerful ideas
            more broadly accessible—or even accessible at all! Before the
            Mesopotamian base-60 number system circa 3400 BC, humans represented
            numbers using tallies or tokens. Imagine trying to think about the
            number 1,776 if you only had tick marks!
          </Body>
          <SidebarItem>
            <Figure noBorder>
              <img
                src="/images/long-term-research/reports/cantor/tick-marks.png"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            So: what new kinds of representations might make math even easier to
            think? Seymour Papert, a pioneering voice in education technology,{" "}
            <a href="http://youtu.be/_l7TR6r8MK8">
              paints the tantalizing possibilities
            </a>:
          </Body>
          <SidebarItem>
            <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
              Papertʼs 1980 manifesto on empowering children through technology,{" "}
              <a href="https://mindstorms.media.mit.edu">Mindstorms</a>, remains
              a foundational text for anyone interested in learning and
              technology.
            </p>
          </SidebarItem>
        </BodyAndSidebar>
        <p
          className={css(
            styles.body,
            styles.wideParagraph,
            styles.noTopMargin,
            styles.blockQuote,
          )}
        >
          While it’s true that most people in math class don’t learn much math,
          most kids in French class don’t learn much French. But, we don’t say
          that they are not “French-ly minded.” We don’t say that they don’t
          have a head for French because we know that if they grew up in France,
          they would learn French perfectly well. And I think that my image of
          learning mathematics is that if we all learned mathematics in
          “Mathland,” we would all learn mathematics perfectly well.
        </p>
        <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
          Papertʼs 1980 manifesto on empowering children through technology,{" "}
          <a href="https://mindstorms.media.mit.edu">Mindstorms</a>, remains a
          foundational text for anyone interested in learning and technology.
        </p>
        <BodyAndSidebar>
          <Body>
            Students have long used physical manipulatives like these plastic
            blocks to represent numbers. Manipulatives can be
            powerful—particularly because they take advantage of our
            body-awareness—but physical objects are limited by
            often-inconvenient laws of physics and practicalities of matter.
          </Body>
          <SidebarItem>
            <Figure
              caption={
                <span>
                  <p className={css(styles.sidebarBody)}>
                    Try turning your ten “ones blocks” into one “ten block”! Try
                    showing that 7 divides 112! Try…
                  </p>
                  <p className={css(styles.sidebarBody)}>
                    Photo of place value blocks ©2017{" "}
                    <a href="http://www.lakeshorelearning.com/product/productDet.jsp?productItemID=1%2C689%2C949%2C371%2C919%2C766&ASSORTMENT%3C%3East_id=1408474395181113&bmUID=1503960579934">
                      Lakeshore Learning Materials
                    </a>.
                  </p>
                </span>
              }
            >
              <img
                src="/images/long-term-research/reports/cantor/physical-blocks.jpg"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
          <Body>
            Happily, weʼre no longer limited to the practicalities of matter.{" "}
            <a href="http://klr.tumblr.com/post/153279790133/whats-so-great-about-the-digital-medium-again">
              The dynamic medium makes new representations possible
            </a>{" "}
            through morphing, distorting, multiplying, linking, communicating,
            abstracting, and so on. New forms can render ordinarily-invisible
            relationships suddenly visible.
          </Body>
          <Body>
            In{" "}
            <a href="https://ka-hivemind.herokuapp.com/entry/KhkXuvBHnvEuHNomH">
              <em>Magical Hopes</em>, Deborah Ball argues
            </a>{" "}
            that physical manipulatives depend on instructors’ guidance to
            illustrate connections, facilitate discussion, and encourage
            reflection. Digital manipulatives can’t resolve all her criticisms,
            but they can certainly improve the situation. They can display and
            maintain relationships between multiple representations. They can
            create a new expressive context for social interaction. And they can
            more easily encode elements of expert guidance in their interactions
            via constraints and dynamism: “rows must have ten blocks” can be an
            inherent property of digital objects, but plastic blocks need
            teacher support to maintain that property.
          </Body>
        </BodyAndSidebar>
        <Heading>Revealing hidden properties of numbers</Heading>
        <BodyAndSidebar>
          <Body noBottomMargin>
            To explore the possibilities in this space, we built{" "}
            <em>Cantor,</em> a digital representation of quantity with some
            unusual interactions. Our aim was to make typically-subtle
            properties of numbers more visceral—<a href="http://worrydream.com/MediaForThinkingTheUnthinkable/">
              to make certain thoughts more thinkable
            </a>.
          </Body>
          <SidebarItem>
            <Figure noBottomMargin noBorder>
              <img
                src="/images/long-term-research/reports/cantor/interactive-indicator.png"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>

        <Subheading>Exploring numbersʼ negative space</Subheading>
        <BodyAndSidebar>
          <Body>
            Hereʼs 37 + 15 again. This “reflow” interaction makes the{" "}
            <em>negative space</em> in base ten numbers feel visceral: 37 is
            clearly “3 away” from 40, and we “feel” that interactively as we try
            to fit the two together.
          </Body>
          <SidebarItem>
            <Figure>
              <CantorPrototype
                height={240}
                recording={negativeSpaceGZ}
                xOffset={-200}
                yOffset={100}
                mobileXOffset={-200}
                mobileYOffset={100}
              />
              <div className={css(styles.figureBorder)} />
            </Figure>
          </SidebarItem>
          <Body noBottomMargin>
            Fluent addition and subtraction of numbers up to 20 relies on an
            intuitive grasp of these relationships (also called complements or
            number partners).
          </Body>
        </BodyAndSidebar>

        <Subheading>
          From even and odd to fractions and modular arithmetic
        </Subheading>
        <BodyAndSidebar>
          <Body>
            Let’s make the blocks two columns wide. Do you see a pattern with
            these blocks? Whatʼs with the little “bumps” that stick out of some
            of the numbers?
          </Body>
          <SidebarItem>
            <Figure>
              <CantorPrototype
                height={240}
                recording={evenOddGZ}
                xOffset={-480}
                yOffset={100}
                mobileXOffset={-300}
                mobileYOffset={100}
              />
            </Figure>
          </SidebarItem>
          <Body>
            Cantorʼs “resize” interaction makes divisibility relationships easy
            to explore. Even-ness and odd-ness can emerge from casual play here
            as a clear pattern: some numbers are “smooth” when you arrange them
            into two columns, and some are “bumpy.”
          </Body>
          <Body>
            What will happen if you arrange them into three columns? Think about
            it for a moment, then try for yourself. Would you call 10 “even” in
            the world of three columns?
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            Use this audio player to hear one young student draw on his fraction
            knowledge to connect this situation to deeper ideas in modular
            arithmetic.
          </Body>
          <SidebarItem>
            <Figure>
              <audio
                src="/sounds/long-term-research/reports/cantor/student-audio.mp3"
                style={{ width: "100%" }}
                controls
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>

        <Subheading>Making primes vivid</Subheading>
        <BodyAndSidebar>
          <Body>
            Which numbers are <em>intrinsically</em> bumpy, no matter how you
            resize them?
          </Body>
          <SidebarItem>
            <Figure>
              <CantorPrototype
                height={240}
                recording={primesGZ}
                xOffset={-300}
                yOffset={60}
                mobileXOffset={-260}
                mobileYOffset={60}
              />
            </Figure>
          </SidebarItem>
          <Body>
            As we resize 12, it forms lots of rectangles, like 3 × 4. But 13
            doesn’t form any at all!
          </Body>
          <Body>
            With the “resize” interaction,{" "}
            <em>
              primality becomes an apparent property of a number
            </em>—something youʼd notice naturally when playing with the blocks.
          </Body>
          <Body noBottomMargin>
            By making primality vivid through direct manipulation, we help
            create authentic{" "}
            <a href="http://math.ucsd.edu/~jrabin/publications/ProblemFreeActivity.pdf">
              intellectual need
            </a>{" "}
            to understand this abstract number property. When students learn by
            responding to a problem theyʼve identified,{" "}
            <a href="https://aaalab.stanford.edu/assets/papers/2011/Practicing_versus_inventing.pdf">
              theyʼre more able to transfer their new knowledge to other
              problems
            </a>.
          </Body>
        </BodyAndSidebar>

        <Subheading>Entangling representations and operations</Subheading>

        <BodyAndSidebar>
          <SidebarItem>
            <Figure noTopMargin>
              <img
                src="/images/long-term-research/reports/cantor/arbitrary-blocks.gif"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
          <Body>
            We started from a representation we found interesting (number
            blocks), then explored: which natural interactions emerge that
            represent mathematical ideas? Contrast Cantor to the commercial
            “Base-Ten Blocks” interface depicted here, which started from a
            representation, then added on a set of buttons to perform
            operations. Those buttons operate from <em>outside</em> the
            representation through hidden mechanisms. Cantor’s interactions
            operate <em>through</em> the representation, not outside it.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            The number properties we observe are <em>consequences</em> of the
            block form, not a jumble of dissociated ideas. They form a more
            well-connected mathematical system, which in turn helps students
            develop well-connected understanding.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body noBottomMargin>
            Zooming out: we want students to think of <em>math itself</em> as a
            well-connected system. If we give them representations and
            manipulatives which suggest a jumble of dissociated ideas, that may
            come to be how they perceive math itself.
          </Body>
          <SidebarItem>
            <p className={css(styles.sidebarBody)}>
              Despite what weʼre suggesting here, itʼs important to remember
              that manipulatives donʼt themselves contain and transmit
              mathematical knowledge. We believe students acquire understanding
              through their explorations and discussions <em>using</em> the
              manipulatives. See{" "}
              <a href="https://ka-hivemind.herokuapp.com/entry/ANrbWSdgcPqfXGE4H?">
                this paper by Cobb, Yackel, and Wood
              </a>{" "}
              for more.
            </p>
          </SidebarItem>
        </BodyAndSidebar>

        <Subheading>And more</Subheading>
        <Body wide>
          We’ve explored the consequences of just this one new dynamic
          representation, but we believe a constellation of other new
          manipulatives and interactions exist, building bridges to many other
          attributes of numbers. When we implement these manipulatives, they
          tend to surprise us with unanticipated possibilities: we stumbled on
          some of the examples we’ve shown by accident, just by playing with the
          interactions!
        </Body>
        <Heading>One interactive representation, many contexts</Heading>
        <BodyAndSidebar>
          <Body>
            Physical base-ten blocks can be used in lots of contexts. That’s not
            just true of blocks: many physical tools involved in learning are
            highly versatile. For instance, paper and pencil are valuable in a
            classroom, in a conversation, in an art studio, and all kinds of
            other places. When it comes to <em>digital</em> learning tools,
            though, they’re often designed to work in just one narrow context.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            For instance, this wonderful interactive representation from{" "}
            <a href="https://teacher.desmos.com/carnival">
              Desmos’s Function Carnival
            </a>{" "}
            was designed for students to use in a classroom conversation. But
            it’s not really designed to exist outside the classroom: a student
            can’t bend it to some other problem they’re considering on their own
            later.
          </Body>
          <SidebarItem>
            <Figure
              caption={
                <span>
                  Play with this interactive yourself{" "}
                  <a href="https://teacher.desmos.com/carnival">
                    over at Desmos
                  </a>.
                </span>
              }
            >
              <img
                src="/images/long-term-research/reports/cantor/function-carnival.gif"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
          <Body>
            By contrast, consider the graphing calculator (Desmos also makes one
            of those). It’s highly empowering because it can be used in so many
            contexts, from homework assignments to visual doodles to
            self-directed exploration. The graphing calculator{" "}
            <a href="http://klr.tumblr.com/post/148335923163/tools-for-thinking-more-scaffold-less-crutch">
              complements—instead of combatting
            </a>—media like paper and pencil, multiplying its possibilities. Its
            versatility gives students control, allowing them to find (or
            invent) individually meaningful uses for the tool.
          </Body>
          <Body noBottomMargin>
            We pushed hard for versatility as we explored and invented in this
            space. The examples above have already illustrated how Cantor might
            be used in an online textbook—now let’s look at some other ideas.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Subheading>
            Supporting exploration at the speed of thought; supporting
            conversation at the speed of speech
          </Subheading>
          <div className={css(styles.hideUnlessMobile)}>
            {/* This section is duplicated for non-mobile. BEWARE! */}
            <Figure>
              <YouTubePlayer videoId="sb9EC_nTxYQ" />
            </Figure>
          </div>
          <Body>
            Great tools keep up with their users. They operate at the speed of
            thought, ever shrinking the feedback loop between conceiving of an
            idea and exploring its consequences.
          </Body>
          <p className={css(styles.hideUnlessMobile, styles.sidebarBody)}>
            {/* This section is duplicated for non-mobile. BEWARE! */}
            Itʼs worth noting that immediate feedback is <em>not</em> always
            helpful in learning environments. Delayed feedback can provoke
            productive reflection and metacognition through student predictions.
            We donʼt yet know of a strong theory on when each kind of feedback
            is appropiate. {" "}
            <a href="http://blog.mrmeyer.com/2017/desmos-design-why-were-suspicious-of-immediate-feedback/">
              Read more on this topic from Dan Meyer
            </a>.
          </p>
          <Body>
            Tools for thought must support communication not just from the
            expert to the novice: they should enhance conversation between
            collaborative peers. They should enact thought at the speed of
            speech. With tools this fluid, we can reinforce natural dialogue
            through novel representations without awkward pauses. We can support
            students in co-constructing meaning as they discuss and resolve
            their multiple interpretations.
          </Body>
          <p className={css(styles.hideUnlessMobile, styles.sidebarBody)}>
            {/* This section is duplicated for non-mobile. BEWARE! */}
            For more on the importance of discussion in exposing and developing
            multiple interpretations is explored further in papers by{" "}
            <a href="https://ka-hivemind.herokuapp.com/entry/spChNPDMhZSt7ZFgr">
              Kamii, Lewis, & Kirkland
            </a>{" "}
            and{" "}
            <a href="https://ka-hivemind.herokuapp.com/entry/ANrbWSdgcPqfXGE4H">
              Yackel, Cobb, & Wood
            </a>.
          </p>
          <Body noBottomMargin>
            <a href="https://ka-hivemind.herokuapp.com/entry/KhkXuvBHnvEuHNomH">
              Per Deborah Ball, in <em>Magical Hopes:</em>
            </a>{" "}
            “If manipulatives are to find their place [...] there will have to
            be more opportunities for individual reflection and professional
            discourse.”
          </Body>
          <div className={css(styles.hideOnMobile)}>
            {/* This section is duplicated for mobile. BEWARE! */}
            <SidebarItem top={50}>
              <Figure>
                <YouTubePlayer videoId="sb9EC_nTxYQ" />
              </Figure>
              <p className={css(styles.sidebarBody)}>
                Itʼs worth noting that immediate feedback is <em>not</em> always
                helpful in learning environments. Delayed feedback can provoke
                productive reflection and metacognition through student
                predictions. We donʼt yet know of a strong theory on when each
                kind of feedback is appropiate. {" "}
                <a href="http://blog.mrmeyer.com/2017/desmos-design-why-were-suspicious-of-immediate-feedback/">
                  Read more on this topic from Dan Meyer
                </a>.
              </p>
              <p className={css(styles.sidebarBody, styles.noBottomMargin)}>
                For more on the importance of discussion in exposing and
                developing multiple interpretations is explored further in
                papers by{" "}
                <a href="https://ka-hivemind.herokuapp.com/entry/spChNPDMhZSt7ZFgr">
                  Kamii, Lewis, & Kirkland
                </a>{" "}
                and{" "}
                <a href="https://ka-hivemind.herokuapp.com/entry/ANrbWSdgcPqfXGE4H">
                  Yackel, Cobb, & Wood
                </a>.
              </p>
            </SidebarItem>
          </div>
        </BodyAndSidebar>
        <Subheading>
          Recording and replaying explanations within Cantor
        </Subheading>
        <BodyAndSidebar>
          <Body noBottomMargin>
            The video in the previous section demonstrates a recording of a
            conversation using Cantor. We realized: what if this interaction
            were built into the medium? A student might submit an answer to a
            homework problem or ask a peer for asynchronous help by recording
            themselves speaking aloud while simultaneously manipulating these
            dynamic representations.
          </Body>
          <SidebarItem>
            <Figure
              noBottomMargin
              caption="Hit Record, then manipulate the block in some way. Then you can replay your interactions (and your voice, if your browser supports it)."
            >
              <CantorPrototype
                height={200}
                mode="recordYourOwn"
                recording={recordYourOwnGZ}
                mobileXOffset={-200}
                mobileYOffset={100}
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>
        <Subheading>
          Interrupting, answering, and elaborating othersʼ recordings
        </Subheading>
        <BodyAndSidebar>
          <Body noBottomMargin>
            If we add recordings as a first-class element of Cantor’s canvas, we
            don’t have to play them back like a non-interactive video:
            recordings can be <em>integrated into the interactive canvas</em>. A
            teacher’s recorded prompts and block manipulations could inhabit the
            same space as student interactions. Then we could string together a
            sequence—or even a dynamic tree—of teacher/student interactions,
            with each recorded prompt reacting to a student’s actions and
            offering further provocation.
          </Body>
          <SidebarItem>
            <Figure
              noBottomMargin
              caption="In this figure, recorded manipulations and voice live on the same canvas as your interactions. Turn on your speakers and hit Start."
            >
              <CantorPrototype
                height={250}
                mode="prompt"
                recording={promptGZ}
                audioURL="/sounds/long-term-research/reports/cantor/3-prompt.mp3"
                followupAudioURL="/sounds/long-term-research/reports/cantor/3-reprompt.mp3"
                mobileXOffset={-200}
                mobileYOffset={100}
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>
        <Subheading>
          Connecting many number representations on the same canvas
        </Subheading>
        <BodyAndSidebar>
          <Body noBottomMargin>
            Our versatile canvas doesn’t have to be limited to the number block
            representation we’ve shown. We imagine a future version of this
            canvas that can support all kinds of dynamic representations:
            physics simulations, geometric diagrams, videos, drawings, algebraic
            and numeric symbols, and so on. If we allow these representations to
            connect to each other, students can create and discover ideas we
            didn’t anticipate.
          </Body>
          <SidebarItem>
            <Figure noBottomMargin noBorder>
              <img
                src="/images/long-term-research/reports/cantor/linked-representations.png"
                style={{ width: "100%" }}
              />
            </Figure>
          </SidebarItem>
        </BodyAndSidebar>
        <Heading>Further possibilities</Heading>
        <BodyAndSidebar>
          <Body wide noBottomMargin>
            We generated many more ideas throughout our process, at various
            stages of fidelity. There’s so much more to explore in this space!
          </Body>
        </BodyAndSidebar>
        <div className={css(styles.minFigureHeight)}>
          <BodyAndSidebar>
            <Subheading>Fractions</Subheading>
            <SidebarItem top={50}>
              <Figure>
                <img
                  style={{ width: "100%" }}
                  src="/images/long-term-research/reports/cantor/fractions/fractions.gif"
                />
              </Figure>
            </SidebarItem>
            <Body>
              <a href="http://klr.tumblr.com/post/152354637513/fraction-problems">
                We sketched many ideas for representations of fractions
              </a>. We learned that there are lots of ways to think about
              fractions: as ratios, as measures, as scaling operations, and so
              on.
            </Body>
            <Body noBottomMargin>
              Playing with multiple representations might make it easier to
              understand how these conceptions relate.
            </Body>
          </BodyAndSidebar>
        </div>
        <div className={css(styles.minFigureHeight)}>
          <BodyAndSidebar>
            <Subheading>Representing much bigger numbers</Subheading>
            <SidebarItem top={50}>
              <Figure>
                <img
                  style={{ width: "100%" }}
                  src="/images/long-term-research/reports/cantor/carousel-cubes.gif"
                />
              </Figure>
            </SidebarItem>
            <Body noBottomMargin>
              Unlike physical blocks,{" "}
              <a href="http://klr.tumblr.com/post/148763588468/base-ten-blocks-cyclic-dimensions-entangled-math">
                digital number blocks could represent arbitrarily high place
                values by continuously zooming out
              </a>, or by representing higher place values by higher-dimensional
              rotations.
            </Body>
          </BodyAndSidebar>
        </div>

        <div className={css(styles.minFigureHeight)}>
          <BodyAndSidebar>
            <Subheading>
              Putting the number blocks in an immersive world
            </Subheading>
            <SidebarItem top={50}>
              <Figure height={300}>
                <img
                  style={{ width: "100%" }}
                  src="/images/long-term-research/reports/cantor/carousel-early-math.png"
                />
              </Figure>
            </SidebarItem>
            <Body noBottomMargin>
              We first investigated digital number manipulatives in the context
              of an early numeracy environment. In that system, these number
              blocks could be used to explore, create, and modify the child’s
              world. Weʼll have a separate report on that work soon.
            </Body>
          </BodyAndSidebar>
        </div>
        <Subheading>Co-evolving Cantor</Subheading>
        <Body wide>
          Weʼve only taken the first steps in our work with Cantor. Critically,
          we must next iterate directly with students to validate our design
          principles and extend these ideas. Do bumpy numbers draw interest? Do
          students reach for Cantor to show an idea to their neighbor? Do they
          make discoveries we havenʼt?
        </Body>
        <Body wide noBottomMargin>
          If this work inspires you, dear reader, we invite you to join in the
          explorations of this space.
        </Body>
        <BodyAndSidebar>
          <Heading>A chest of toys, a chest of dreams</Heading>
          <Body>
            We dream of giving every child a toy chest filled with countless
            dynamic manipulatives like the ones we’ve illustrated here.
          </Body>
          <SidebarItem top={40}>
            <Figure noBorder>
              <img
                src="/images/long-term-research/reports/cantor/chest-of-toys.png"
                style={{ width: "100%" }}
              />
            </Figure>
            {/* This section is duplicated for mobile. BEWARE! */}
            <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
              <a href="http://www.nctm.org/">
                The National Council of Teachers of Mathematics
              </a>{" "}
              lists “elicit and use evidence of student thinking” as one of{" "}
              <a href="http://www.nctm.org/uploadedFiles/Standards_and_Positions/PtAExecutiveSummary.pdf">
                its core mathematical teaching practices.
              </a>
            </p>
            <p className={css(styles.sidebarBody, styles.hideOnMobile)}>
              Separately,{" "}
              <a href="http://klr.tumblr.com/post/163537969033/we-asked-khan-academy-learners-to-talk-to-each">
                weʼve been working on a broader project
              </a>{" "}
              around supporting open-ended student work across subjects.
            </p>
          </SidebarItem>
          <Body>
            Just as manipulating our blocks naturally elicits the idea of prime
            numbers, another toy’s contortions might neatly illustrate
            fractions. Taken together, these toys can create authentic
            intellectual need for large swaths of mathematics, then empower
            students to discover the answers through play.
          </Body>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body>
            By embedding these manipulatives in a multi-user environment, we
            augment mathematical collaboration and help students create
            artifacts of their thought—without abstract symbol manipulation.
          </Body>
          <SidebarItem>
            {/* This section is duplicated for non-mobile. BEWARE! */}
            <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
              <a href="http://www.nctm.org/">
                The National Council of Teachers of Mathematics
              </a>{" "}
              lists “elicit and use evidence of student thinking” as one of{" "}
              <a href="http://www.nctm.org/uploadedFiles/Standards_and_Positions/PtAExecutiveSummary.pdf">
                its core mathematical teaching practices.
              </a>
            </p>
            <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
              Separately,{" "}
              <a href="http://klr.tumblr.com/post/163537969033/we-asked-khan-academy-learners-to-talk-to-each">
                weʼve been working on a broader project
              </a>{" "}
              around supporting open-ended student work across subjects.
            </p>
          </SidebarItem>
        </BodyAndSidebar>
        <BodyAndSidebar>
          <Body noBottomMargin>
            If we fill the elementary math environment with enough empowering
            and curiosity-inspiring mathematical objects, we may lay the
            foundation for the “Mathland” Papert dreamed of.
          </Body>
        </BodyAndSidebar>

        <Heading>Further reading</Heading>
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
            Deborah Ballʼs “<a href="https://ka-hivemind.herokuapp.com/entry/KhkXuvBHnvEuHNomH">
              Magical hopes: Manipulatives and the reform of math education
            </a>” outlined the key limitations of manipulatives in math
            education in 1992.
          </FurtherReadingItem>
          <FurtherReadingItem>
            One of the authors of this report, Scott Farrar, gives an academic
            survey of digital learning media in his 2016 thesis, “<a href="https://www.academia.edu/33974879/Farrar_2016_Digital_Curriculum_and_Pedagogy_Field_Study">
              Students and Teachers Using a Digital Curriculum and Pedagogy in
              Secondary Mathematics
            </a>.”
          </FurtherReadingItem>
          <FurtherReadingItem>
            For more recent work on the promise of the dynamic medium helping us
            see new things—not just for young learners—see Bret Victorʼs 2013
            talk, “<a href="http://worrydream.com/MediaForThinkingTheUnthinkable/">
              Media for Thinking the Unthinkable
            </a>,” and Michael Nielsenʼs 2016 essay, “<a href="http://cognitivemedium.com/tat/index.html">
              Thought as a Technology
            </a>.”
          </FurtherReadingItem>
        </ul>

        <Heading>Acknowledgements</Heading>
        <Body wide>
          Weʼd like to thank these people for their valuable thoughts on this
          report:{" "}
          {[
            "Michael Nielsen",
            "Eli Luberoff",
            "Jack Schaedler",
            "Nicky Case",
            "Amit Patel",
            "M Eifler",
            "Dan Meyer",
            "Toby Schachman",
            "John Golden",
            "Kate Nowak",
            "Hamish Todd",
          ]
            .map(name => name.split(" "))
            .sort(
              ([firstA, lastA], [firstB, lastB]) =>
                lastA < lastB ? -1 : lastB < lastA ? 1 : 0,
            )
            .map(names => names.join(" "))
            .join(", ")}. We'd also like to thank our young testers at the Khan
          Lab School for playing with Cantor and Lauren Wesnak for coordinating
          those collaborations.
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

const styles = StyleSheet.create({
  ...sharedReportStyles,

  heroContainer: {
    height: 300,
    [mediaQueries.smOrSmaller]: {
      height: 425,
      marginBottom: 8,
      maxHeight: "100vh",
    },
    [mediaQueries.mdOrLarger]: {
      height: 365,
    },
    [mediaQueries.lgOrLarger]: {
      height: 375,
    },
  },

  topBar: {
    backgroundColor: globalStyles.domainColors("default").domain1,
    position: "absolute",
    top: 0,
    left: 0,
    height: 61,
    width: "100%",
  },

  heroInteractiveContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 300,
    [mediaQueries.smOrSmaller]: {
      height: 425,
      maxHeight: "100vh",
    },
    [mediaQueries.mdOrLarger]: {
      height: 363,
    },
    [mediaQueries.lgOrLarger]: {
      height: 375,
    },

    paddingBottom: 1,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: globalStyles.colors.gray76, // TODO: Maybe we want a lighter color here for non-retina users?

    "@media (-webkit-min-device-pixel-ratio: 2.0)": {
      // Unfortunately, only Safari respects fractional border
      // widths. Chrome is still working on it.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=623495
      borderBottomWidth: 0.5,
    },
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
    color: globalStyles.domainColors("default").domain3,
    marginBottom: 20,
    ...globalStyles.typography.subjectHeadingDesktop,
    lineHeight: "50px",
    maxWidth: 700,
    marginLeft: -2,
    [mediaQueries.lgOrSmaller]: {
      maxWidth: 500,
    },
    [mediaQueries.smOrSmaller]: {
      marginLeft: 0,
      ...globalStyles.typography.subjectHeadingMobile,
    },
  },

  authors: {
    ...globalStyles.typography.smallHeading,
    fontWeight: "normal",
    color: globalStyles.domainColors("default").domain3,
    [mediaQueries.smOrSmaller]: {
      color: globalStyles.domainColors("default").domain2,
      ...globalStyles.typography.caption,
      fontWeight: "normal",
    },
    maxWidth: 600,
  },

  authorListingAsterisk: {
    ...globalStyles.typography.caption,
    fontStyle: "normal",
    fontSize: 15,
    opacity: 0.7,
  },

  authorLine: {
    [mediaQueries.smOrSmaller]: {
      display: "inline",
    },
    [mediaQueries.mdOrLarger]: {
      display: "block",
    },
  },

  minFigureHeight: {
    [mediaQueries.mdOrLarger]: {
      minHeight: "calc(264px + 24px)",
    },
    [mediaQueries.lgOrLarger]: {
      minHeight: "calc(282px + 24px)",
    },
    [mediaQueries.xlOrLarger]: {
      minHeight: "calc(334px + 24px)",
    },
  },
});
