import { useMovie } from "@/hooks/use-movie";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
	const router = useRouter();
	const { data, isFetching } = useMovie({ id: router.query.movieID as string });
	return (
		<main className="min-h-screen flex flex-col items-center justify-center p-5 pt-24 lg:p-24 gap-4">
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<div className="flex flex-col items-center justify-center">
					<Image
						src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}${data?.poster_path}`}
						alt={data?.title}
						width={500}
						height={750}
						className="rounded-lg"
					/>
					<h2 className="text-xl font-bold">{data?.title}</h2>
					<p className="text-zinc-600">{data?.release_date}</p>
					<p>{data?.overview}</p>
				</div>
			)}
		</main>
	);
};

export default Index;
