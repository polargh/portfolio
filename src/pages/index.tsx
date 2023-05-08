/* eslint-disable @next/next/no-img-element */
import { useUpdatingLanyard } from "@/hooks/lanyard";
import { getMapURL } from "@/server/apple-maps";
import { env } from "@/server/env";
import { getLanyard } from "@/server/lanyard";
import { age, discordId } from "@/utils/constants";
import { GetStaticProps } from "next";
import { Data } from "use-lanyard";
import { Variants, motion } from "framer-motion";
import { CardHoverEffect, hoverClassName } from "@/components/hover-card";
import Link from "next/link";
import { SiDiscord, SiGithub, SiSpotify, SiTwitter } from "react-icons/si";
import clsx from "clsx";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Time } from "@/components/time";
import { formatList } from "@/utils/lists";

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

  return (
    <div className="page-container">
<motion.main
      variants={pageContainerAnimation}
      initial="hidden"
      animate="visible"
      className="mx-auto grid max-w-3xl grid-cols-6 gap-6 px-6 pb-40 pt-16"
    >
      <div className="col-span-4 justify-center">
        <motion.h2 variants={fadeUpInAnimation}><svg width="67.6666666667" height="47.6666666667" viewBox="0 0 205 143" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M188.631 100.437C188.504 100.437 188.378 100.437 188.251 100.421C186.295 100.212 184.878 98.4244 185.084 96.4359C185.116 96.0978 188.742 61.8993 197.982 25.3903C198.473 23.4501 200.413 22.2908 202.321 22.7819C204.229 23.281 205.377 25.2534 204.887 27.1936C195.781 63.1712 192.21 96.8626 192.178 97.2007C191.988 99.0603 190.436 100.445 188.639 100.445L188.631 100.437Z" fill="white"/>
<path d="M28.4434 86.6547C26.4719 86.6547 24.8804 85.0365 24.8804 83.032C24.8804 81.0274 26.4719 79.4092 28.4434 79.4092C40.3599 79.4092 57.5734 70.8033 73.3696 56.9484C88.6749 43.5282 98.5565 28.6509 98.5565 19.0627C98.5565 13.5804 96.1811 10.0864 91.2958 8.37973C82.7602 5.40105 67.6925 8.31533 51.9754 15.9955C34.2314 24.6578 18.0393 37.8123 6.37622 53.0197C5.16478 54.5976 2.92401 54.8794 1.3721 53.6477C-0.179809 52.4159 -0.456935 50.1376 0.754504 48.5597C27.8337 13.2583 72.9025 -5.71668 93.6157 1.52876C101.399 4.24983 105.683 10.4729 105.683 19.0627C105.683 33.1511 91.3908 50.7092 78.0253 62.4388C60.7326 77.6059 42.1968 86.6627 28.4434 86.6627V86.6547Z" fill="white"/>
<path d="M10.4227 143C10.011 143 9.58341 142.928 9.1796 142.767C7.33473 142.066 6.40041 139.981 7.08927 138.105C7.23179 137.727 21.2306 99.4468 32.4662 54.1467C32.9492 52.2065 34.8811 51.0312 36.7893 51.5222C38.6975 52.0133 39.8536 53.9776 39.3706 55.9178C28.04 101.62 13.8987 140.255 13.7562 140.641C13.2177 142.098 11.8638 143 10.4148 143H10.4227Z" fill="white"/>
<path d="M110.212 110.242C109.681 110.242 109.135 110.122 108.628 109.864C102.144 106.588 93.4498 109.953 93.3706 109.985C92.1433 110.484 90.7419 110.251 89.7363 109.373C88.7307 108.496 88.2873 107.127 88.5803 105.815C88.7386 105.114 92.5234 88.3773 98.7865 70.948C99.4595 69.0723 101.502 68.0981 103.355 68.7905C105.2 69.4748 106.15 71.5599 105.477 73.4356C101.558 84.344 98.5806 95.1961 96.9416 101.604C101.098 100.92 106.712 100.799 111.803 103.375C113.569 104.269 114.282 106.443 113.411 108.23C112.785 109.502 111.526 110.242 110.22 110.242H110.212Z" fill="white"/>
<path d="M70.2742 109.937C68.3976 109.937 66.6636 109.285 65.2146 108.013C61.8654 105.074 60.6698 99.2618 61.9366 92.0727C63.8132 81.438 70.2029 71.713 76.8064 69.4589C79.7915 68.4365 82.6419 68.9356 84.8352 70.8677C88.1845 73.8061 89.3801 79.6186 88.1132 86.8077C86.2367 97.4424 79.8469 107.167 73.2434 109.422C72.2299 109.768 71.2322 109.937 70.2742 109.937ZM79.7361 76.1891C79.5777 76.1891 79.3639 76.2213 79.071 76.3259C75.4842 77.5496 70.4404 84.8434 68.944 93.3527C68.0097 98.6661 68.9836 101.757 69.8704 102.53C69.9891 102.627 70.2029 102.82 70.9789 102.554C74.5657 101.331 79.6094 94.037 81.1059 85.5277C82.0402 80.2143 81.0663 77.1229 80.1795 76.3501C80.1082 76.2857 79.9974 76.1891 79.7361 76.1891Z" fill="white"/>
<path d="M140.356 110.243C140.071 110.243 139.778 110.21 139.485 110.13C137.577 109.639 136.421 107.674 136.904 105.734C142.684 82.4039 140.53 77.1953 139.738 76.1567C139.604 75.9796 139.477 75.8186 138.843 75.8186C136.658 75.8186 130.807 78.91 123.712 107.513C123.229 109.454 121.297 110.629 119.389 110.138C117.481 109.647 116.325 107.682 116.808 105.742C123.261 79.6909 129.857 68.5732 138.843 68.5732C141.536 68.5732 143.784 69.66 145.36 71.7048C147.941 75.0699 150.095 82.1785 143.816 107.505C143.412 109.148 141.955 110.243 140.364 110.243H140.356Z" fill="white"/>
<path d="M142.969 97.0239H124.132C122.422 97.0239 120.846 95.8565 120.506 94.1498C120.047 91.8232 121.788 89.7784 123.998 89.7784H142.834C144.545 89.7784 146.12 90.9457 146.461 92.6524C146.92 94.979 145.178 97.0239 142.969 97.0239Z" fill="white"/>
<path d="M153.016 110.251C152.787 110.251 152.557 110.226 152.32 110.178C150.388 109.792 149.137 107.884 149.517 105.919C149.548 105.75 152.921 88.5464 157.799 71.8658C158.187 70.5455 159.271 69.5634 160.602 69.3299C161.607 69.1528 170.554 67.7118 175.337 72.1395C176.81 73.5001 178.504 75.9796 178.195 80.029C177.491 89.2951 166.564 93.1191 159.39 94.053C157.593 101.757 156.516 107.24 156.5 107.336C156.168 109.059 154.671 110.259 153.008 110.259L153.016 110.251ZM163.967 76.2372C162.993 79.6667 162.09 83.0801 161.275 86.3245C165.44 85.3504 170.808 83.2331 171.101 79.4655C171.204 78.0969 170.768 77.6944 170.554 77.4931C169.359 76.3821 166.437 76.1084 163.967 76.2292V76.2372Z" fill="white"/>
<path d="M176.881 112.465C176.034 112.465 175.187 112.159 174.506 111.539C168.306 105.903 163.816 91.0825 163.326 89.408C162.763 87.492 163.832 85.4713 165.717 84.8997C167.601 84.3281 169.589 85.415 170.151 87.331C171.331 91.3321 175.258 102.506 179.248 106.137C180.713 107.473 180.84 109.76 179.526 111.249C178.821 112.046 177.847 112.457 176.865 112.457L176.881 112.465Z" fill="white"/>
<path d="M187.847 112.416C185.456 112.416 183.508 110.436 183.508 108.005C183.508 105.573 185.456 103.593 187.847 103.593C190.238 103.593 192.186 105.573 192.186 108.005C192.186 110.436 190.238 112.416 187.847 112.416ZM187.847 105.171C186.311 105.171 185.06 106.443 185.06 108.005C185.06 109.566 186.311 110.838 187.847 110.838C189.383 110.838 190.634 109.566 190.634 108.005C190.634 106.443 189.383 105.171 187.847 105.171Z" fill="white"/>
<path d="M188.085 111.515C190.053 111.515 191.648 109.893 191.648 107.892C191.648 105.891 190.053 104.269 188.085 104.269C186.117 104.269 184.522 105.891 184.522 107.892C184.522 109.893 186.117 111.515 188.085 111.515Z" fill="white"/>
</svg>
</motion.h2>
        <motion.p variants={fadeUpInAnimation} className="my-5">
          <em>Innovating scalable real-time interfaces.</em> {age} y/o,
          Administrating dedicated systems, building polished user interfaces,
          and creating beautiful full-stack applications for clients.
        </motion.p>
      </div>

      <motion.div variants={fadeUpInAnimation} className="col-span-2">
        <CardHoverEffect className="h-full">
          <Link
            href="https://github.com/polargh"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "flex h-full items-center justify-center rounded-lg bg-slate-500/10 text-4xl text-white",
              hoverClassName
            )}
          >
            <span className="sr-only">GitHub</span>
            <span className="transform-gpu transition group-hover:-rotate-[-10deg] group-hover:scale-[1.3]">
              <SiGithub />
            </span>
          </Link>
        </CardHoverEffect>
      </motion.div>
      <motion.div
      variants={fadeUpInAnimation}
        className={clsx(
          "col-span-3 flex h-52 items-center justify-center rounded-lg text-4xl md:col-span-2",
          {
            online: "bg-green-500/20 text-green-50",
            idle: "bg-orange-400/20 text-orange-50 ",
            dnd: "bg-red-500/20 text-red-50",
            offline: "bg-blurple/20 text-white/90",
          }[status]
        )}
      >
        <div className="-rotate-[4deg] scale-[1] space-y-1 text-center md:scale-[1.2]">
          <h2>
            <span>{status}</span>
          </h2>

          <p className="text-base">
            <em>{lanyard.discord_user.username}#{lanyard.discord_user.discriminator}</em>
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUpInAnimation} className="col-span-3 md:col-span-1">
        <Time />
      </motion.div>
        

      <motion.div variants={fadeUpInAnimation} className="col-span-3 xs:col-span-6">
        <CardHoverEffect className="h-52">
          {!lanyard?.spotify || !lanyard.spotify.album_art_url ? (
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "group relative flex h-full overflow-hidden rounded-lg",
                hoverClassName
              )}
            >
              <span className="absolute inset-0 -z-10">
                <img
                  src={
                    "https://i.scdn.co/image/ab67706c0000da84b6acc793e9a84388905209cd"
                  }
                  className="absolute inset-0 h-full w-full bg-black object-cover object-center brightness-50"
                  alt=""
                />
              </span>
              <span className="flex flex-1 flex-col justify-between p-6 text-white">
							<span className="flex justify-between">
								<SiSpotify className="text-2xl" />
								<HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
							</span>

							<div className="space-y-0.5">
								<h2 className="font-title font-bold">
									<span className="font-medium">playlist:</span> dance
								</h2>

								<p className="text-sm"><em>34 hours of pure electronic bliss.</em></p>
							</div>
						</span>
            </Link>
          ) : (
            <Link
						href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`}
						target="_blank"
						rel="noopener noreferrer"
						className={clsx('group relative flex h-full overflow-hidden rounded-lg', hoverClassName)}
					>
						<span className="absolute inset-0 -z-10">
							<img
								src={lanyard.spotify.album_art_url}
								className="absolute inset-0 h-full w-full bg-black object-cover object-center brightness-50 transition-all duration-500 will-change-[transform,_filter] group-hover:scale-[1.15] group-hover:brightness-[0.4]"
								alt="Album cover art"
							/>
						</span>

						<span className="flex flex-1 flex-col justify-between p-6 text-white">
							<span className="flex justify-between">
								<SiSpotify className="text-2xl" />
								<HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
							</span>

							<span>
								<h2>
									<span
										className="mb-0.5 mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"
										aria-hidden
									/>{' '}
									Listening to{' '}
									<span className="font-bold" suppressHydrationWarning>
										<em>{lanyard.spotify.song}</em>
									</span>{' '}
									by{' '}
									<span className="font-bold" suppressHydrationWarning>
										<em>{formatList(lanyard.spotify.artist.split('; '), 'conjunction')}</em>
									</span>
									.
								</h2>
							</span>
						</span>
					</Link>
          )}
        </CardHoverEffect>
      </motion.div>
    </motion.main>
    </div>
    
  );
}
