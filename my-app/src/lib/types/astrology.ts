// Types for the Astrology Blog and Calculation System

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	publishedDate: string;
	tags: string[];
	category: 'general' | 'astrology' | 'tutorial' | 'interpretation';
	readTime: number;
}

export interface CelestialBody {
	name: string;
	longitude: number; // 0-360 degrees
	latitude: number; // -90 to 90 degrees
	distance: number; // AU
	speed: number; // degrees per day
	sign: string;
	degree: number; // 0-29.99 within sign
	retrograde: boolean;
	house?: number; // 1-12
}

export interface ZodiacSign {
	name: string;
	symbol: string;
	element: 'fire' | 'earth' | 'air' | 'water';
	modality: 'cardinal' | 'fixed' | 'mutable';
	rulingPlanet: string;
	startDegree: number;
	endDegree: number;
}

export interface House {
	number: number;
	sign: string;
	degree: number;
	cusp: number; // 0-360 degrees
}

export interface Aspect {
	body1: string;
	body2: string;
	type: AspectType;
	angle: number;
	orb: number;
	applying: boolean;
	separating: boolean;
}

export type AspectType = 
	| 'conjunction'
	| 'sextile'
	| 'square'
	| 'trine'
	| 'opposition'
	| 'quincunx'
	| 'semisextile'
	| 'semisquare'
	| 'sesquiquadrate';

export interface BirthChart {
	birthDate: Date;
	birthTime: Date;
	birthLocation: {
		latitude: number;
		longitude: number;
		timezone: string;
		city?: string;
	};
	sun: CelestialBody;
	moon: CelestialBody;
	mercury: CelestialBody;
	venus: CelestialBody;
	mars: CelestialBody;
	jupiter: CelestialBody;
	saturn: CelestialBody;
	uranus: CelestialBody;
	neptune: CelestialBody;
	pluto: CelestialBody;
	chiron: CelestialBody;
	northNode: CelestialBody;
	southNode: CelestialBody;
	lilith: CelestialBody;
	vertices: CelestialBody;
	houses: House[];
	ascendant: number;
	midheaven: number;
	aspects: Aspect[];
}

export interface Transit {
	date: Date;
	transitingBody: string;
	natalBody: string;
	aspectType: AspectType;
	angle: number;
	orb: number;
	influence: 'strong' | 'moderate' | 'weak';
	interpretation: string;
}

export interface SynastryChart {
	person1: BirthChart;
	person2: BirthChart;
	connections: SynastryConnection[];
	compositeChart?: BirthChart;
}

export interface SynastryConnection {
	body1: string; // from person1
	body2: string; // from person2
	aspectType: AspectType;
	angle: number;
	orb: number;
	interpretation: string;
	strength: number; // 0-10
}

export interface PlanetaryHour {
	startTime: Date;
	endTime: Date;
	rulingPlanet: string;
	quality: 'favorable' | 'neutral' | 'challenging';
	recommendedActivities: string[];
}

export interface LunarPhase {
	phase: 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';
	illumination: number; // 0-100%
	angle: number; // 0-360
	nextPhase: string;
	daysUntilNextPhase: number;
}

export interface EclipseInfo {
	type: 'solar' | 'lunar';
	date: Date;
	visibility: string[];
	saros: number;
	gamma: number;
	magnitude: number;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
	{ name: 'Aries', symbol: '♈', element: 'fire', modality: 'cardinal', rulingPlanet: 'Mars', startDegree: 0, endDegree: 30 },
	{ name: 'Taurus', symbol: '♉', element: 'earth', modality: 'fixed', rulingPlanet: 'Venus', startDegree: 30, endDegree: 60 },
	{ name: 'Gemini', symbol: '♊', element: 'air', modality: 'mutable', rulingPlanet: 'Mercury', startDegree: 60, endDegree: 90 },
	{ name: 'Cancer', symbol: '♋', element: 'water', modality: 'cardinal', rulingPlanet: 'Moon', startDegree: 90, endDegree: 120 },
	{ name: 'Leo', symbol: '♌', element: 'fire', modality: 'fixed', rulingPlanet: 'Sun', startDegree: 120, endDegree: 150 },
	{ name: 'Virgo', symbol: '♍', element: 'earth', modality: 'mutable', rulingPlanet: 'Mercury', startDegree: 150, endDegree: 180 },
	{ name: 'Libra', symbol: '♎', element: 'air', modality: 'cardinal', rulingPlanet: 'Venus', startDegree: 180, endDegree: 210 },
	{ name: 'Scorpio', symbol: '♏', element: 'water', modality: 'fixed', rulingPlanet: 'Mars/Pluto', startDegree: 210, endDegree: 240 },
	{ name: 'Sagittarius', symbol: '♐', element: 'fire', modality: 'mutable', rulingPlanet: 'Jupiter', startDegree: 240, endDegree: 270 },
	{ name: 'Capricorn', symbol: '♑', element: 'earth', modality: 'cardinal', rulingPlanet: 'Saturn', startDegree: 270, endDegree: 300 },
	{ name: 'Aquarius', symbol: '♒', element: 'air', modality: 'fixed', rulingPlanet: 'Saturn/Uranus', startDegree: 300, endDegree: 330 },
	{ name: 'Pisces', symbol: '♓', element: 'water', modality: 'mutable', rulingPlanet: 'Jupiter/Neptune', startDegree: 330, endDegree: 360 }
];

export const ASPECT_ANGLES: Record<AspectType, number> = {
	conjunction: 0,
	sextile: 60,
	square: 90,
	trine: 120,
	opposition: 180,
	quincunx: 150,
	semisextile: 30,
	semisquare: 45,
	sesquiquadrate: 135
};

export const ASPECT_ORBS: Record<AspectType, number> = {
	conjunction: 8,
	sextile: 6,
	square: 8,
	trine: 8,
	opposition: 8,
	quincunx: 3,
	semisextile: 2,
	semisquare: 2,
	sesquiquadrate: 2
};
