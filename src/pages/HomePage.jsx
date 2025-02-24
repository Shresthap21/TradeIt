import React, { useState } from "react";
import { Login } from "./Login";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { MdOutlineArticle } from "react-icons/md";
import Header from "@/components/Header";
const HomePage = () => {


  return (
    <div className="h-screen flex flex-col">
      <Header/>
    
      <div className="flex flex-col flex-1   gap-y-[15rem]">
        <h1 className="text-center text-3xl font-bold mt-4 c">Tradon </h1>
        <div>
          <Accordion
            type="single"
            collapsible
            className="min-w-full  px-10 space-y-10"
          >
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="hover:no-underline text-xl">
                What we offer?
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-5">
                  <li className="flex">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <strong>Automatic Trade Setups</strong>: We help swing
                    traders find trade setups from a pool of over 600 tickers
                    from S&P 500, Nasdaq, Dow Jones, ETFs, indices, crypto and
                    precious metals. A trade setup includes a buy zone, a stop
                    loss, and target levels
                  </li>
                  <li className="flex">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <strong>Watchlist</strong>: Finding active trade setups is
                    like finding a needle in a haystack. So we provide a
                    watchlist of trade setups for multiple timeframes, updated
                    once daily. Currently we provide a watchlist of bullish
                    trade setups
                  </li>
                  <li className="flex">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <strong>Tracking</strong>: Once you are confident in a trade
                    setup, you end up manually tracking events (price enters buy
                    zone, reaches target levels, or hits stop loss) or setting
                    up individual alerts, that require manual effort. We
                    automatically track all these events for you so you don’t
                    have to spend hours in front of the screen
                  </li>
                  <li className="flex">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <strong>Flexibility</strong>: You can change your trade
                    setup's stop loss level at any time during the trackng
                    process
                  </li>
                  <li className="flex">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <strong>At a Glance</strong>: It is challenging to keep
                    track of the status of multiple trade setups at once. We
                    provide a performance page designed for just that
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-none" value="item-2">
              <AccordionTrigger className="hover:no-underline  text-xl">
                How we find trade setups?
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <div>
                      <span>
                        We use Smart Money Concepts to find trade setups.
                      </span>
                      <ul className="pl-6 mt-2 space-y-2">
                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>
                            It identifies zones that align with institutional
                            entry points where smart money is likely to
                            accumulate long positions.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <div>
                      <span>
                        When there is a change of trend (e.g., Low, High, Lower
                        Low, Higher High in the bullish case) near critical
                        support and resistance levels, it creates a trade setup:
                      </span>
                      <ul className="pl-6 mt-2 space-y-2">
                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>Stop loss is placed below the Low</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>
                            Fibonacci retracement is used to identify the buy
                            zone.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>
                            Critical support/resistance levels are used as
                            target levels
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <div>
                      <span>What Support/Resistance levels do we use?</span>
                      <ul className="pl-6 mt-2 space-y-2">
                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>Daily/Weekly/Monthly Closures:</span>
                        </li>
                        <ul className="pl-6 mt-2 space-y-2">
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Focuses on levels where two consecutive candle
                              open/close prices align, indicating areas of
                              significant market consensus.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Higher timeframe levels (e.g., weekly and monthly)
                              carry greater weight as they reflect institutional
                              activity.
                            </span>
                          </li>
                        </ul>

                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>Fib Retracement Levels:</span>
                        </li>
                        <ul className="pl-6 mt-2 space-y-2">
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Identifies critical Fibonacci retracement levels
                              (e.g. 38.2%, 50%, 61.8%, and 78.6%) derived from
                              prior key swing highs and lows and major
                              support/resistance levels.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Uses these levels as areas of potential
                              institutional interest, particularly for
                              retracement entries.
                            </span>
                          </li>
                        </ul>

                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>Large Volume Levels</span>
                        </li>
                        <ul className="pl-6 mt-2 space-y-2">
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Levels where the Volume Profile peaks, as these
                              indicate zones where substantial trading activity
                              occurred (potential institutional
                              accumulation/distribution zones).
                            </span>
                          </li>
                        </ul>

                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>Moving Averages</span>
                        </li>
                        <ul className="pl-6 mt-2 space-y-2">
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Utilizes moving averages (e.g., 50, 100, 200 EMAs)
                              to identify dynamic support/resistance levels.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Identifies areas where price frequently reacts to
                              the moving average as a confluence with other SMC
                              elements.
                            </span>
                          </li>
                        </ul>

                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>Fair Value Gaps (FVG): Large FVGs</span>
                        </li>
                        <ul className="pl-6 mt-2 space-y-2">
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Focuses on large FVGs, representing price
                              inefficiencies where institutional orders were
                              likely placed.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                            <span>
                              Price often retraces to these gaps before
                              continuing in the intended direction.
                            </span>
                          </li>
                        </ul>
                      </ul>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="h-2 min-w-2 bg-neutral-600 mt-2 mr-2 rounded-full"></div>
                    <div>
                      <span>How is the Buy Zone (green zone) calculated?</span>
                      <ul className="pl-6 mt-2 space-y-2">
                        <li className="flex items-start">
                          <div className="h-1.5 min-w-1.5 bg-neutral-500 mt-2 mr-2 rounded-full"></div>
                          <span>
                            The Buy Zone is calculated using the 50%–61.8%
                            Fibonacci retracement levels between the Lower Low
                            and the Higher High. We refer to them as anchor and
                            pivot repectively on our charts.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
