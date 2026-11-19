import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { HomePage } from './pages/HomePage';
import { SITE_ASSETS } from './data/siteData';

const InodoPromotionalPage = lazy(() =>
  import('./components/InodoPromotionalPage').then((mod) => ({
    default: mod.InodoPromotionalPage,
  }))
);

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Crew Landscapes | Landscape Design & Construction in Chicago',
  '/about-us': 'Website Concept by InoDo | Crew Landscapes',
  '/services': 'Website Concept by InoDo | Crew Landscapes',
  '/projects': 'Website Concept by InoDo | Crew Landscapes',
  '/careers': 'Website Concept by InoDo | Crew Landscapes',
  '/contact': 'Website Concept by InoDo | Crew Landscapes',
};

const RouteMetadataSync: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      ROUTE_TITLES[pathname] ||
      'Crew Landscapes | Landscape Design & Construction in Chicago';
  }, [pathname]);

  return null;
};

const RouteFallback: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#151A1B] text-[#B6C0C2]">
    <span className="font-display text-xs font-bold tracking-[0.24em] uppercase">
      LOADING CONCEPT
    </span>
  </div>
);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <RouteMetadataSync />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Secondary Routes — Strictly Single-Screen InoDo Promotional Screens */}
            <Route
              path="/about-us"
              element={
                <InodoPromotionalPage
                  variant="centered"
                  backgroundImage={SITE_ASSETS.statementTwilight}
                  imageAlt="Twilight architectural garden terrace and reflecting pool"
                />
              }
            />
            <Route
              path="/services"
              element={
                <InodoPromotionalPage
                  variant="left-split"
                  backgroundImage={SITE_ASSETS.serviceBrickPaving}
                  secondaryImage={SITE_ASSETS.introPatio}
                  imageAlt="Interlocking brick paving and architectural stone courtyard"
                />
              }
            />
            <Route
              path="/projects"
              element={
                <InodoPromotionalPage
                  variant="asymmetric"
                  backgroundImage={SITE_ASSETS.serviceLandscapeInstall}
                  imageAlt="Evening natural stone fire pit patio and architectural planting"
                />
              }
            />
            <Route
              path="/careers"
              element={
                <InodoPromotionalPage
                  variant="layered"
                  backgroundImage={SITE_ASSETS.serviceCommercialMaint}
                  secondaryImage={SITE_ASSETS.introWalkway}
                  imageAlt="Architectural commercial plaza and natural limestone garden path"
                />
              }
            />
            <Route
              path="/contact"
              element={
                <InodoPromotionalPage
                  variant="spotlight"
                  backgroundImage={SITE_ASSETS.serviceSnowManagement}
                  imageAlt="Cleanly cleared Chicago architectural plaza at winter dawn"
                />
              }
            />

            {/* Fallback to homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  );
}
