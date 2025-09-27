export interface IGame {
	id: number
	title: string
	genre: string
	platform: string
	developer: string
	publisher: string
	release_date: string
	short_description: string
	thumbnail: string
	game_url: string
	freetogame_profile_url: string
}

export interface IFullGame extends IGame {
	description: string
	minimum_system_requirements: ISystemReq
	screenshots: IScreenShots[]
	status: string
}

export interface IScreenShots {
	id: number
	image: string
}

export interface ISystemReq {
	graphics: string
	memory: string
	os: string
	processor: string
	storage: string
}

export interface IReview {
	id: number
	user_id: number
	game_id: number
	text: string
	grade: number
	published_date: number
	is_recommended: boolean
	likes: number
	dislikes: number
}

export interface IAward {
	titleAward: string
	bgImage: string
	winnerId: number
	id: number
}

export interface IGameYear {
	id: number
	name: string
	imageUrl: string
	bigImageUrl: string
	description: string
	awardIds: number[]
	year: number
}

export interface IUser {
	_id: string
	nickname: string
	email: string
	// avatarUrl: string
	featuredGames: number[]
	ownReviews: number[]
	likedReviews: number[]
	dislikedReviews: number[]
	createdAt: string
	updatedAt: string
	__v: number
	token: string
}
