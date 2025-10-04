import { useAppSelector } from '../../../redux/store'
import AccountMain from '../AccountBlock/AccountMain'
import GenresMain from '../GenresBlock/GenresMain'
import LinkItems from '../LinksBlock/LinkItems'
import Logo from '../LogoBlock/Logo'
import SearchMain from '../SearchBlock/SearchMain'
import StatusSidebarBtns from './StatusSidebarBtns'
import { stylesAside } from './Utils'

const Sidebar = () => {
	const { activeSearch } = useAppSelector(state => state.statusSearchBlockSlice)
	const { sidebarStatus } = useAppSelector(state => state.hideSidebarSlice)

	// Я понимаю, что ПЕРЕБОР с sidebarStatus... Но так получилось :(
	return (
		<aside className={stylesAside(sidebarStatus)}>
			<nav className='h-full flex flex-col relative'>
				<Logo sidebarStatus={sidebarStatus} />
				<SearchMain sidebarStatus={sidebarStatus} />

				<div className='flex-1 items-center'>
					<LinkItems sidebarStatus={sidebarStatus} />
					<GenresMain sidebarStatus={sidebarStatus} />
				</div>

				<StatusSidebarBtns
					sidebarStatus={sidebarStatus}
					activeSearch={activeSearch}
				/>

				<AccountMain sidebarStatus={sidebarStatus} />
			</nav>
		</aside>
	)
}

export default Sidebar
