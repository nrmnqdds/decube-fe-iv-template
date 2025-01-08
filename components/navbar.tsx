import React from "react";
import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="w-full p-5 flex flex-row items-center justify-between bg-zinc-900/50 backdrop-blur fixed top-0">
			<Link href="/">LOGO</Link>
		</nav>
	);
};

export default Navbar;
