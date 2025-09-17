import { createSlice } from '@reduxjs/toolkit'

interface ILoginSlice {
	loginStatus: boolean
}

const initialState: ILoginSlice = {
	loginStatus: true,
}

export const loginAccount = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setOutLoginAccount(state) {
			state.loginStatus = false
		},
		setInLoginAccount(state) {
			state.loginStatus = true
		},
	},
})

export const { setOutLoginAccount, setInLoginAccount } = loginAccount.actions
export default loginAccount.reducer
