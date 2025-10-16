import AccountMain from './AccountBlock/AccountMain'
import LinkItems from './LinksBlock/LinkItems'
import Logo from './LogoBlock/Logo'
import SearchMain from './SearchBlock/SearchMain'

const Sidebar = () => {
	return (
		<aside className='m-6 bg-main-blocks rounded-2xl fixed z-10 w-2xs py-6 px-4'>
			<nav className='h-full flex flex-col relative'>
				<Logo />
				<SearchMain />

				<div className='flex-1 items-center'>
					<LinkItems />
				</div>

				<AccountMain />
			</nav>
		</aside>
	)
}

export default Sidebar
