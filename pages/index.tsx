import { GetServerSideProps, GetStaticProps } from 'next';
import axios from 'axios';
import Layout from '../components/Layout/layout';
import Error from 'next/error';
import StoryList from '../components/Story/storyList';

export interface Comment {
  content: string;
  id: number;
  level: number;
  time: number;
  user: string;
  time_ago: string;
  comments: Comment[];
}

export interface FetchedStory {
  comments_count: string;
  domain: string;
  points: number;
  comments: Comment[];
  id: number;
  time: number;
  time_ago: string;
  title: string;
  type: string;
  url: string;
  user: string;
}
//asdasd
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Number(query.page) || 1;
  type Props = { errorStatus: null | number; stories: FetchedStory[]; page: number };
  const props: Props = {
    errorStatus: null,
    stories: [],
    page,
  };
  const response = await axios.get<FetchedStory[]>(`http://node-hnapi.herokuapp.com/news?page=${page}`);
  props.stories = response.data;
  props.errorStatus = response.statusText === 'OK' ? null : response.status;

  return {
    props,
  };
};

interface HomeProps {
  stories: FetchedStory[];
  page: number;
  errorStatus: number | null;
}

export default function Home({ stories, errorStatus, page }: HomeProps) {
  return (
    <>
      {errorStatus === null ? (
        <Layout page={page}>
          <StoryList stories={stories} />
        </Layout>
      ) : (
        <Error statusCode={errorStatus} />
      )}
    </>
  );
}
