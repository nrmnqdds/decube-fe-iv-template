import { MovieResult, useMovie } from "@/hooks/use-movie";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function Home() {
	const [page, setPage] = useState(1);
	const { data, isFetching, refetch } = useMovie({ page: page });

	useEffect(() => {
		refetch();
	}, [page]);

	return (
		<main
			className={cn(
				"min-h-screen flex flex-col items-center justify-center p-5 lg:p-24 gap-4",
				inter.className,
			)}
		>
			<h1 className="text-4xl font-bold">Popular Movies</h1>

			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
				{isFetching
					? Array.from({ length: 20 }).map((_, i) => (
							<li
								key={i}
								className="flex flex-col gap-2 p-4 bg-zinc-900 rounded-xl w-full h-[500px]"
							/>
						))
					: data?.results.map((movie: MovieResult) => (
							<Link
								key={movie.id}
								href={`/movie/${movie.id}`}
								className="flex flex-col gap-2 p-4 bg-zinc-900 rounded-xl"
							>
								<Image
									src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}${movie.poster_path}`}
									alt={movie.title}
									width={500}
									height={750}
									className="rounded-lg"
								/>
								<h2 className="text-xl font-bold">{movie.title}</h2>
								<p>{movie.overview}</p>
							</Link>
						))}
			</ul>

			<div className="w-full flex items-center justify-between">
				<button
					className="bg-zinc-300 disabled:bg-zinc-500 text-zinc-900 disabled:text-black disabled:cursor-not-allowed px-4 py-2 rounded-lg"
					disabled={page === 1}
					onClick={() => setPage((i) => (i -= 1))}
				>
					Previous
				</button>
				<button
					className="bg-zinc-300 text-zinc-900 px-4 py-2 rounded-lg"
					onClick={() => setPage((i) => (i += 1))}
				>
					Next
				</button>
			</div>
		</main>
	);
}
