'use client';
import './header.scss';

import Image from 'next/image';
import React, { useContext, useState } from 'react';

import TextButton from '@/components/internal/text-button/text-button.component';
import Button from '@/components/internal/button/button.component';

import { FaMoon, FaFilter } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import ThemeService from 'src/shared/services/theme/theme.service';
import ThemeSvcContext from 'src/shared/services/theme/theme.context';
import { Theme } from 'src/shared/services/theme/theme.type';

export default function HeaderComponent() {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	const navigation = [
		{
			label: 'Explore',
			href: '#',
		},
		{
			label: 'Blockchain',
			href: '#',
		},
		{
			label: 'Tokens',
			href: '#',
		},
		{
			label: 'NFTs',
			href: '#',
		},
	];

	const toggleMobileNav = () => {
		setMobileNavOpen(!mobileNavOpen);
	};

	// *~~*~~*~~ Theme ~~*~~*~~* //
	const themeSvc = useContext<ThemeService>(ThemeSvcContext);

	const [currentTheme, setCurrentTheme] = useState<Theme>(themeSvc.theme);

	function toggleTheme() {
		themeSvc.toggleTheme();
		setCurrentTheme(themeSvc.theme);
	}

	return (
		<nav className="dark:bg-abrandc-dark-blackish bg-white overflow-hidden shadow ">
			<div className="container-2 mx-auto flex items-center justify-between h-[80px]">
				{/* brand */}
				<div className="brand">
					<img src="media/logos/pwr-imagotipo.svg" alt="" />
				</div>

				<div className="hidden md:flex items-center gap-x-4">
					{navigation.map((item, index) => (
						<div key={index}>
							<TextButton href={item.href} className="xs flex gap-2" tag_type="link">
								{item.label}
								<Image
									className=""
									src="/icons/arrow-down.svg"
									width={24}
									height={24}
									alt=""
								/>
							</TextButton>
						</div>
					))}
					<Button className="secondary medium w-[106px]">Connect</Button>
					<Button className="blue medium w-[117px]">Get Wallet</Button>
					<button
						className="theme_btn text-agrey-500 dark:text-white"
						onClick={toggleTheme}
					>
						<i
							className={`fa-lg fas ${
								currentTheme === 'light' ? 'fa-sun' : 'fa-moon'
							}`}
						></i>
					</button>
				</div>

				{/* Mobile burger icon */}
				<div className="md:hidden">
					<button onClick={toggleMobileNav}>
						{/* This is a simple burger icon. You can replace this with any SVG or icon library you prefer. */}
						<RxHamburgerMenu size={25} />
					</button>
				</div>

				{/* Mobile navigation menu */}
				{mobileNavOpen && (
					<div className="absolute top-0 left-0 w-full h-full bg-white md:hidden z-50 p-4">
						<div className="flex justify-between itmes-center py-3">
							<img src="media/logos/pwr-imagotipo.svg" alt="" />
							<button onClick={toggleMobileNav}>
								<MdOutlineCancel size={25} className="text-agrey-500" />
							</button>
						</div>
						<div className="field lg:w-[800px] w-full relative my-4 ">
							{/* Filter */}
							<div className="absolute left-6 top-[13px]">
								<button className="flex items-center gap-x-2 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[8px] px-2 py-1 dark:text-white text-sm font-medium">
									<FaFilter size={20} className="text-agrey-500" />
								</button>
							</div>
							<input
								className="text-field !h-[50px] !rounded-[16px] !pl-20"
								placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
							/>
						</div>
						{navigation.map((navItem, index) => (
							<div key={index} className="my-2">
								<TextButton
									href={navItem.href}
									className="xs w-full flex justify-between items-center"
									tag_type="link"
								>
									{navItem.label}
									<Image
										className=""
										src="/icons/arrow-down.svg"
										width={24}
										height={24}
										alt=""
									/>
								</TextButton>
							</div>
						))}
						<div className="flex justify-between gap-4">
							<Button className="secondary medium w-2/4">Connect</Button>
							<Button className="blue medium w-2/4">Get Wallet</Button>
						</div>
						<div className="my-5 ">
							<h1 className="text-agrey-500">Interface</h1>
							<div className="w-full bg-abrandc-light-grey flex justify-between h-[52px] px-4 py-2 rounded-lg  items-center ">
								<button
									className="theme_btn text-agrey-500 dark:text-white"
									onClick={toggleTheme}
								>
									<i
										className={`fa-lg fas ${
											currentTheme === 'light' ? 'fa-sun' : 'fa-moon'
										}`}
									></i>
								</button>

								{/* <FaMoon
									size={20}
									className="text-agrey-500"
									onClick={toggleTheme}
								/> */}
								<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
									<input
										type="checkbox"
										name="toggle"
										id="toggle"
										className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
									/>
									<label
										htmlFor="toggle"
										className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in`}
									></label>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
