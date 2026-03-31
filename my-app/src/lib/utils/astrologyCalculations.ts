// Advanced Astrology Calculations - Swiss Ephemeris style calculations
import type {
	CelestialBody,
	BirthChart,
	Aspect,
	AspectType,
	House,
	LunarPhase,
	PlanetaryHour
} from '$lib/types/astrology';
import { ZODIAC_SIGNS, ASPECT_ANGLES, ASPECT_ORBS } from '$lib/types/astrology';

// Constants
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;
const JULIAN_CENTURY_DAYS = 36525;
const J2000_EPOCH = 2451545.0;

// Helper functions
function normalizeDegrees(degrees: number): number {
	return ((degrees % 360) + 360) % 360;
}

function getSign(longitude: number): string {
	const signIndex = Math.floor(longitude / 30);
	return ZODIAC_SIGNS[signIndex].name;
}

function getDegreeInSign(longitude: number): number {
	return longitude % 30;
}

// Julian Date Calculation
function getJulianDate(date: Date): number {
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1;
	const day = date.getUTCDate();
	const hour = date.getUTCHours();
	const minute = date.getUTCMinutes();
	const second = date.getUTCSeconds();

	let y = year;
	let m = month;

	if (m <= 2) {
		y -= 1;
		m += 12;
	}

	const a = Math.floor(y / 100);
	const b = 2 - a + Math.floor(a / 4);

	const jd =
		Math.floor(365.25 * (y + 4716)) +
		Math.floor(30.6001 * (m + 1)) +
		day +
		b -
		1524.5 +
		(hour + minute / 60 + second / 3600) / 24;

	return jd;
}

function getJulianCentury(jd: number): number {
	return (jd - J2000_EPOCH) / JULIAN_CENTURY_DAYS;
}

// Mean Longitude of Planets (simplified VSOP87-style)
function calculateSunLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	// Mean longitude
	let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;

	// Mean anomaly
	const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
	const Mrad = M * DEG_TO_RAD;

	// Equation of center
	const C =
		(1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
		(0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
		0.000289 * Math.sin(3 * Mrad);

	// True longitude
	const sunLong = L0 + C;

	return normalizeDegrees(sunLong);
}

function calculateMoonLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	// Moon's mean longitude
	const L0 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;

	// Moon's mean anomaly
	const M = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
	const Mrad = M * DEG_TO_RAD;

	// Sun's mean anomaly
	const Ms = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
	const Msrad = Ms * DEG_TO_RAD;

	// Moon's mean distance from ascending node
	const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T;
	const Frad = F * DEG_TO_RAD;

	// Evection
	const evection = 1.2739 * Math.sin(2 * Frad - Mrad);

	// Annual equation
	const annualEq = 0.1858 * Math.sin(Msrad);

	// Variation
	const D = (L0 - Ms) * DEG_TO_RAD;
	const variation = 0.3698 * Math.sin(2 * D);

	// Reduce to ecliptic
	const longitude =
		L0 +
		6.2887 * Math.sin(Mrad) +
		evection -
		annualEq +
		variation -
		0.0003 * T;

	return normalizeDegrees(longitude);
}

function calculateMercuryLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	// Mercury's orbital elements
	const L0 = 252.25090552 + 149472.67411175 * T - 0.00013314 * T * T;
	const M = 174.79108569 + 149472.67411175 * T - 0.00013314 * T * T;
	const Mrad = M * DEG_TO_RAD;

	// Equation of center for Mercury
	const e = 0.20563593 + 0.00001906 * T;
	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad) +
		0.625 * e * e * e * Math.sin(3 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculateVenusLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	const L0 = 181.97980085 + 58517.81567493 * T + 0.00011134 * T * T;
	const M = 49.25178127 + 58517.81567493 * T + 0.00011134 * T * T;
	const Mrad = M * DEG_TO_DEG;

	const e = 0.00677672 - 0.00004107 * T;

	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculateMarsLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	const L0 = 355.43299958 + 19140.29931266 * T + 0.00012279 * T * T;
	const M = 19.37303382 + 19140.29931266 * T + 0.00012279 * T * T;
	const Mrad = M * DEG_TO_RAD;

	const e = 0.09340062 - 0.00009082 * T;

	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculateJupiterLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	const L0 = 34.35151874 + 3034.90567464 * T - 0.00011073 * T * T;
	const M = 20.02033274 + 3034.90567464 * T - 0.00011073 * T * T;
	const Mrad = M * DEG_TO_RAD;

	const e = 0.04849794 - 0.00012778 * T;

	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculateSaturnLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	const L0 = 50.07747140 + 1222.11379402 * T + 0.00033822 * T * T;
	const M = 317.02088201 + 1222.11379402 * T + 0.00033822 * T * T;
	const Mrad = M * DEG_TO_RAD;

	const e = 0.05415060 - 0.00035896 * T;

	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculateUranusLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	const L0 = 314.05500511 + 428.46699831 * T + 0.00030393 * T * T;
	const M = 142.59078996 + 428.46699831 * T + 0.00030393 * T * T;
	const Mrad = M * DEG_TO_RAD;

	const e = 0.04716771 + 0.00000068 * T;

	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculateNeptuneLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	const L0 = 304.34866549 + 218.48620021 * T + 0.00020819 * T * T;
	const M = 260.24736951 + 218.48620021 * T + 0.00020819 * T * T;
	const Mrad = M * DEG_TO_RAD;

	const e = 0.00858587 + 0.00000066 * T;

	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculatePlutoLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	// Simplified Pluto calculation
	const L0 = 238.958116 + 146.350909 * T;
	const M = 13.2563 + 146.350909 * T;
	const Mrad = M * DEG_TO_RAD;

	const e = 0.24880766;

	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculateNorthNodeLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	// Mean North Node
	const node = 125.04452 - 1934.136261 * T + 0.0020708 * T * T;

	return normalizeDegrees(node);
}

function calculateChironLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	// Simplified Chiron calculation
	const L0 = 345.0 + 35.0 * T;
	const M = 290.0 + 35.0 * T;
	const Mrad = M * DEG_TO_RAD;

	const e = 0.38;

	const C =
		(2 * e - 0.25 * e * e * e) * Math.sin(Mrad) +
		1.25 * e * e * Math.sin(2 * Mrad);

	return normalizeDegrees(L0 + C * RAD_TO_DEG);
}

function calculateLilithLongitude(jd: number): number {
	const T = getJulianCentury(jd);

	// Mean Lilith (Dark Moon)
	const lilith = 234.0 + 48.0 * T;

	return normalizeDegrees(lilith);
}

// House Calculations (Placidus system simplified)
function calculateHouses(
	jd: number,
	latitude: number,
	longitude: number
): { cusps: number[]; ascendant: number; midheaven: number } {
	const T = getJulianCentury(jd);

	// Calculate Sidereal Time
	const GMST =
		280.46061837 +
		360.98564736629 * (jd - J2000_EPOCH) +
		0.000387933 * T * T -
		T * T * T / 38710000;

	const localSiderealTime = normalizeDegrees(GMST + longitude);
	const lstRad = localSiderealTime * DEG_TO_RAD;
	const latRad = latitude * DEG_TO_RAD;

	// Midheaven (MC)
	const mc = Math.atan(Math.tan(lstRad) / Math.cos(23.439291 * DEG_TO_RAD)) * RAD_TO_DEG;
	const midheaven = normalizeDegrees(mc);

	// Ascendant
	const ramc = lstRad;
	const obliquity = 23.439291 * DEG_TO_RAD;

	const ascRising = Math.atan(
		-(Math.cos(ramc) / (Math.sin(ramc) * Math.cos(obliquity) + Math.tan(latRad) * Math.sin(obliquity)))
	);
	let ascendant = ascRising * RAD_TO_DEG;

	if (ascendant < 0) ascendant += 180;
	if (Math.cos(ramc) > 0) ascendant += 180;

	ascendant = normalizeDegrees(ascendant);

	// Simplified Placidus cusps
	const cusps: number[] = [ascendant];

	for (let house = 2; house <= 12; house++) {
		const houseAngle = ((house - 1) * 30 + localSiderealTime) * DEG_TO_RAD;
		let cusp =
			midheaven +
			(house - 10) * 30 +
			Math.sin(houseAngle) * 5 * Math.sin(latRad);
		cusps.push(normalizeDegrees(cusp));
	}

	return { cusps, ascendant, midheaven };
}

// Aspect Detection
function detectAspects(bodies: CelestialBody[]): Aspect[] {
	const aspects: Aspect[] = [];
	const bodyNames = Object.keys({});

	for (let i = 0; i < bodies.length; i++) {
		for (let j = i + 1; j < bodies.length; j++) {
			const body1 = bodies[i];
			const body2 = bodies[j];

			const diff = Math.abs(body1.longitude - body2.longitude);
			const actualDiff = diff > 180 ? 360 - diff : diff;

			for (const [aspectType, angle] of Object.entries(ASPECT_ANGLES)) {
				const orb = ASPECT_ORBS[aspectType as AspectType];
				const orbDiff = Math.abs(actualDiff - angle);

				if (orbDiff <= orb) {
					aspects.push({
						body1: body1.name,
						body2: body2.name,
						type: aspectType as AspectType,
						angle: actualDiff,
					 orb: orbDiff,
						applying: body1.speed > body2.speed,
						separating: body1.speed <= body2.speed
					});
					break;
				}
			}
		}
	}

	return aspects;
}

// Main Birth Chart Calculation
export function calculateBirthChart(
	birthDate: Date,
	birthTime: Date,
	latitude: number,
	longitude: number,
	timezone: string
): BirthChart {
	const combinedDateTime = new Date(
		birthDate.getFullYear(),
		birthDate.getMonth(),
		birthDate.getDate(),
		birthTime.getHours(),
		birthTime.getMinutes(),
		birthTime.getSeconds()
	);

	const jd = getJulianDate(combinedDateTime);

	// Calculate planetary positions
	const sunLong = calculateSunLongitude(jd);
	const moonLong = calculateMoonLongitude(jd);
	const mercuryLong = calculateMercuryLongitude(jd);
	const venusLong = calculateVenusLongitude(jd);
	const marsLong = calculateMarsLongitude(jd);
	const jupiterLong = calculateJupiterLongitude(jd);
	const saturnLong = calculateSaturnLongitude(jd);
	const uranusLong = calculateUranusLongitude(jd);
	const neptuneLong = calculateNeptuneLongitude(jd);
	const plutoLong = calculatePlutoLongitude(jd);
	const chironLong = calculateChironLongitude(jd);
	const northNodeLong = calculateNorthNodeLongitude(jd);
	const lilithLong = calculateLilithLongitude(jd);

	// Create celestial bodies
	const createBody = (name: string, longitude: number, speed: number): CelestialBody => ({
		name,
		longitude,
		latitude: 0, // Simplified
		distance: 1, // Simplified
		speed,
		sign: getSign(longitude),
		degree: getDegreeInSign(longitude),
		retrograde: false // Simplified
	});

	const sun = createBody('Sun', sunLong, 0.9856);
	const moon = createBody('Moon', moonLong, 13.1764);
	const mercury = createBody('Mercury', mercuryLong, 1.383);
	const venus = createBody('Venus', venusLong, 1.2);
	const mars = createBody('Mars', marsLong, 0.524);
	const jupiter = createBody('Jupiter', jupiterLong, 0.083);
	const saturn = createBody('Saturn', saturnLong, 0.033);
	const uranus = createBody('Uranus', uranusLong, 0.012);
	const neptune = createBody('Neptune', neptuneLong, 0.006);
	const pluto = createBody('Pluto', plutoLong, 0.004);
	const chiron = createBody('Chiron', chironLong, 0.02);
	const northNode = createBody('North Node', northNodeLong, -0.053);
	const southNode = createBody('South Node', normalizeDegrees(northNodeLong + 180), -0.053);
	const lilith = createBody('Lilith', lilithLong, 0.11);

	const bodies = [
		sun,
		moon,
		mercury,
		venus,
		mars,
		jupiter,
		saturn,
		uranus,
		neptune,
		pluto,
		chiron,
		northNode,
		southNode,
		lilith
	];

	// Calculate houses
	const { cusps, ascendant, midheaven } = calculateHouses(jd, latitude, longitude);

	// Assign houses to planets
	bodies.forEach((body) => {
		for (let i = 0; i < cusps.length; i++) {
			const nextCusp = cusps[(i + 1) % 12];
			const currentCusp = cusps[i];

			if (currentCusp < nextCusp) {
				if (body.longitude >= currentCusp && body.longitude < nextCusp) {
					body.house = i + 1;
					break;
				}
			} else {
				if (body.longitude >= currentCusp || body.longitude < nextCusp) {
					body.house = i + 1;
					break;
				}
			}
		}
	});

	// Detect aspects
	const aspects = detectAspects(bodies);

	// Create houses array
	const houses: House[] = cusps.map((cusp, index) => ({
		number: index + 1,
		sign: getSign(cusp),
		degree: getDegreeInSign(cusp),
		cusp
	}));

	return {
		birthDate,
		birthTime: combinedDateTime,
		birthLocation: { latitude, longitude, timezone },
		sun,
		moon,
		mercury,
		venus,
		mars,
		jupiter,
		saturn,
		uranus,
		neptune,
		pluto,
		chiron,
		northNode,
		southNode,
		lilith,
		vertices: createBody('Vertex', 0, 0), // Simplified
		houses,
		ascendant,
		midheaven,
		aspects
	};
}

// Lunar Phase Calculation
export function calculateLunarPhase(date: Date): LunarPhase {
	const jd = getJulianDate(date);

	// Known new moon reference (January 6, 2000)
	const knownNewMoon = 2451550.1;
	const synodicMonth = 29.53058867;

	const daysSinceNewMoon = jd - knownNewMoon;
	const cycles = daysSinceNewMoon / synodicMonth;
	const phase = cycles - Math.floor(cycles);
	const angle = phase * 360;
	const illumination = (1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100;

	let phaseName: LunarPhase['phase'] = 'new';
	if (phase > 0.03 && phase < 0.22) phaseName = 'waxing_crescent';
	else if (phase >= 0.22 && phase < 0.28) phaseName = 'first_quarter';
	else if (phase >= 0.28 && phase < 0.47) phaseName = 'waxing_gibbous';
	else if (phase >= 0.47 && phase < 0.53) phaseName = 'full';
	else if (phase >= 0.53 && phase < 0.72) phaseName = 'waning_gibbous';
	else if (phase >= 0.72 && phase < 0.78) phaseName = 'last_quarter';
	else if (phase >= 0.78 && phase < 0.97) phaseName = 'waning_crescent';

	const daysUntilNextPhase = (1 - phase) * synodicMonth;

	return {
		phase: phaseName,
		illumination,
		angle,
		nextPhase: 'new',
		daysUntilNextPhase
	};
}

// Planetary Hours Calculation
export function calculatePlanetaryHours(date: Date, latitude: number, longitude: number): PlanetaryHour[] {
	// Simplified planetary hours calculation
	const hours: PlanetaryHour[] = [];
	const planets = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];

	// Get day of week ruler
	const dayOfWeek = date.getDay(); // 0 = Sunday
	const dayRuler = planets[(dayOfWeek + 1) % 7];

	let currentPlanetIndex = planets.indexOf(dayRuler);

	for (let i = 0; i < 24; i++) {
		const startTime = new Date(date);
		startTime.setHours(i, 0, 0, 0);

		const endTime = new Date(startTime);
		endTime.setHours(i + 1, 0, 0, 0);

		const rulingPlanet = planets[currentPlanetIndex % 7];

		hours.push({
			startTime,
			endTime,
			rulingPlanet,
			quality: 'neutral',
			recommendedActivities: []
		});

		currentPlanetIndex++;
	}

	return hours;
}

// Interpretation helpers
export function interpretPlanetInSign(planet: string, sign: string, house?: number): string {
	const interpretations: Record<string, Record<string, string>> = {
		Sun: {
			Aries: 'พลังแห่งความเป็นผู้นำ ความกล้าหาญ และความเป็นตัวของตัวเองสูง',
			Taurus: 'ความมั่นคง ความอดทน และความมุ่งมั่นในเป้าหมาย',
			Gemini: 'ความฉลาด การสื่อสารที่ดี และความอยากรู้อยากเห็น',
			Cancer: 'ความอ่อนไหว ความห่วงใยครอบครัว และสัญชาตญาณที่แข็งแกร่ง',
			Leo: 'ความคิดสร้างสรรค์ ความภูมิใจ และความเป็นผู้นำโดยธรรมชาติ',
			Virgo: 'ความละเอียดรอบคอบ การวิเคราะห์ และการบริการผู้อื่น',
			Libra: 'ความสมดุล ความยุติธรรม และความสามารถในการประสานความสัมพันธ์',
			Scorpio: 'ความลึกซึ้ง การเปลี่ยนแปลง และพลังภายในที่เข้มแข็ง',
			Sagittarius: 'ความรักอิสระ ปรัชญาชีวิต และการแสวงหาความรู้',
			Capricorn: 'ความรับผิดชอบ ความมุ่งมั่น และความสำเร็จในระยะยาว',
			Aquarius: 'ความคิดริเริ่ม ความเป็นเอกลักษณ์ และวิสัยทัศน์เพื่อสังคม',
			Pisces: 'ความฝัน จินตนาการ และความเมตตาต่อผู้อื่น'
		},
		Moon: {
			Aries: 'อารมณ์ที่รวดเร็วและตรงไปตรงมา ต้องการอิสระ',
			Taurus: 'อารมณ์มั่นคง ต้องการความปลอดภัยและความสบาย',
			Gemini: 'อารมณ์เปลี่ยนแปลงเร็ว ต้องการการสื่อสารและการเรียนรู้',
			Cancer: 'อารมณ์อ่อนไหวมาก ต้องการบ้านและความอบอุ่น',
			Leo: 'อารมณ์ที่แสดงออกชัดเจน ต้องการการยอมรับ',
			Virgo: 'อารมณ์ที่วิเคราะห์ ต้องการความเป็นระเบียบ',
			Libra: 'อารมณ์ที่ต้องการความสมดุลและความสัมพันธ์ที่ดี',
			Scorpio: 'อารมณ์ลึกซึ้งและเข้มข้น ต้องการความจริง',
			Sagittarius: 'อารมณ์ที่มองโลกในแง่ดี ต้องการการผจญภัย',
			Capricorn: 'อารมณ์ที่ควบคุมได้ดี ต้องการความสำเร็จ',
			Aquarius: 'อารมณ์ที่เป็นอิสระ ต้องการพื้นที่ส่วนตัว',
			Pisces: 'อารมณ์ที่ละเอียดอ่อนและเห็นอกเห็นใจผู้อื่น'
		}
	};

	const planetData = interpretations[planet];
	if (!planetData) return `ข้อมูลของ ${planet} ยังไม่พร้อม`;

	const signData = planetData[sign];
	if (!signData) return `ข้อมูลของ ${sign} ยังไม่พร้อม`;

	let result = signData;
	if (house) {
		result += ` (อยู่ในเรือนที่ ${house})`;
	}

	return result;
}

export function interpretAspect(aspect: Aspect): string {
	const interpretations: Record<AspectType, string> = {
		conjunction: 'การรวมพลังงาน สร้างความเข้มข้นและโฟกัสในเรื่องนั้นๆ',
		sextile: 'โอกาสที่ดี พลังงานไหลลื่น ส่งเสริมซึ่งกันและกัน',
		square: 'ความท้าทายที่ต้องเอาชนะ สร้างแรงกดดันแต่ก็นำมาซึ่งการพัฒนา',
		trine: 'ความกลมกลืน พลังงานไหลลื่นตามธรรมชาติ นำมาซึ่งความโชคดี',
		opposition: 'ความขัดแย้งที่ต้องหาจุดสมดุล เรียนรู้จากผู้อื่น',
		quincunx: 'การปรับตัวที่ไม่สบาย จำเป็นต้องมีการเปลี่ยนแปลง',
		semisextile: 'โอกาสเล็กๆ น้อยๆ ที่อาจมองข้าม',
		semisquare: 'ความหงุดหงิดเล็กน้อย ต้องใช้ความพยายาม',
		sesquiquadrate: 'ความตึงเครียดที่ต้องจัดการอย่างระมัดระวัง'
	};

	return `${aspect.body1} ${interpretations[aspect.type]} กับ ${aspect.body2} (Orb: ${aspect.orb.toFixed(2)}°)`;
}
