import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ResilientImage } from './ResilientImage';
import { LandscapeStudio3D } from './LandscapeStudio3D';
import { PROCESS_STAGES } from '../data/siteData';

export const ProcessSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [show3DStudy, setShow3DStudy] = useState<boolean>(true);
  const activeStage = PROCESS_STAGES[activeStageIndex];

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-white py-20 sm:py-28 lg:py-36 text-[#202526]"
    >
      <div className="mx-auto w-[92%] max-w-[1440px]">
        {/* Section Header */}
        <div className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="font-sans text-xs font-bold tracking-[0.24em] uppercase text-[#005B63]">
              HOW WE WORK
            </p>
            <h2
              id="process-heading"
              className="mt-4 font-display font-extrabold uppercase tracking-[-0.03em] leading-[1.0] text-[#151A1B] text-[clamp(2.15rem,4.4vw,4.1rem)]"
            >
              ONE CONNECTED PROCESS.
              <br />
              <span className="text-[#005B63]">FROM CONCEPT TO COMPLETION.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:text-right"
          >
            <p className="font-sans text-sm sm:text-[15px] leading-[1.65] text-[#727D7F] lg:ml-auto lg:max-w-[36ch]">
              A single design-build team coordinates planning, material selection, site work, and
              finished construction.
            </p>
          </motion.div>
        </div>

        {/* 4-Stage Visual Horizontal Timeline */}
        <div className="relative mt-4">
          {/* Connecting Progress Rail (Desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-[#202526]/12"
          >
            <motion.div
              className="h-full bg-[#005B63] origin-left"
              initial={{ scaleX: 0.25 }}
              animate={{ scaleX: (activeStageIndex + 1) / PROCESS_STAGES.length }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STAGES.map((stage, idx) => {
              const isSelected = idx === activeStageIndex;
              return (
                <motion.button
                  key={stage.index}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col items-start border-t-2 pt-6 pb-4 text-left transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#005B63]'
                      : 'border-[#202526]/15 hover:border-[#08717A]/60'
                  }`}
                >
                  <span
                    className={`editorial-index font-display text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors ${
                      isSelected
                        ? 'text-[#005B63]'
                        : 'text-[#B6C0C2] group-hover:text-[#202526]'
                    }`}
                  >
                    {stage.index}
                  </span>

                  <h3 className="mt-4 font-display text-lg font-extrabold tracking-[0.04em] uppercase text-[#151A1B]">
                    {stage.title}
                  </h3>

                  <p className="mt-2 font-sans text-sm leading-[1.6] text-[#727D7F]">
                    {stage.summary}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Interactive Stage Photographic Detail & Architectural 3D Concept Studio Toggle */}
        <div className="mt-10 border-t border-[#202526]/12 pt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#005B63]">
                {show3DStudy
                  ? 'INTERACTIVE 3D DESIGN-BUILD MODEL'
                  : `STAGE ${activeStage.index} · ${activeStage.title}`}
              </span>
              <p className="mt-1 font-sans text-sm text-[#727D7F]">
                {show3DStudy
                  ? 'Explore how Crew Landscapes integrates compacted aggregate sub-bases, stone paving, pergolas, fire features, and layered planting.'
                  : activeStage.detail}
              </p>
            </div>

            <div className="inline-flex items-center gap-1 bg-[#EDF1F1] p-1 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShow3DStudy(true)}
                className={`px-3.5 py-2 font-sans text-xs font-semibold tracking-[0.06em] transition-colors cursor-pointer whitespace-nowrap ${
                  show3DStudy
                    ? 'bg-[#005B63] text-white'
                    : 'text-[#202526]/75 hover:text-[#005B63]'
                }`}
              >
                3D Site Study
              </button>
              <button
                type="button"
                onClick={() => setShow3DStudy(false)}
                className={`px-3.5 py-2 font-sans text-xs font-semibold tracking-[0.06em] transition-colors cursor-pointer whitespace-nowrap ${
                  !show3DStudy
                    ? 'bg-[#005B63] text-white'
                    : 'text-[#202526]/75 hover:text-[#005B63]'
                }`}
              >
                Stage Photography
              </button>
            </div>
          </div>

          {show3DStudy ? (
            <LandscapeStudio3D />
          ) : (
            <motion.div
              key={activeStage.index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-8 bg-[#EDF1F1] p-6 sm:p-8 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-7 overflow-hidden aspect-[16/10] bg-white">
                <ResilientImage
                  src={activeStage.image}
                  alt={activeStage.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <span className="editorial-index font-display text-5xl font-extrabold text-[#005B63]">
                  {activeStage.index}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-[-0.02em] text-[#151A1B]">
                  {activeStage.title}
                </h3>
                <p className="font-sans text-base leading-[1.7] text-[#202526]/85">
                  {activeStage.detail}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
