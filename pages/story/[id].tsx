import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { FetchedStory } from '..';
import Error from 'next/error';
import Layout from '../../components/Layout/layout';
import router, { useRouter } from 'next/router';
import CommentList from '../../components/Comment/CommentList';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  let story: FetchedStory | null = null;
  let errorStatus: null | number = null;
  if (id) {
    const res = await axios.get<FetchedStory>(`http://node-hnapi.herokuapp.com/item/${id}`);
    errorStatus = res.statusText === 'OK' ? null : res.status;

    story = res.data;
  }
  return {
    props: {
      story,
      errorStatus,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get<FetchedStory[]>('http://node-hnapi.herokuapp.com/news');
  const paths: { params: { id: string } }[] = response.data.map((story) => ({
    params: {
      id: story.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface ShowStoryProps {
  story: FetchedStory;
  errorStatus: null | number;
}

const ShowStory = ({ story, errorStatus }: ShowStoryProps) => {
  const router = useRouter();
  return (
    <>
      {errorStatus ? (
        <Error statusCode={errorStatus} />
      ) : (
        <>
          {router.isFallback ? (
            <div>Loading...</div>
          ) : (
            <Layout>
              <h3>{story.title}</h3>
              <div>
                <span>user</span> - <strong>{story.user}</strong>
                <div></div>
                <span>comments count</span> - <strong>{story.comments_count}</strong>
                <div></div>
                <span>date</span> - <strong>{story.time_ago}</strong>
              </div>
              {+story.comments_count > 0 ? <CommentList comments={story.comments} /> : <h4>There is no comments</h4>}
            </Layout>
          )}
        </>
      )}
    </>
  );
};

export default ShowStory;
