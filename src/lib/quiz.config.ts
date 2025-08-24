// Quiz configuration for the SvelteKit quiz app
// Each question presents a word, and the user must guess if it's an IKEA item or a Sigur Ros/Jonsi song.
// The answer is either 'IKEA' or 'SIGUR_ROS'.

export interface Question {
	word: string;
	answer: 'IKEA' | 'SIGUR_ROS';
}

export const quizConfig = {
	sounds: {
		correct: 'sounds/correct.mp3',
		incorrect: 'sounds/incorrect.mp3'
	},
	questionsPerRound: 10
};

// Complete IKEA product catalog
export const ikeaProducts: string[] = [
	'BILLY',
	'POÄNG',
	'KALLAX',
	'MALM',
	'LACK',
	'HEMNES',
	'IVAR',
	'BESTÅ',
	'PAX',
	'PLATSA',
	'SMÅSTAD',
	'EKET',
	'KLIPPAN',
	'KIVIK',
	'EKTORP',
	'SÖDERHAMN',
	'FÄRLÖV',
	'GRÖNLID',
	'LANDSKRONA',
	'VIMLE',
	'FRIHETEN',
	'BRIMNES',
	'NORDLI',
	'SONGESAND',
	'IDANÄS',
	'HAUGA',
	'ASKVOLL',
	'KULLEN',
	'TARVA',
	'RAST',
	'KOPPANG',
	'TRYSIL',
	'STOCKHOLM',
	'MÖRBYLÅNGA',
	'EKEDALEN',
	'NORDVIKEN',
	'LANEBERG',
	'GAMLARED',
	'LISABO',
	'MÖCKELBY',
	'SKOGSTA',
	'NORRÅKER',
	'INGATORP',
	'BJURSTA',
	'STRANDTORP',
	'VEDBO',
	'DOCKSTA',
	'TOBIAS',
	'STEFAN',
	'INGOLF',
	'IVAR',
	'TERJE',
	'GUNDE',
	'NISSE',
	'ADDE',
	'TEODORES',
	'NORRARYD',
	'LEIFARNE',
	'HENRIKSDAL',
	'BERGMUND',
	'HARRY',
	'KAUSTBY',
	'RÖNNINGE',
	'BÖRJE',
	'EVERT',
	'NORRNAS',
	'FRANKLIN',
	'FANBYN',
	'DALFRED',
	'NILSERIK',
	'LIDKULLEN',
	'HATTEFJÄLL',
	'JÄRVFJÄLLET',
	'MARKUS',
	'LÅNGFJÄLL',
	'ALEFJÄLL',
	'FLINTAN',
	'SKRUVSTA',
	'TROLLBERGET',
	'HUVUDSPELARE',
	'MATCHSPEL',
	'UTESPELARE',
	'GRUPPSPEL',
	'RENBERGET',
	'MILLBERGET',
	'BLECKBERGET',
	'BEKANT',
	'IDASEN',
	'TOMMARYD',
	'MITTZON',
	'TROTTEN',
	'RODULF',
	'ANFALLARE',
	'UPPSPEL',
	'FREDDE',
	'UTBUD',
	'RIAN',
	'VITTSJÖ',
	'FJÄLLBO',
	'LIATORP',
	'HAVSTA',
	'REGISSÖR',
	'BAGGEBO',
	'LOMMARP',
	'FABRIKOR',
	'RUDSTA',
	'MILSBO',
	'DETOLF',
	'BLÅLIDEN',
	'MOSSLANDA',
	'LERBERG',
	'MULIG',
	'OMAR',
	'HYLLIS',
	'KOLBJÖRN',
	'DYNAN',
	'RÅSKOG',
	'VESKEN',
	'NISSAFORS',
	'HORNAVAN',
	'TINGBY',
	'GRUNDTAL',
	'VARIERA',
	'IKEA 365+',
	'DINERA',
	'OFTAST',
	'GODIS',
	'KALAS',
	'DRÖMBILD',
	'UPPHETTA',
	'RINNIG',
	'FLITIGHET',
	'FORTSKAFFA',
	'DISKAD',
	'BESTÄLLA',
	'MAXIMERA',
	'KOMPLEMENT',
	'UTRUSTA',
	'NORRSJÖN',
	'BOSJÖN',
	'METOD',
	'ENHET',
	'KNOXHULT',
	'SUNNERSTA',
	'FYNDIG',
	'LILLÅNGEN',
	'GODMORGON',
	'TYNNINGÖ',
	'ÄNGSJÖN',
	'STORJORM',
	'BRÅVIKEN',
	'SILVERGLANS',
	'HAMNSKÄR',
	'VOXNAN',
	'BROGRUND',
	'TISKEN',
	'KALKGRUND',
	'SAXBORGA',
	'BALUNGEN',
	'DRAGAN',
	'SVALNÄS',
	'NORDRANA',
	'BOLMEN',
	'SKÅDIS',
	'SUNNERSTA',
	'KUGGIS',
	'SAMLA',
	'KNODD',
	'TROFAST',
	'TJENA',
	'DRÖNA',
	'FJÄLLA',
	'KVARNVIK',
	'LACKISAR',
	'ROMANTISK',
	'SMÖRBOLL',
	'RAGGISAR',
	'PINGLA',
	'SOCKERBIT',
	'GLIS',
	'PYSSLA',
	'ÖVERMÄTT',
	'PRESSA',
	'ISTAD',
	'KLÄMTARE',
	'BEVARA',
	'FÖRTROLIG',
	'KORKEN',
	'DROPPAR',
	'VARDAGEN',
	'RAJTAN',
	'HEMLAGAD',
	'EFTERRÄTT',
	'MIXTUR',
	'BACKIG',
	'IDEALISK',
	'RÖRT',
	'KAVALKAD',
	'BLANDA',
	'FÖRNUFT',
	'GNARP',
	'MOPSIG',
	'FLÖDE',
	'REKO',
	'SMAKRIK',
	'FESTMÅLTID',
	'DUKTIG',
	'UPPFYLLD',
	'SMASKA',
	'UNDERBAR',
	'FULLTALIG',
	'VÄLBEHÖVLIG',
	'MUNHÅRD',
	'VARDAGSMAT',
	'SITTNING',
	'PROPPMÄTT',
	'GENOMKOKAD',
	'FRÄCK'
];

// Complete Sigur Rós discography including solo work
export const sigurRosSongs: string[] = [
	// Von (1997)
	// 'SIGUR RÓS',
	'DÖGUN',
	'MYRKUR',
	'HAFSSÓL',
	'VON',
	'MISTUR',
	'RUKRYM',
	// Ágætis byrjun (1999)
	// 'INTRO',
	'SVEFN-G-ENGLAR',
	'STARÁFLUR',
	'FLUGUFRELSARINN',
	'NÝ BATTERÍ',
	'AVALON',
	// ( ) (2002)
	'VAKA',
	'FYRSTA',
	'SAMSKEYTI',
	'NJÓSNAVÉLIN',
	'ÁLAFOSS',
	'E-BOW',
	'DAUÐALAGIÐ',
	'POPPLAGIÐ',
	// Takk... (2005)
	'TAKK...',
	'GLÓSÓLI',
	'HOPPÍPOLLA',
	'SÆGLÓPUR',
	'MÍLANÓ',
	'GONG',
	'ANDVARI',
	'SVEINSYNGUR',
	'HEYSÁTAN',
	// Með suð í eyrum við spilum endalaust (2008)
	'GOBBLEDIGOOK',
	'GÓÐAN DAGINN',
	'FESTIVAL',
	'ÁRA BÁTUR',
	'ILLGRESI',
	'FLJÓTAVÍK',
	'STRAUMNES',
	// Valtari (2012)
	'VARÚÐ',
	'REMBIHNÚTUR',
	'DAUÐALOGN',
	'VARÐELDUR',
	'VALTARI',
	// Kveikur (2013)
	'BRENNISTEINN',
	'HRAFNTINNA',
	'ÍSJAKI',
	'YFIRBORÐ',
	'STORMUR',
	'KVEIKUR',
	'RAFSTRAUMUR',
	'BLÁÞRÁÐUR',
	'VAR',
	// ÁTTA (2023)
	'GLÓÐ',
	'BLÓÐBERG',
	'SKEL',
	'KLETTUR',
	'MÓR',
	'ANDRÁ',
	'GOLD',
	'YLUR',
	'FALL',
	'ÓS',
	// EPs and Singles
	'HLJÓMALIND',
	'SALKA',
	'HRAFNAGALDR ÓÐINS',
	'ÓVEÐUR',
	'NÝFALLIÐ REGN',
	'HEIMA',
	'VÖKURÓ',
	'HAFSÓL',
	'KAFARI',
	'KJÓSARHREPPUR',
	'GOBBLEDIGOOK',
	'HAFSÓL',
	'DI DO',
	// Rímur EP (with Steindór Andersen)
	'RÍMUR',
	'LÆKURINN',
	'ÁLFABORG',
	'DAGRENNING',
	// Hvarf/Heim (2007)
	'SALKA',
	'HLJÓMALIND',
	'HAFSÓL',
	'HEIMA',
	'VÖKURÓ',
	'ÁGÚST',
	'HEYSÁTAN',
	// Recent singles and collaborations
	'ÓBÓK'
];

// Function to get random questions for a quiz round
export function getRandomQuestions(count: number = 10): Question[] {
	const questions: Question[] = [];
	const usedWords = new Set<string>();

	// Create pools of available items
	const availableIkea = [...ikeaProducts];
	const availableSigurRos = [...sigurRosSongs];

	// Shuffle both arrays
	shuffleArray(availableIkea);
	shuffleArray(availableSigurRos);

	// Try to get roughly equal distribution
	const targetIkeaCount = Math.floor(count / 2);
	const targetSigurRosCount = count - targetIkeaCount;

	let ikeaCount = 0;
	let sigurRosCount = 0;

	// Add IKEA items
	while (ikeaCount < targetIkeaCount && availableIkea.length > 0) {
		const word = availableIkea.pop()!;
		if (!usedWords.has(word)) {
			questions.push({ word, answer: 'IKEA' });
			usedWords.add(word);
			ikeaCount++;
		}
	}

	// Add Sigur Rós songs
	while (sigurRosCount < targetSigurRosCount && availableSigurRos.length > 0) {
		const word = availableSigurRos.pop()!;
		if (!usedWords.has(word)) {
			questions.push({ word, answer: 'SIGUR_ROS' });
			usedWords.add(word);
			sigurRosCount++;
		}
	}

	// If we couldn't get enough of one type, fill with the other
	while (questions.length < count) {
		if (availableIkea.length > 0) {
			const word = availableIkea.pop()!;
			if (!usedWords.has(word)) {
				questions.push({ word, answer: 'IKEA' });
				usedWords.add(word);
			}
		} else if (availableSigurRos.length > 0) {
			const word = availableSigurRos.pop()!;
			if (!usedWords.has(word)) {
				questions.push({ word, answer: 'SIGUR_ROS' });
				usedWords.add(word);
			}
		} else {
			break; // No more items available
		}
	}

	// Shuffle the final questions array
	shuffleArray(questions);

	return questions;
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
