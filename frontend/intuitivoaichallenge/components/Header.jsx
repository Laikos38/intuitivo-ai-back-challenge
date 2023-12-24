import { userService } from '../services/user.service';
import NavLink from './NavLink';

export default function Header() {
	function logout() {
		userService.logout();
	}

	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li><NavLink href='/'>Home</NavLink></li>
						<li><NavLink href='/images'>Images</NavLink></li>
						<li><NavLink href='/accounts/logout'>Logout</NavLink></li>
					</ul>
				</div>
				<NavLink className="btn btn-ghost text-xl" href='/'>IntuitivoAI Challenge</NavLink>
			</div>
			<div className="navbar-end hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li><NavLink href='/'>Home</NavLink></li>
					<li><NavLink href='/images'>Images</NavLink></li>
					<li><NavLink href='/accounts/logout'>Logout</NavLink></li>
				</ul>
			</div>
		</div>
	)
}