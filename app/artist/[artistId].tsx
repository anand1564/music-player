import { GetServerSideProps } from "next";
import ArtistCard from "@/components/ArtistData";

interface ArtistData {
     external_urls: {
       spotify: string
     }
     followers: {
       total: number
     }
     genres: string[]
     images: {
       url: string
       height: number
       width: number
     }[]
     name: string
     popularity: number
     type: string
   }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const  artistId  = process.env.NEXT_PUBLIC_ARTIST_ID;
  const accessToken = process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN;

  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch artist data: ${response.statusText}`);
    }

    const data: ArtistData = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

const ArtistPage = ({ data }: { data: ArtistData }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ArtistCard data={data} />
    </div>
  );
};

export default ArtistPage;
