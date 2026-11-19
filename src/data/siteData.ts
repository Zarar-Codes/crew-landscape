export type ServiceOption =
  | 'Brick Paving'
  | 'Landscape Installation'
  | 'Commercial Landscape Maintenance'
  | 'Snow Management'
  | 'Outdoor Living'
  | 'Complete Landscape Renovation'
  | 'Other';

export const SERVICE_OPTIONS: ServiceOption[] = [
  'Brick Paving',
  'Landscape Installation',
  'Commercial Landscape Maintenance',
  'Snow Management',
  'Outdoor Living',
  'Complete Landscape Renovation',
  'Other',
];

export const SITE_ASSETS = {
  hero: '/assets/aistudio/image_959373cc.png',
  introPatio: '/src/assets/images/intro_stone_patio_1795091345890.jpg',
  introWalkway: '/src/assets/images/intro_walkway_detail_1795091346293.jpg',
  serviceBrickPaving: '/src/assets/images/service_brick_paving_1795091376522.jpg',
  serviceLandscapeInstall: '/src/assets/images/service_landscape_install_1795091345746.jpg',
  serviceCommercialMaint: '/src/assets/images/service_commercial_maint_1795091345501.jpg',
  serviceSnowManagement: '/src/assets/images/service_snow_management_1795091345746.jpg',
  galleryConstructionPrep: '/src/assets/images/gallery_construction_prep_1795091377144.jpg',
  galleryDesignPlan: '/src/assets/images/gallery_design_plan_1795091374560.jpg',
  statementTwilight: '/src/assets/images/statement_twilight_garden_1795091345134.jpg',
} as const;

export const BUSINESS_INFO = {
  name: 'Crew Landscapes',
  established: '2014',
  phoneDisplay: '773-658-6988',
  phoneHref: 'tel:+17736586988',
  email: 'info@crewlandscapes.com',
  emailHref: 'mailto:info@crewlandscapes.com',
  location: 'Chicago, Illinois',
  instagramUrl: 'https://www.instagram.com/crew_landscapes/',
  websiteUrl: 'https://crewlandscapes.com/',
  inodoUrl: 'https://inodo.net',
} as const;

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  scopeLabels: string[];
  image: string;
  alt: string;
  ctaLabel: string;
  inquiryService: ServiceOption;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'brick-paving',
    index: '01',
    title: 'BRICK PAVING',
    description:
      'Beautifully planned paver installations for patios, walkways, and driveways, with attention to foundation preparation, proper drainage, and a clean finished appearance.',
    scopeLabels: ['Patios', 'Walkways', 'Driveways', 'Base & Drainage'],
    image: SITE_ASSETS.serviceBrickPaving,
    alt: 'Interlocking architectural brick paver driveway and curved walkway with charcoal soldier-course border',
    ctaLabel: 'Inquire About Brick Paving',
    inquiryService: 'Brick Paving',
  },
  {
    id: 'landscape-installation',
    index: '02',
    title: 'LANDSCAPE INSTALLATION',
    description:
      'Thoughtfully planned landscape installations that bring together planting, lighting, fire pits, turf, and other outdoor features.',
    scopeLabels: ['Planting Beds', 'Outdoor Lighting', 'Fire Pits', 'Turf & Features'],
    image: SITE_ASSETS.serviceLandscapeInstall,
    alt: 'Sunken natural stone patio with linear fire pit, layered ornamental grasses, hydrangeas, and evening landscape lighting',
    ctaLabel: 'Plan a Landscape Installation',
    inquiryService: 'Landscape Installation',
  },
  {
    id: 'commercial-landscape-maintenance',
    index: '03',
    title: 'COMMERCIAL LANDSCAPE MAINTENANCE',
    description:
      'Consistent property maintenance, weekly services, and seasonal enhancements tailored to commercial and HOA properties.',
    scopeLabels: ['Weekly Service', 'Commercial Sites', 'HOA Properties', 'Seasonal Care'],
    image: SITE_ASSETS.serviceCommercialMaint,
    alt: 'Maintained modern commercial courtyard and HOA plaza in Chicago with crisp turf bands and architectural planters',
    ctaLabel: 'Request Commercial Maintenance',
    inquiryService: 'Commercial Landscape Maintenance',
  },
  {
    id: 'snow-management',
    index: '04',
    title: 'SNOW MANAGEMENT',
    description:
      'Seasonal snow and ice management for commercial and HOA properties.',
    scopeLabels: ['Commercial Plazas', 'HOA Walkways', 'Snow Clearing', 'Ice Control'],
    image: SITE_ASSETS.serviceSnowManagement,
    alt: 'Cleanly cleared commercial stone plaza and illuminated walkways after Chicago winter snowfall',
    ctaLabel: 'Discuss Snow Management',
    inquiryService: 'Snow Management',
  },
  {
    id: 'outdoor-living-renovations',
    index: '05',
    title: 'OUTDOOR LIVING & LANDSCAPE RENOVATIONS',
    description:
      'Complete residential landscape transformations combining architectural patios, gardens, outdoor living spaces, planting, and evening lighting into one cohesive environment.',
    scopeLabels: ['Outdoor Living', 'Complete Renovations', 'Gardens & Lighting', 'Design-Build'],
    image: SITE_ASSETS.hero,
    alt: 'Architectural outdoor living terrace with carved stone fire feature, wood deck, reflecting pool, and structured garden backdrop',
    ctaLabel: 'Start an Outdoor Living Project',
    inquiryService: 'Outdoor Living',
  },
];

export type GalleryCategory = 'All' | 'Completed Projects' | 'During Construction' | 'Design';

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, 'All'>;
  title: string;
  caption: string;
  image: string;
  alt: string;
  inquiryService: ServiceOption;
  ctaLabel: string;
  layout: 'featured' | 'tall' | 'standard' | 'wide';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'stone-courtyard-terrace',
    category: 'Completed Projects',
    title: 'Bluestone & Brick Courtyard',
    caption: 'Natural bluestone slabs paired with interlocking brick pavers, architectural seat walls, and layered boxwood planting.',
    image: SITE_ASSETS.introPatio,
    alt: 'Residential Chicago courtyard combining natural bluestone paving, brick pathways, limestone walls, and structured greenery',
    inquiryService: 'Complete Landscape Renovation',
    ctaLabel: 'Start a Similar Project',
    layout: 'featured',
  },
  {
    id: 'limestone-garden-walk',
    category: 'Completed Projects',
    title: 'Natural Limestone Walkway',
    caption: 'Cut limestone stepping path framed by shade perennials, ferns, and low-voltage architectural brass lighting.',
    image: SITE_ASSETS.introWalkway,
    alt: 'Cut natural limestone stepping stone walkway curving through lush green hostas, ferns, and brass path lights',
    inquiryService: 'Landscape Installation',
    ctaLabel: 'Discuss Your Walkway',
    layout: 'tall',
  },
  {
    id: 'master-plan-concept',
    category: 'Design',
    title: 'Site Plan & Material Selection',
    caption: 'Spatial layout planning paired with natural bluestone and manufactured brick paver samples before excavation begins.',
    image: SITE_ASSETS.galleryDesignPlan,
    alt: 'Architectural landscape master plan drawing on drafting paper alongside bluestone and brick paver material samples',
    inquiryService: 'Complete Landscape Renovation',
    ctaLabel: 'Begin With Design',
    layout: 'standard',
  },
  {
    id: 'aggregate-base-prep',
    category: 'During Construction',
    title: 'Foundation & Base Preparation',
    caption: 'Compacted crushed limestone base, precision layout lines, and staged masonry engineered for proper drainage and durability.',
    image: SITE_ASSETS.galleryConstructionPrep,
    alt: 'Residential patio under construction showing compacted aggregate base, mason layout lines, and neatly stacked natural stone pallets',
    inquiryService: 'Brick Paving',
    ctaLabel: 'Plan a Brick Patio',
    layout: 'standard',
  },
  {
    id: 'twilight-fire-patio',
    category: 'Completed Projects',
    title: 'Evening Fire Feature & Planting',
    caption: 'Sunken natural stone gathering space with linear fire pit, multi-stem birch trees, and warm architectural uplighting.',
    image: SITE_ASSETS.serviceLandscapeInstall,
    alt: 'Twilight view of sunken natural stone fire pit patio surrounded by ornamental grasses and illuminated birch trees',
    inquiryService: 'Outdoor Living',
    ctaLabel: 'Planning a New Patio?',
    layout: 'wide',
  },
  {
    id: 'herringbone-entry-pavers',
    category: 'Completed Projects',
    title: 'Interlocking Brick Entry & Drive',
    caption: 'Curved brick paver driveway and front walkway defined by a crisp dark charcoal soldier-course border.',
    image: SITE_ASSETS.serviceBrickPaving,
    alt: 'Curving interlocking brick paver walkway and driveway with charcoal border leading to a brick residence',
    inquiryService: 'Brick Paving',
    ctaLabel: 'Inquire About Brick Paving',
    layout: 'standard',
  },
];

export const ABOUT_PILLARS = [
  {
    index: '01',
    title: 'DESIGN-BUILD APPROACH',
    body: 'Consultation, landscape design, and construction managed under one roof—guiding each outdoor space seamlessly from initial concept to finished build.',
  },
  {
    index: '02',
    title: 'COLLABORATIVE PROCESS',
    body: 'Working directly with homeowners, property managers, designers, and craftsmen to shape every outdoor environment around how the space will truly be used.',
  },
  {
    index: '03',
    title: 'MATERIALS & CRAFTSMANSHIP',
    body: 'Selecting quality plant material alongside natural and manufactured stone, installed with disciplined base preparation and clean architectural detailing.',
  },
  {
    index: '04',
    title: 'BUILT FOR LONG-TERM USE',
    body: 'Every patio, walkway, and planting bed is constructed with durability, proper drainage, and lasting visual appeal through Chicago seasons.',
  },
] as const;

export const PROCESS_STAGES = [
  {
    index: '01',
    title: 'CONSULTATION',
    summary: "Understand the client's needs, priorities, and vision.",
    detail:
      'Every project begins on-site—walking the property, listening to how you intend to use the space, and identifying structural, drainage, and aesthetic opportunities.',
    image: SITE_ASSETS.introPatio,
    alt: 'Residential courtyard consultation context',
  },
  {
    index: '02',
    title: 'DESIGN',
    summary: 'Develop a thoughtful landscape concept.',
    detail:
      'We translate site observations into a cohesive spatial plan, pairing patio geometry, planting layers, lighting, and natural or manufactured stone selections.',
    image: SITE_ASSETS.galleryDesignPlan,
    alt: 'Architectural landscape blueprint and stone samples',
  },
  {
    index: '03',
    title: 'CONSTRUCTION',
    summary: 'Bring the approved design into reality through coordinated construction.',
    detail:
      'From excavation and compacted aggregate foundations to masonry, planting, and low-voltage lighting, our crews execute each layer with clean jobsite discipline.',
    image: SITE_ASSETS.galleryConstructionPrep,
    alt: 'Patio foundation preparation and paver staging during construction',
  },
  {
    index: '04',
    title: 'COMPLETION',
    summary: 'Deliver a cohesive outdoor environment with attention to quality and detail.',
    detail:
      'Final grading, crisp edging, and a thorough walkthrough ensure every stone joint, fixture, and plant bed feels settled, refined, and ready to enjoy.',
    image: SITE_ASSETS.serviceLandscapeInstall,
    alt: 'Completed twilight stone terrace and illuminated garden',
  },
] as const;

export const NAV_ITEMS = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about-us' },
  { label: 'SERVICES', to: '/services' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'CAREERS', to: '/careers' },
  { label: 'CONTACT', to: '/contact' },
] as const;
