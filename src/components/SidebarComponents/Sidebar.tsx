import AccountMain from './AccountBlock/AccountMain'
import LinkItems from './LinksBlock/LinkItems'
import Logo from './LogoBlock/Logo'
import SearchMain from './SearchBlock/SearchMain'

const Sidebar = ({ sidebar }: { sidebar: boolean }) => {
	return (
		<aside
			className={`m-6 bg-main-blocks rounded-2xl fixed z-10 max-w-2xs py-6 px-4 max-xl:top-0 max-xl:left-0 max-xl:m-0 max-xl:rounded-none max-xl:!h-screen ${
				sidebar ? 'max-xl:block' : 'max-xl:hidden'
			} `}
		>
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
