/* eslint-disable @next/next/no-img-element */
import { useUpdatingLanyard } from "@/hooks/lanyard";
import { getMapURL } from "@/server/apple-maps";
import { env } from "@/server/env";
import { getLanyard } from "@/server/lanyard";
import { discordId } from "@/utils/constants";
import { GetStaticProps } from "next";
import { Data } from "use-lanyard";
import { Variants, motion } from "framer-motion";
import { CardHoverEffect } from "@/components/hover-card";

const pageContainerAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    maxHeight: "100vh",
    overflowY: "visible",
    pointerEvents: "none",
  },
  visible: {
    opacity: 1,
    scale: 1,
    pointerEvents: "unset",
    transition: {
      ease: "easeOut",
      duration: 2,
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
};

const fadeUpInAnimation: Variants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

export interface Props {
  lanyard: Data;
  map: string;
  location: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const lanyard = await getLanyard(discordId);
  const location = lanyard.kv.location ?? env.DEFAULT_LOCATION;

  const map = getMapURL(location);

  return {
    revalidate: 10,
    props: {
      map,
      location,
      lanyard,
    },
  };
};

export default function Home(props: Props) {
  const { data: lanyard } = useUpdatingLanyard(discordId, props.lanyard);
  const status = lanyard.discord_status ?? "offline";
  let actualState = "offline";
  switch (status) {
    case "dnd":
      actualState = "do not disturb";
      break;
    case "idle":
      actualState = "idle";
      break;
    case "online":
      actualState = "online";
      break;
    case "offline":
      actualState = "offline";
      break;
  }

  return (
    <motion.main
      variants={pageContainerAnimation}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={fadeUpInAnimation} className="text-lg">
        Polar
      </motion.h2>
      <motion.p variants={fadeUpInAnimation} className="my-5">
        <em>Innovating scalable real-time interfaces.</em> Administrating
        dedicated systems, building polished user interfaces, and creating
        beautiful full-stack applications for clients.
      </motion.p>
      <motion.p variants={fadeUpInAnimation}>
        Currently doing work for <a href="https://mcparks.us">MCParks</a>, and{" "}
        <a href="https://twitter.com/theyard">The Yard</a>
      </motion.p>

      <motion.div
        variants={fadeUpInAnimation}
        className="grid grid-rows-4 grid-flow-col lg:gap-2 sm:gap-4 my-5"
      >
        <h4 className="text-sm text-[#404244] lg:my-auto sm:my-0">
          what i&apos;ve worked on
        </h4>
        <div className="my-auto">
          <h2>
            <a href="https://rewind.mcparks.us/">The Yard</a>
          </h2>
          <p className="text-[#404244]">yippee</p>
        </div>
        <div className="my-auto">
          <h2>
            <a href="https://rewind.mcparks.us/">The Yard</a>
          </h2>
          <p className="text-[#404244]">yippee</p>
        </div>
        <div className="my-auto">
          <h2>
            <a href="https://rewind.mcparks.us/">The Yard</a>
          </h2>
          <p className="text-[#404244]">yippee</p>
        </div>
        <h4 className="text-sm text-[#404244] my-auto opacity-0">-</h4>
        <div className="my-auto">
          <h2>
            <a href="https://rewind.mcparks.us/">The Yard</a>
          </h2>
          <p className="text-[#404244]">yippee</p>
        </div>
        <div className="my-auto">
          <h2>
            <a href="https://rewind.mcparks.us/">The Yard</a>
          </h2>
          <p className="text-[#404244]">yippee</p>
        </div>
        <div className="my-auto">
          <h2>
            <a href="https://rewind.mcparks.us/">The Yard</a>
          </h2>
          <p className="text-[#404244]">yippee</p>
        </div>
      </motion.div>

      <motion.h3 variants={fadeUpInAnimation} className="text-md">
        Me
      </motion.h3>
    </motion.main>
  );
}
