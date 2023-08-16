const HomePage = () => {
  return (
    <main>
      <section
        className="bg-local bg-top bg-no-repeat"
        style={{ backgroundImage: 'url("/grid.png")' }}
      >
        <div className="px-4 py-72">
          <p className="text-sm uppercase text-dark-blue/90">Hi, I am</p>
          <h1 className="mx-[-4px] text-7xl font-bold break-words text-dark-blue ">
            Raymart <span className="text-blue/80">Formalejo</span>
          </h1>
          <h3 className="mt-4 text-lg text-dark-blue/80">
            A Front-end focused Web Developer Crafting Beautiful and Functional
            Solutions One Pixel at a Time
          </h3>
        </div>
      </section>
      <section className="px-4">
        <h2 className="mb-6 text-lg font-semibold text-yellow">
          Featured blog posts
        </h2>

        {/* CARDS */}
        <div className="flex flex-col gap-10">
          {/* CARD ITEM */}
          <article className="p-6 rounded-lg text-re bg-light-blue/20">
            <figure>
              <img className="rounded-t-lg" src="/img2.png" alt="blog image" />
              <figcaption>
                <h3 className="mt-4 text-2xl font-bold text-dark-blue2">
                  Mastering minimalism an layering complexity with strategy game
                </h3>
              </figcaption>
            </figure>
            <p className="text-sm text-gray">July 14, 2023</p>

            <div className="flex gap-1 mt-2">
              {["html", "css", "js"].map((tag) => {
                return (
                  <p
                    key={tag}
                    // variant={"tags"}
                    style={{
                      color: "rgb(100 116 139)",
                      fontWeight: "normal",
                    }}
                  >
                    {`#${tag}`}
                  </p>
                );
              })}
            </div>

            <p className="mt-5 text-grayDark">
              Here’s why the developers are making games for people who don’t
              have time for the genre. Here’s why the developers are making
              games for people who don’t have time for the genre.{" "}
            </p>
            <button className="mt-10">Read more</button>
          </article>
          <article className="p-6 rounded-lg text-re bg-light-blue/20">
            <figure>
              <img className="rounded-t-lg" src="/img2.png" alt="blog image" />
              <figcaption>
                <h3 className="mt-4 text-2xl font-bold text-dark-blue2">
                  Mastering minimalism an layering complexity with strategy game
                </h3>
              </figcaption>
            </figure>
            <p className="text-sm text-gray">July 14, 2023</p>

            <div className="flex gap-1 mt-2">
              {["html", "css", "js"].map((tag) => {
                return (
                  <p
                    key={tag}
                    // variant={"tags"}
                    style={{
                      color: "rgb(100 116 139)",
                      fontWeight: "normal",
                    }}
                  >
                    {`#${tag}`}
                  </p>
                );
              })}
            </div>

            <p className="mt-5 text-grayDark">
              Here’s why the developers are making games for people who don’t
              have time for the genre. Here’s why the developers are making
              games for people who don’t have time for the genre.{" "}
            </p>
            <button className="mt-10">Read more</button>
          </article>
          <article className="p-6 rounded-lg text-re bg-light-blue/20">
            <figure>
              <img className="rounded-t-lg" src="/img2.png" alt="blog image" />
              <figcaption>
                <h3 className="mt-4 text-2xl font-bold text-dark-blue2">
                  Mastering minimalism an layering complexity with strategy game
                </h3>
              </figcaption>
            </figure>
            <p className="text-sm text-gray">July 14, 2023</p>

            <div className="flex gap-1 mt-2">
              {["html", "css", "js"].map((tag) => {
                return (
                  <p
                    key={tag}
                    // variant={"tags"}
                    style={{
                      color: "rgb(100 116 139)",
                      fontWeight: "normal",
                    }}
                  >
                    {`#${tag}`}
                  </p>
                );
              })}
            </div>

            <p className="mt-5 text-grayDark">
              Here’s why the developers are making games for people who don’t
              have time for the genre. Here’s why the developers are making
              games for people who don’t have time for the genre.{" "}
            </p>
            <button className="mt-10">Read more</button>
          </article>
          <article className="p-6 rounded-lg text-re bg-light-blue/20">
            <figure>
              <img className="rounded-t-lg" src="/img2.png" alt="blog image" />
              <figcaption>
                <h3 className="mt-4 text-2xl font-bold text-dark-blue2">
                  Mastering minimalism an layering complexity with strategy game
                </h3>
              </figcaption>
            </figure>
            <p className="text-sm text-gray">July 14, 2023</p>

            <div className="flex gap-1 mt-2">
              {["html", "css", "js"].map((tag) => {
                return (
                  <p
                    key={tag}
                    // variant={"tags"}
                    style={{
                      color: "rgb(100 116 139)",
                      fontWeight: "normal",
                    }}
                  >
                    {`#${tag}`}
                  </p>
                );
              })}
            </div>

            <p className="mt-5 text-grayDark">
              Here’s why the developers are making games for people who don’t
              have time for the genre. Here’s why the developers are making
              games for people who don’t have time for the genre.{" "}
            </p>
            <button className="mt-10">Read more</button>
          </article>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
