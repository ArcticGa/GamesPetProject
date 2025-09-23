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
