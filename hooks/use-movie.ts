import { useQuery } from "@tanstack/react-query";

type MovieParams = { id: string; page?: never } | { id?: never; page?: number };

export type MovieResult = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type MovieResponse = {
	page: number;
	results: MovieResult[];
	total_pages: number;
	total_results: number;
};

export const useMovie = ({ id, page = 1 }: MovieParams) => {
	return useQuery({
		queryKey: ["movie", id],
		queryFn: async () => {
			const res = await fetch(
				!id
					? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/movie/popular?page=${page}`
					: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/movie/${id}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
					},
				},
			);

			if (!res.ok) {
				throw new Error("Network response was not ok");
			}

			const json = await res.json();

			return json;
		},
	});
};
