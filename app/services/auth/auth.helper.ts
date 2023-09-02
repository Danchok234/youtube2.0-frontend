export interface IAuthResponse {
	user: {
		id: number
		email: string
	} | null
	accessToken: string
}
