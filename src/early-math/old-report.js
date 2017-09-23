
const extra = (
  <div>
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
      Before we dive too deeply into details of our approach, we’d love to whet
      your palate with some of our early sketches. We’ll use these examples a
      little later to help illustrate the background research and design themes
      that we used while making them.
    </p>
    <PrototypeExample
      heading="Singing through touch"
      figure={<AudibleVideoPlayer />}
    >
      <Body>
        These sketches came from our iterative design explorations. We asked
        ourselves all kinds of questions, like: What are all the ways a child
        might <em>input</em> a number? If you ask a kid their age, they often
        hold up their fingers as an answer. That gesture inspired us to play
        with ways we might connect fingers on a screen to quantities they might
        manipulate.
      </Body>
      <Body>
        As we tried out our prototype, we realized we could assign a note to
        each number. With this interaction, a child's natural gesture—holding up
        some fingers to indicate a number—becomes a musical instrument.
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
        kids’ apps don’t give them any real agency. They tell kids what to do.
      </Body>
      <Body>
        This prototype tried to explore handwriting through the lens of giving
        kids agency. Instead of asking students to use handwriting to answer a
        fixed math problem, what if we turn things upside down—give them a scene
        they can alter with whatever numbers they can write?
      </Body>
      <Body>Want to see what thirty-three birds looks like? Handwrite 33!</Body>
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
        Kids can use these “tens-place” and “ones-place” cards individually to
        describe numbers. But if you stack two cards, they represent a single
        two-digit number. These cards implicitly illustrate place value—that 27
        is the same as 20 + 7.
      </Body>
      <Body>
        In the digital medium, though, kids can morph these cards’ values by
        scrubbing them with their finger. Again we thought: what if students
        could see their own manipulations play out in visual quantities?
      </Body>
      <Body>
        Play with the tens card, and: whoa. You’re adding ten birds at a time!
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
        How might you make stairs out of a rectangular chunk of blocks? Carve
        away positive blocks using negative, fixed-quantity “ghost blocks”!
      </Body>
    </PrototypeExample>
    <Subheading>And more!</Subheading>
    <Body wide>
      We brainstormed, sketched, and prototyped so many ideas! Some of our them
      focused on specific interactions; others refined our principles or broader
      architecture. Here’s a peek at more sketches and process.
    </Body>
    {/*
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
        </Slider>*/}
    <Heading>Design themes</Heading>
    <Body wide>
      Through all those sketches, we were looking for pieces of our ultimate
      goal: an open-ended adventure in a playful world of creative math. That
      vision grew from design themes we developed during our background reading
      and interviews. As you read through these themes, imagine: what would
      educational technologies you’ve used look like if they were recreated
      according to these themes? In the section following this one, we’ll show a
      world we imagined using these themes.
    </Body>
    <Subheading>Learning through discovery</Subheading>
    <BodyAndSidebar>
      <Body>
        Why do we want to make a <em>world</em>, anyway? One key inspiration was
        Seymour Papert,{" "}
        <a href="https://www.youtube.com/watch?v=_l7TR6r8MK8&feature=youtu.be">
          who said
        </a>:
      </Body>
      <p className={css(styles.body, styles.blockQuote)}>
        While it’s true that most people in math class don’t learn much math,
        most kids in French class don’t learn much French. But we don’t say that
        they’re not “French-ly minded.”… We know that if they grew up in France,
        they would learn French perfectly well… If we all learned mathematics in
        “Mathland,” we would all learn mathematics perfectly well. How can we
        create “Mathland”? That’s really what it’s about.
      </p>
      <Body>
        Learning games often feel bolted onto their subjects. Scoreboards and
        badges cover dull tasks like chocolate-covered broccoli. These shallow
        motivators aren’t connected to the meaning of the activity; they could
        have been used to incentivize any random task.{" "}
      </Body>
      <SidebarItem>
        <p className={css(styles.sidebarBody)}>
          Seymour Papert’s 1980 manifesto on empowering children through
          technology,{" "}
          <a href="https://mindstorms.media.mit.edu">
            <em>Mindstorms</em>
          </a>, remains a foundational text for anyone interested in learning
          and technology.
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
        exploration can open up wide variety of learning paths. You’ve already
        seen that emphasis in our early sketches. One child might understand a
        mathematical concept through generative painting; another might form the
        same idea making digital music.{" "}
        <a href="https://en.wikipedia.org/wiki/Constructivism_(philosophy_of_education)">
          To learn, we build new ideas from preexisting ones.
        </a>{" "}
        If children have some agency in choosing their approach and goals,
        they'll more likely find learning paths reflecting their own starting
        points and interests.
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
        <Principle>Entanglement.</Principle> We focused on creative activities
        where math really does give learners superpowers—where they manipulate
        their world <em>through</em> manipulating math. That way, when kids
        improve at manipulating math, they improve at making things in their
        world.
      </Body>
    </BodyAndSidebar>

    <BodyAndSidebar>
      <Body noBottomMargin>
        <Principle>Conceptual understanding.</Principle> When children have a
        real intellectual need,{" "}
        <a href="http://math.ucsd.edu/~jrabin/publications/ProblemFreeActivity.pdf">
          it’s more likely that they’ll understand <em>why</em> the entangled
          mathematical ideas behave as they do
        </a>—not just how to perform an algorithm. We worry that students with
        procedural understanding find themselves stuck as soon as they fall off
        a path they recognize. We tried to design interactions that reward
        conceptual understanding, encouraging students to correct their own
        errors and combine ideas in creative ways.
      </Body>
      <SidebarItem>
        <p className={css(styles.sidebarBody, styles.noBottomMargin)}>
          {/* Note that this paragraph is duplicated above for non-mobile */}
          The{" "}
          <a href="http://www.nctm.org/">
            National Council of Teachers of Mathematics
          </a>{" "}
          lists “too much focus on learning procedures without any connection to
          meaning, understanding, or the applications that require these
          procedures” as{" "}
          <a href="http://www.nctm.org/uploadedFiles/Standards_and_Positions/PtAExecutiveSummary.pdf">
            one of the most pressing problems in math education
          </a>. They suggest that we reverse the situation: “build procedural
          fluency from conceptual understanding.”
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
              paints a playful relationship with learning we'd love to see every
              child experience.
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
        When thinking about education, it's easy to focus on cognition and lose
        sight of students' emotions. But by intentionally creating the space for
        emotional connections to form, we pave the way for a deep, enduring
        relationship between a child and learning.
      </Body>
      <Body>
        <Principle>Creative ownership.</Principle> We’ve discussed how
        creativity helps children connect new ideas to old ones when learning.
        That creative mindset also makes the activity personally relevant to the
        child,{" "}
        <a href="http://life-slc.org/docs/barron-self-sustainedlearning.pdf">
          forming an emotional bond that can inspire their involvement without
          outside coercion
        </a>.
      </Body>
    </BodyAndSidebar>
    <BodyAndSidebar>
      <Body>
        <Principle>Curiosity.</Principle> We believe art direction plays a major
        role in setting the stage for curiosity. For instance, in the forest at
        the top of this report, we’ve deliberately added lots of depth and
        occlusion hinting at hidden structure. The child’s entering a whole new
        world, but we’re leaving space for their imagination, a feeling of
        possibility and a sense of adventure. We believe that in a carefully
        art-directed environment, a child’s imagination evokes much more than we
        could have rendered ourselves. Even better: we’ve entangled our art
        direction with the math. When kids act on their curiosity in this world
        (e.g. what’s in the tree?), they’re manipulating numbers (e.g. to build
        themselves a ladder).
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
        children create and discover in this world, we can help them share their
        inventions and experiences with loved ones. Creative mathematical
        adventures can lead to laughter, oohs and ahhs, traded stories,
        and—yes—more learning from great conversation.
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
            For more on how to use technology to unlock creative learning, see
            Mitch Resnick's{" "}
            <em>
              <a href="https://mitpress.mit.edu/books/lifelong-kindergarten">
                Lifelong Kindergarten
              </a>
            </em>.
          </p>
        </div>
      </SidebarItem>
      <Body>
        Mathematical ideas are deeply empowering! Can we create activities which
        reflect that power—which we’re genuinely and personally excited to
        share? Let's not make tasks we <em>pretend</em> are interesting so that
        kids will learn “what's good for them.”
      </Body>
      <p className={css(styles.sidebarBody, styles.hideUnlessMobile)}>
        {/* WARNING repeated for non-mobile */}
        For more on how to use technology to unlock creative learning, see Mitch
        Resnick's{" "}
        <em>
          <a href="https://mitpress.mit.edu/books/lifelong-kindergarten">
            Lifelong Kindergarten
          </a>
        </em>.
      </p>
      <Body noBottomMargin>
        We believe that genuine interest will follow from empowerment, and
        successful learning will follow from genuine interest. To that end, we
        explored creative tools for art and music, translating numeracy into
        exciting personal creations. We imagined a world full of secrets worth
        exploring and connected that exploration to mathematical understanding.
        We wanted to show students just how empowering math can be.
      </Body>
    </BodyAndSidebar>
    <BodyAndSidebar>
      <Subheading>Growth</Subheading>
      <Body>
        Powerful ideas grow with people, and we wanted our design to do the
        same. Toddlers build simple structures with Duplo, then more complex
        objects with Lego, then moving parts with Technic, and even robotics
        with Mindstorms. Kids and adults can both make wonderful things with the
        same can of paint.
      </Body>
      <SidebarItem top={50}>
        <Figure>
          <img
            src="/images/long-term-research/reports/early-math/4-principles/6-duplo-mindstorms.jpg"
            style={{ width: "100%" }}
          />
        </Figure>
        <div className={css(styles.hideOnMobile)}>
          {/* WARNING repeated for mobile */}
          <Figure>
            <img
              src="/images/long-term-research/reports/early-math/5-storyboard/8.png"
              style={{ width: "100%" }}
            />
          </Figure>
        </div>
      </SidebarItem>
      <Body>
        Can we build an environment which continues to reward deeper
        understanding, becoming ever more empowering as its occupants grow? Or
        with ideas deep and broad enough to appeal to novices and experts alike,
        in their own ways?
      </Body>
    </BodyAndSidebar>
    <BodyAndSidebar>
      <Body>
        We imagined a world where children could eventually "look behind" an
        object in the digital world to see a more abstract representation. For
        instance, a child might first describe a flower by{" "}
        <a href="https://en.wikipedia.org/wiki/Van_Hiele_model#Van_Hiele_levels">
          its holistic shape
        </a>, but as they develop, they’ll come to see how its petals abstractly
        relate to leaves of a tree. At that point, they’re ready to define the
        patterns petals follow. The child can climb{" "}
        <a href="http://worrydream.com/LadderOfAbstraction/">
          up and down the ladder of abstraction
        </a>.
      </Body>
      <SidebarItem>
        <div className={css(styles.hideUnlessMobile)}>
          <Figure>
            {/* WARNING repeated for mobile */}
            <img
              src="/images/long-term-research/reports/early-math/5-storyboard/8.png"
              style={{ width: "100%" }}
            />
          </Figure>
        </div>
      </SidebarItem>
    </BodyAndSidebar>
  </div>
);
