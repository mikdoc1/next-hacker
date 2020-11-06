import Link from 'next/link';
import { FetchedStory } from '../../pages';

interface StoryListProps {
  stories: FetchedStory[];
}

const StoryList = ({ stories }: StoryListProps) => {
  return (
    <div>
      {stories.map((story) => {
        return (
          <div key={story.id}>
            <Link href={`/story/${story.id}`}>
              <a>
                <h4>{story.title}</h4>
              </a>
            </Link>
            <span>user {story.user}</span>
            <span>comments {story.comments_count}</span>
          </div>
        );
      })}
      <style jsx>{`
        span {
          display: block;
          margin-bottom: 0.4rem;
        }
      `}</style>
    </div>
  );
};

export default StoryList;
