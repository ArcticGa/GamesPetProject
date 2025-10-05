import ClockIcon from '../assets/icons/clock.svg'
import CrownIcon from '../assets/icons/crown-icon.svg'
import CrownWhiteIcon from '../assets/icons/crown-white.svg'
import GamepadIcon from '../assets/icons/gamepad.svg'
import GitlabIcon from '../assets/icons/gitlab.svg'
import HomeIcon from '../assets/icons/home.svg'

export const arraySortProfileBtns = [
	'Избранные игры',
	'Созданные обзоры',
	'Понравившиеся обзоры',
]

export const linksArray = [
	{
		icon: HomeIcon,
		name: 'Главная',
		path: '',
	},
	{
		icon: GamepadIcon,
		name: 'Рекомендации',
		path: 'recommendations',
	},
	{
		icon: CrownIcon,
		name: 'Игры года',
		path: 'gamesoftheyear',
		bgImage: CrownIcon,
	},
]

export const categoriesArray = [
	{ _id: 1, name: 'Лучшее', image: CrownWhiteIcon },
	{ _id: 2, name: 'Новинки', image: GitlabIcon },
	{ _id: 3, name: 'Скоро выйдут', image: ClockIcon },
]

export const arrayGenres = [
	'mmorpg',
	'shooter',
	'strategy',
	'moba',
	'racing',
	'sports',
	'social',
	'sandbox',
	'open-world',
	'survival',
	'pvp',
	'pve',
	'pixel',
	'voxel',
	'zombie',
	'turn-based',
	'first-person',
	'third-Person',
	'top-down',
	'tank',
	'space',
	'sailing',
	'side-scroller',
	'superhero',
	'permadeath',
	'card',
	'battle-royale',
	'mmo',
	'mmofps',
	'mmotps',
	'3d',
	'2d',
	'anime',
	'fantasy',
	'sci-fi',
	'fighting',
	'action-rpg',
	'action',
	'military',
	'martial-arts',
	'flight',
	'low-spec',
	'tower-defense',
	'horror',
	'mmorts',
]

export const systemReqsArrayHelper = [
	{
		title: 'os',
		req: 'Ос',
	},
	{
		title: 'processor',
		req: 'Процессор',
	},
	{
		title: 'memory',
		req: 'ОЗУ',
	},
	{
		title: 'graphics',
		req: 'Видеокарта',
	},
	{
		title: 'storage',
		req: 'Память на HDD (SSD)',
	},
]

export const monthsArray = [
	'января',
	'февраля',
	'мара',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
]

export const sortParamsArr = [
	'сначала новые',
	'сначала старые',
	'по лайкам',
	'по дизлайкам',
	'по оценкам ( ↓ )',
	'по оценкам ( ↑ )',
]

export const awardsList = [
	{
		titleAward: 'Игра года',
		bgImage:
			'https://cdn.fastly.steamstatic.com/store/promo/steamawards2024/backgrounds/GOTY.jpg?v=1',
		winnerId: 1,
		id: 1,
	},
	{
		titleAward: 'Любимое дитя',
		bgImage:
			'https://cdn.fastly.steamstatic.com/store/promo/steamawards2024/backgrounds/LaborOfLove.jpg?v=1',
		winnerId: 6,
		id: 2,
	},
	{
		titleAward: 'Друг познается в игре',
		bgImage:
			'https://cdn.fastly.steamstatic.com/store/promo/steamawards2024/backgrounds/BetterWithFriends.jpg?v=1',
		winnerId: 5,
		id: 3,
	},
	{
		titleAward: 'Выдающийся визуальный стиль',
		bgImage:
			'https://cdn.fastly.steamstatic.com/store/promo/steamawards2024/backgrounds/OutstandingVisualStyle.jpg?v=1',
		winnerId: 16,
		id: 4,
	},
	{
		titleAward: 'Самый инновационный геймплей',
		bgImage:
			'https://cdn.fastly.steamstatic.com/store/promo/steamawards2024/backgrounds/MostInnovativeGameplay.jpg?v=1',
		winnerId: 19,
		id: 5,
	},
	{
		titleAward: 'Лучшая игра, которая вам не даётся',
		bgImage:
			'https://cdn.fastly.steamstatic.com/store/promo/steamawards2024/backgrounds/BestGameYouSuckAt.jpg?v=1',
		winnerId: 1,
		id: 6,
	},
	{
		titleAward: 'Лучшая игра с выдающимся сюжетом',
		bgImage:
			'https://cdn.fastly.steamstatic.com/store/promo/steamawards2024/backgrounds/OutstandingStoryRichGame.jpg?v=1',
		winnerId: 1,
		id: 7,
	},
]
