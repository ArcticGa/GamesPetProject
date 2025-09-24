import MisideImage from '../assets/GameImages/MisideImage.png'
import NotificationsIcon from '../assets/icons/bell.svg'
import ClockIcon from '../assets/icons/clock.svg'
import CrownIcon from '../assets/icons/crown-icon.svg'
import CrownWhiteIcon from '../assets/icons/crown-white.svg'
import GamepadIcon from '../assets/icons/gamepad.svg'
import GitlabIcon from '../assets/icons/gitlab.svg'
import HomeIcon from '../assets/icons/home.svg'
import WriteDevIcon from '../assets/icons/message-developer.svg'
import FavoritesIcon from '../assets/icons/star.svg'

export const arrayAccountItems = [
	{ _id: 1, image: NotificationsIcon, title: 'Уведомления' },
	{ _id: 2, image: FavoritesIcon, title: 'Избранное' },
	{ _id: 3, image: WriteDevIcon, title: 'Написать разработчику' },
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

export const arraySearchGames = [
	{
		_id: 1,
		image: MisideImage,
		nameGame: 'Miside',
		developer: 'AIHASTO',
		genres: [
			{ _id: 1, title: 'Хоррор' },
			{ _id: 2, title: 'Глубокий сюжет' },
		],
		dateReleased: '11 декабря 2024',
	},
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
